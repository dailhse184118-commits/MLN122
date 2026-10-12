import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { create, act } from 'react-test-renderer';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider, createStore } from 'jotai';
import Game from '../src/game/sections/GearOfEra';
import Quiz from '../src/game/sections/QuizGame';
import Theory from '../src/game/sections/TonTaiXaHoi';
import Conclusion from '../src/game/sections/Conclusion';
import Hero from '../src/game/sections/Hero';
import { AIUsagePage } from '../src/ai-usage/AIUsagePage';
import { UI, pages, pageAtom } from '../src/book/UI';
import { scenarios } from '../src/content/mln122';
import ExpandCard from '../src/components/ExpandCard';
import Navbar from '../src/game/sections/Navbar';
import { quizQuestions, createQuiz, createScenarioRun } from '../src/content/quiz';
import { getBookFraming } from '../src/book/framing';
import { getVisibleFaces } from '../src/book/PageReader';
import FareExample, { calculateFare, hypotheticalFare } from '../src/components/FareExample';
import { visualAssets } from '../src/content/visualAssets';

function setup() {
  const original = { timeout: global.setTimeout, interval: global.setInterval, clearTimeout: global.clearTimeout, clearInterval: global.clearInterval, window: global.window, Image: global.Image, Audio: global.Audio };
  let id = 0, now = 0; const tasks = new Map();
  global.setTimeout = (fn, delay = 0) => { tasks.set(++id, { fn, due: now + delay }); return id; };
  global.setInterval = (fn, delay) => { tasks.set(++id, { fn, due: now + delay, interval: delay }); return id; };
  global.clearTimeout = global.clearInterval = n => tasks.delete(n);
  global.window = { innerWidth: 1280, innerHeight: 900, speechSynthesis: { cancel() {}, speak() {} }, addEventListener() {}, removeEventListener() {} };
  global.Image = class { set src(value) {} };
  global.Audio = class { play() { return Promise.resolve(); } pause() {} };
  return {
    advance(ms) {
      const end = now + ms;
      while (true) {
        const pair = [...tasks].filter(([, t]) => t.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
        if (!pair) break;
        const [n, task] = pair; now = task.due;
        if (task.interval) task.due += task.interval; else tasks.delete(n);
        act(() => task.fn());
      }
      now = end;
    },
    restore() { global.setTimeout = original.timeout; global.setInterval = original.interval; global.clearTimeout = original.clearTimeout; global.clearInterval = original.clearInterval; global.window = original.window; global.Image = original.Image; global.Audio = original.Audio; },
  };
}
const label = node => node.children.map(x => typeof x === 'string' ? x : '').join('');
function click(tree, name) { const b = tree.root.findAllByType('button').find(n => label(n) === name); assert.ok(b, `button ${name}`); act(() => b.props.onClick({ stopPropagation() {} })); }
const content = tree => JSON.stringify(tree.toJSON());

for (const [name, pick, expected] of [['all correct', s => s.choices.find(c => c.score === 50), 200], ['all incorrect', s => s.choices.find(c => c.score === 0), 0], ['partial credit', s => s.choices.find(c => c.score === 20), 80]]) {
  test(`Narrative game: ${name}, progression, feedback, duplicate-click lock, restart`, () => {
    const clock = setup(); let tree;
    try {
      act(() => { tree = create(<Game />); });
      click(tree, 'BƯỚC VÀO →'); click(tree, 'BẮT ĐẦU');
      let score = 0;
      scenarios.forEach((s, i) => {
        assert.ok(content(tree).includes(s.title));
        click(tree, 'TIẾP TỤC'); click(tree, 'Hiện lựa chọn ngay');
        const c = pick(s); const button = tree.root.findAllByType('button').find(b => label(b) === c.text);
        act(() => { button.props.onClick(); button.props.onClick(); });
        score += c.score; clock.advance(1200);
        assert.ok(content(tree).includes(c.result));
        assert.equal(tree.root.find(n => n.props.className === 'balance-score').children.join(''), `Tình huống ${i + 1}/4 · ${score}/200 điểm`);
        click(tree, 'TIẾP TỤC'); clock.advance(2600);
      });
      assert.ok(content(tree).includes(`Điểm học tập: `));
      assert.ok(content(tree).includes(String(expected)));
      click(tree, 'CHƠI LẠI');
      const meter = tree.root.find(n => n.props.className === 'balance-score');
      assert.equal(meter.children.join(''), 'Tình huống 1/4 · 0/200 điểm');
      click(tree, 'BẮT ĐẦU'); assert.ok(content(tree).includes(scenarios[0].title));
    } finally { if (tree) act(() => tree.unmount()); clock.restore(); }
  });
}

test('Game choices work when speech APIs are unavailable; typewriter finishes', () => {
  const clock = setup(); let tree;
  try {
    delete window.speechSynthesis; act(() => { tree = create(<Game />); });
    act(() => tree.root.findAllByType('button').find(b => b.props['aria-label'] === 'Bật giọng đọc').props.onClick());
    click(tree, 'BƯỚC VÀO →'); click(tree, 'BẮT ĐẦU'); click(tree, 'TIẾP TỤC');
    clock.advance(scenarios[0].dialogue.length * 40 + 500);
    assert.ok(tree.root.findAllByType('button').some(b => label(b) === scenarios[0].choices[0].text));
  } finally { if (tree) act(() => tree.unmount()); clock.restore(); }
});

const optionByText = (tree, text) => tree.root.findAllByType('button').filter(b => b.props.className?.startsWith('option-card')).find(b => b.findAllByProps({ className: 'option-text' }).some(span => span.children.join('') === text));

test('Quiz scores once despite stale repeated clicks, explains every selection, completes and resets', () => {
  const originalRandom = Math.random; Math.random = () => 0;
  let tree;
  try {
    act(() => { tree = create(<Quiz />); });
    quizQuestions.forEach((q, i) => {
      const answer = q.options.find(option => option.correct);
      const button = optionByText(tree, answer.text);
      act(() => { button.props.onClick(); button.props.onClick(); });
      const updated = tree.root.findAllByType('button').filter(b => b.props.className?.startsWith('option-card'));
      assert.ok(updated.every(b => b.props.disabled));
      assert.ok(content(tree).includes(answer.explanation));
      click(tree, i === 3 ? 'Xem kết quả' : 'Câu tiếp theo');
    });
    const result = tree.root.find(n => n.props.className === 'result-score');
    assert.deepEqual(result.findAllByType('strong').map(n => n.children.join('')), ['4', '4']);
    Math.random = () => .999;
    click(tree, 'Thử lại'); assert.ok(content(tree).includes(quizQuestions[0].question));
    const first = tree.root.findAllByType('button').find(b => b.props.className === 'option-card');
    assert.ok(first.findByProps({ className: 'option-text' }).children.includes(quizQuestions[0].options[0].text));
  } finally { if (tree) act(() => tree.unmount()); Math.random = originalRandom; }
});

test('3D book navigation: six sheets, twelve existing textures, correct boundaries', () => {
  const clock = setup(); const store = createStore(); let tree;
  try {
    assert.equal(pages.length, 6);
    for (const face of pages.flatMap(p => [p.front, p.back])) assert.ok(fs.existsSync(`public/textures/${face}.png`), face);
    act(() => { tree = create(<Provider store={store}><UI /></Provider>); });
    const byAria = name => tree.root.findAllByType('button').find(b => b.props['aria-label'] === name);
    assert.ok(byAria('Trang trước').props.disabled);
    for (let i = 0; i < 6; i++) act(() => byAria('Trang sau').props.onClick());
    assert.equal(store.get(pageAtom), 6); assert.ok(byAria('Trang sau').props.disabled);
    click(tree, 'Quan hệ'); assert.equal(store.get(pageAtom), 2);
    click(tree, 'Sinh viên'); assert.equal(store.get(pageAtom), 5);
    act(() => byAria('Trang trước').props.onClick()); assert.equal(store.get(pageAtom), 4);
    click(tree, 'Bìa'); assert.equal(store.get(pageAtom), 0);
  } finally { if (tree) act(() => tree.unmount()); clock.restore(); }
});

test('Academic coverage, source boundaries and no old topic in rendered content', () => {
  const html = renderToStaticMarkup(<><Hero /><Theory /><Conclusion /><AIUsagePage /></>);
  for (const item of ['Bản Chất', 'Vai Trò', 'quan-he', 'tinh-huong', 'giai-phap', 'sinh-vien', 'conclusion', 'WeDo', 'Đánh đổi', 'Nhà nước', 'chưa kiểm tra bản in', 'không phải kết luận']) assert.ok(html.toLocaleLowerCase().includes(item.toLocaleLowerCase()), item);
  assert.doesNotMatch(html, /MLN111|Tồn tại xã hội|Ý thức xã hội|Triết học Mác/iu);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]); assert.equal(new Set(ids).size, ids.length);
});

