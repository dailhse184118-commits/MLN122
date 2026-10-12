import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { create, act } from 'react-test-renderer';
import { Provider, createStore } from 'jotai';
import * as THREE from 'three';
import { EconomicIllustration } from '../src/book/EconomicIllustrations';
import { ModelShowcase } from '../src/book/ModelShowcase';
import { getBookFraming } from '../src/book/framing';
import { getIllustrationTheme } from '../src/book/illustrationThemes';
import { pageAtom, viewModeAtom } from '../src/book/UI';
import { sceneTest } from './fiber-stub.mjs';

const geometries = { boxGeometry: THREE.BoxGeometry, sphereGeometry: THREE.SphereGeometry, cylinderGeometry: THREE.CylinderGeometry, coneGeometry: THREE.ConeGeometry, torusGeometry: THREE.TorusGeometry };
function transform(props) {
  const object = new THREE.Object3D();
  if (props.position instanceof THREE.Vector3) object.position.copy(props.position);
  else if (props.position) object.position.fromArray(props.position);
  if (props.rotation) object.rotation.fromArray(props.rotation);
  if (props.quaternion) object.quaternion.copy(props.quaternion);
  if (Array.isArray(props.scale)) object.scale.fromArray(props.scale);
  else if (typeof props.scale === 'number') object.scale.setScalar(props.scale);
  for (const field of ['position', 'rotation']) for (const axis of ['x', 'y', 'z']) if (props[`${field}-${axis}`] !== undefined) object[field][axis] = props[`${field}-${axis}`];
  object.updateMatrix(); return object.matrix;
}
function bounds(node, parent = new THREE.Matrix4(), result = new THREE.Box3()) {
  const matrix = parent.clone();
  if (node.type === 'mesh' || node.type === 'group') matrix.multiply(transform(node.props));
  if (node.type === 'mesh') {
    const geometry = node.children.find(child => geometries[child.type]);
    const shape = new geometries[geometry.type](...geometry.props.args);
    shape.computeBoundingBox(); result.union(shape.boundingBox.clone().applyMatrix4(matrix)); shape.dispose();
  } else for (const child of node.children) if (typeof child === 'object') bounds(child, matrix, result);
  return result;
}
function projected(box, camera) {
  const range = { left: Infinity, right: -Infinity, bottom: Infinity, top: -Infinity };
  for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
    const point = new THREE.Vector3(x, y, z).project(camera);
    range.left = Math.min(range.left, point.x); range.right = Math.max(range.right, point.x);
    range.bottom = Math.min(range.bottom, point.y); range.top = Math.max(range.top, point.y);
  }
  return range;
}

test('Every learning spread has its own illustration in normal reading and additional 3D mode', () => {
  const previousWindow = global.window;
  global.window = { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) };
  const store = createStore(); let tree;
  try {
    for (const mode of ['reading', 'showcase']) for (let page = 0; page <= 6; page++) {
      store.set(pageAtom, page); store.set(viewModeAtom, mode); sceneTest.reset();
      let root;
      act(() => { tree = create(<Provider store={store}><ModelShowcase /></Provider>, { createNodeMock(node) { if (node.props.name?.startsWith('contextual-')) return root = new THREE.Group(); return new THREE.Group(); } }); });
      if (page === 0 || page === 6) assert.equal(tree.toJSON(), null);
      else {
        const theme = getIllustrationTheme(page);
        assert.equal(tree.root.findAllByProps({ name: `illustration-${theme.id}` }).length, 1);
        for (let i = 0; i < 90; i++) for (const callback of sceneTest.frames) callback({ clock: { elapsedTime: i / 60 } }, 1 / 60);
        assert.ok(root.scale.x > .5, `${mode} page ${page} actually becomes visible`);
        assert.ok(tree.root.findAllByType('mesh').length < 60, 'bounded procedural scene');
      }
      act(() => tree.unmount()); tree = null;
    }
  } finally { if (tree) act(() => tree.unmount()); global.window = previousWindow; }
});

test('Procedural objects and book bounds fit five viewport cameras and occupy separate reading regions', () => {
  // Conservative open-book bounds include page curvature, depth and the gentle float.
  const book = new THREE.Box3(new THREE.Vector3(-1.3, -.93, -.26), new THREE.Vector3(1.3, .93, .26));
  const viewports = [[1366, 768], [1920, 1080], [2560, 1440], [820, 1180], [390, 844]];
  for (const [width, height] of viewports) {
    // Canvas excludes the fixed header and controls. DOM height is measured at runtime.
    const canvasHeight = height - (width <= 650 ? 190 : 176) - (width <= 650 ? 220 : 104);
    for (const mode of ['reading', 'showcase']) for (let page = 1; page <= 5; page++) {
      sceneTest.reset(); let tree; act(() => { tree = create(<EconomicIllustration theme={getIllustrationTheme(page).id} reducedMotion />, { createNodeMock: () => new THREE.Group() }); });
      const layout = getBookFraming(width, canvasHeight, mode, page);
      const model = bounds(tree.root.findByType('group')).applyMatrix4(transform({ position: layout.illustration.position, rotation: [.06, -.14, 0], scale: layout.illustration.scale }));
      model.min.y -= .025; model.max.y += .025;
      const camera = new THREE.PerspectiveCamera(layout.fov, width / canvasHeight, .1, 100);
      camera.position.fromArray(layout.position); camera.lookAt(...layout.target); camera.updateMatrixWorld();
      const bookRegion = projected(book, camera), modelRegion = projected(model, camera);
      for (const [name, region] of [['book', bookRegion], ['illustration', modelRegion]]) {
        assert.ok(region.left > -1 && region.right < 1 && region.bottom > -1 && region.top < 1, `${width}×${height} ${mode} page ${page}: ${name} clipped ${JSON.stringify(region)}`);
      }
      const separate = modelRegion.left > bookRegion.right || modelRegion.bottom > bookRegion.top;
      assert.ok(separate, `${width}×${height} ${mode} page ${page}: illustration overlaps text region ${JSON.stringify({ bookRegion, modelRegion, bounds: [model.min.toArray(), model.max.toArray()] })}`);
      if (mode === 'showcase') {
        for (const azimuth of [-.08, .08]) for (const polar of [Math.PI / 2 - .18, Math.PI / 2 + .10]) {
          camera.position.copy(new THREE.Vector3().setFromSphericalCoords(layout.distance, polar, azimuth).add(new THREE.Vector3(...layout.target)));
          camera.lookAt(...layout.target); camera.updateMatrixWorld();
          const a = projected(book, camera), b = projected(model, camera);
          for (const region of [a, b]) assert.ok(region.left > -1 && region.right < 1 && region.bottom > -1 && region.top < 1, `${width}×${height} ${mode} page ${page}: orbit clips ${JSON.stringify(region)}`);
          assert.ok(b.left > a.right || b.bottom > a.top, `${width}×${height} page ${page}: orbit overlaps pages`);
        }
      }
      act(() => tree.unmount());
    }
  }
});