test('Quiz incorrect answers use their own explanations and award zero points', () => {
  let tree;
  try {
    act(() => { tree = create(<Quiz />); });
    quizQuestions.forEach((q, i) => {
      const wrong = q.options.find(option => !option.correct);
      const button = optionByText(tree, wrong.text);
      act(() => button.props.onClick());
      assert.ok(content(tree).includes('Chưa đúng!'));
      assert.ok(content(tree).includes(wrong.explanation));
      click(tree, i === 3 ? 'Xem kết quả' : 'Câu tiếp theo');
    });
    const result = tree.root.find(n => n.props.className === 'result-score');
    assert.deepEqual(result.findAllByType('strong').map(n => n.children.join('')), ['0', '4']);
  } finally { if (tree) act(() => tree.unmount()); }
});

test('Expandable explanations expose state and hide closed content', () => {
  let tree; act(() => { tree = create(<ExpandCard title="Giải thích"><p>Nội dung</p></ExpandCard>); });
  let button = tree.root.findByType('button');
  assert.equal(button.props['aria-expanded'], false);
  act(() => button.props.onClick()); button = tree.root.findByType('button');
  assert.equal(button.props['aria-expanded'], true);
  const body = tree.root.find(n => n.props.id === button.props['aria-controls']); assert.equal(body.props.hidden, false);
  act(() => button.props.onClick()); assert.equal(body.props.hidden, true);
  act(() => tree.unmount());
});

test('Navbar switches from book to specific content, and book/source tabs', () => {
  const clock = setup(); const previousDocument = global.document; let tree;
  try {
    global.document = { getElementById: () => null }; let target;
    act(() => { tree = create(<Navbar activeTab="book" onTabChange={id => { target = id; }} />); });
    for (const [href, expected] of [['#quan-he', 'quan-he'], ['#tinh-huong', 'tinh-huong'], ['#giai-phap', 'giai-phap'], ['#sinh-vien', 'sinh-vien'], ['#conclusion', 'conclusion'], ['#ai', 'ai']]) {
      const link = tree.root.findAllByType('a').find(a => a.props.href === href);
      act(() => link.props.onClick({ preventDefault() {} })); assert.equal(target, expected); clock.advance(100);
    }
    act(() => tree.update(<Navbar activeTab="ai" onTabChange={id => { target = id; }} />));
    act(() => tree.root.findAllByType('a').find(a => a.props.href === '#book').props.onClick({ preventDefault() {} })); assert.equal(target, 'book');
  } finally { if (tree) act(() => tree.unmount()); global.document = previousDocument; clock.restore(); }
});

test('Navbar scroll tracking follows nested theory, solutions and student sections', () => {
  const clock = setup();
  const previousDocument = global.document;
  const previousFrame = global.requestAnimationFrame, previousCancel = global.cancelAnimationFrame;
  let onScroll, target, hash;
  const positions = { hero: -1000, 'ton-tai': -700, 'quan-he': -200, 'tinh-huong': 400, 'giai-phap': 800, 'sinh-vien': 1200, quiz: 1600, conclusion: 2000 };
  global.document = { getElementById: id => positions[id] === undefined ? null : { id, getBoundingClientRect: () => ({ top: positions[id] }), scrollIntoView() { target = id; } } };
  global.requestAnimationFrame = fn => setTimeout(fn, 0);
  global.cancelAnimationFrame = id => clearTimeout(id);
  window.addEventListener = (type, fn) => { if (type === 'scroll') onScroll = fn; };
  window.history = { pushState(a, b, value) { hash = value; } };
  let tree;
  try {
    act(() => { tree = create(<Navbar activeTab="game" />); });
    const current = () => tree.root.findAllByType('a').find(a => a.props['aria-current'] === 'location').props.href;
    assert.equal(current(), '#quan-he');
    positions['tinh-huong'] = -200; positions['giai-phap'] = 120;
    act(() => onScroll()); clock.advance(1); assert.equal(current(), '#giai-phap');
    const link = tree.root.findAllByType('a').find(a => a.props.href === '#sinh-vien');
    act(() => link.props.onClick({ preventDefault() {} }));
    assert.equal(target, 'sinh-vien'); assert.equal(hash, '#sinh-vien');
  } finally {
    if (tree) act(() => tree.unmount());
    global.document = previousDocument;
    global.requestAnimationFrame = previousFrame; global.cancelAnimationFrame = previousCancel;
    clock.restore();
  }
});


test('Randomized answers reach all positions without changing correctness or explanation', () => {
  const positions = new Set();
  for (const value of [0, .49, .999]) {
    const run = createQuiz(() => value);
    run.forEach((q, i) => {
      assert.equal(q.options.filter(option => option.correct).length, 1);
      positions.add(q.options.findIndex(option => option.correct));
      assert.deepEqual(new Set(q.options.map(o => o.text)), new Set(quizQuestions[i].options.map(o => o.text)));
      for (const option of q.options) assert.ok(option.explanation.length > 60);
    });
    const story = createScenarioRun(scenarios, () => value);
    story.forEach((scene, i) => {
      assert.deepEqual(scene.choices.map(c => c.label), ['A', 'B', 'C']);
      assert.deepEqual(scene.choices.map(c => c.score).sort((a, b) => a - b), [0, 20, 50]);
      assert.deepEqual(new Set(scene.choices.map(c => c.text)), new Set(scenarios[i].choices.map(c => c.text)));
    });
  }
  assert.deepEqual(positions, new Set([0, 1, 2]));
});

test('Narrative mixed choices produce exact score and accurate final choice history', () => {
  const clock = setup(); let tree;
  try {
    act(() => { tree = create(<Game />); });
    click(tree, 'BƯỚC VÀO →'); click(tree, 'BẮT ĐẦU');
    const scores = [50, 20, 0, 50];
    const selected = [];
    scenarios.forEach((scene, i) => {
      click(tree, 'TIẾP TỤC'); click(tree, 'Hiện lựa chọn ngay');
      const answer = scene.choices.find(c => c.score === scores[i]); selected.push(answer);
      const button = tree.root.findAllByType('button').find(b => label(b) === answer.text);
      act(() => { button.props.onClick(); button.props.onClick(); });
      clock.advance(1200);
      click(tree, 'TIẾP TỤC'); clock.advance(2600);
    });
    const history = tree.root.findByProps({ className: 'balance-history' });
    assert.equal(history.findAllByType('li').length, 4);
    selected.forEach((answer, i) => assert.ok(history.findAllByType('li')[i].findAllByType('span').some(n => n.children.join('') === answer.text)));
    assert.ok(content(tree).includes('120'));
    const status = tree.root.findAll(n => n.props.role === 'status').find(n => n.children.join('').startsWith('Điểm học tập:'));
    assert.equal(status.children.join(''), 'Điểm học tập: 120/200 · 2/4 lựa chọn phù hợp');
  } finally { if (tree) act(() => tree.unmount()); clock.restore(); }
});

test('Hypothetical fare balances money and labels fee revenue separately from profit', () => {
  const result = calculateFare(hypotheticalFare);
  assert.deepEqual(result, { fee: 20000, gross: 80000, costs: 35000, net: 45000 });
  assert.equal(result.fee + result.costs + result.net, hypotheticalFare.fare);
  const html = renderToStaticMarkup(<FareExample />);
  for (const text of ['GIẢ ĐỊNH', 'HYPOTHETICAL', 'không phải lợi nhuận', 'không phải số liệu']) assert.ok(html.includes(text));
});

test('Book cover-to-cover face order and responsive framing are consistent', () => {
  const expected = [['Coverpage_open'], ['Open 1', 'Open 2'], ['46_Page_1', '46_Page_2'], ['47_Page_1', '47_Page_2'], ['48_Page_1', '48_Page_2'], ['Close 1', 'Close 2'], ['Coverpage_close']];
  expected.forEach((faces, page) => assert.deepEqual(getVisibleFaces(page), faces));
  for (const [width, height] of [[1920, 810], [1366, 498], [1024, 498], [390, 574]]) {
    for (let page = 0; page <= 6; page++) {
      const reading = getBookFraming(width, height, 'reading', page);
      const showcase = getBookFraming(width, height, 'showcase', page);
      assert.ok(Number.isFinite(reading.distance) && reading.distance > 0);
      assert.ok(showcase.distance >= reading.distance);
      const halfHeight = reading.distance * Math.tan(reading.fov * Math.PI / 360);
      assert.ok(halfHeight * 2 >= 2.2 - 1e-8);
      assert.ok(halfHeight * 2 * width / height >= (page === 0 || page === 6 ? 1.8 : 2.8) - 1e-8);
    }
  }
});

test('Five distinct local image assets map to the intended hero and four scenarios', () => {
  assert.equal(new Set(Object.values(visualAssets)).size, 5);
  assert.deepEqual(scenarios.map(s => s.id), [1, 2, 3, 4]);
  assert.deepEqual(scenarios.map(s => s.image), [visualAssets.driver, visualAssets.platform, visualAssets.customer, visualAssets.students]);
  Object.values(visualAssets).forEach(path => assert.ok(fs.existsSync(`public${path}`), path));
  const html = renderToStaticMarkup(<Hero />);
  assert.ok(html.includes(visualAssets.hero));
  assert.doesNotMatch(html, /revolution-bg|vietnam-modern-economy\.png/);
});


test('Book enlarged reader navigates all twelve faces, closes and restores scroll state', () => {
  const clock = setup(); const previousDocument = global.document;
  global.document = { body: { style: { overflow: 'auto' } }, activeElement: { focus() {} } };
  const store = createStore(); let tree;
  try {
    act(() => { tree = create(<Provider store={store}><UI /></Provider>); });
    click(tree, 'Đọc bản lớn');
    assert.equal(document.body.style.overflow, 'hidden');
    const seen = [];
    for (let page = 0; page <= 6; page++) {
      const dialog = tree.root.findByProps({ role: 'dialog' });
      const images = dialog.findAllByType('img');
      assert.deepEqual(images.map(img => img.props.src), getVisibleFaces(page).map(face => `/textures/${face}.png`));
      seen.push(...images.map(img => img.props.src));
      const next = dialog.findAllByType('button').find(b => label(b) === 'Trang sau');
      if (page < 6) act(() => next.props.onClick()); else assert.ok(next.props.disabled);
    }
    assert.equal(new Set(seen).size, 12);
    click(tree, 'Về sách 3D');
    assert.equal(tree.root.findAllByProps({ role: 'dialog' }).length, 0);
    assert.equal(document.body.style.overflow, 'auto');
    assert.equal(store.get(pageAtom), 6);
  } finally { if (tree) act(() => tree.unmount()); global.document = previousDocument; clock.restore(); }
});
