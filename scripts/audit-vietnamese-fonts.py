"""Recheck shipped font cmaps; requires fonttools and brotli, not a browser."""
import hashlib
import json
from pathlib import Path
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
alphabet = 'ăâêôơưđĂÂÊÔƠƯĐắằẳẵặấầẩẫậếềểễệốồổỗộớờởỡợứừửữự'
required = set(map(ord, alphabet + alphabet.upper())) | set(range(0x1EA0, 0x1EFA)) | {0x0300, 0x0301, 0x0303, 0x0309, 0x0323, 0x0302, 0x0306, 0x031B}
fonts = sorted((root / 'public/fonts').glob('*.woff2')) + [root / 'assets/fonts' / name for name in ['NotoSerif-Bold.ttf', 'BeVietnamPro-Regular.ttf', 'BeVietnamPro-SemiBold.ttf']]
records = []
for path in fonts:
    font = TTFont(path)
    missing = sorted(required - set(font.getBestCmap()))
    assert not missing, f'{path.name}: missing {missing}'
    records.append({'file': path.relative_to(root).as_posix(), 'family': font['name'].getDebugName(1), 'weight': font['OS/2'].usWeightClass, 'missingVietnamese': missing, 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
text_files = [root / 'index.html', *root.glob('src/**/*.jsx'), *root.glob('src/**/*.js'), *root.glob('src/**/*.css'), root / 'public/fonts/fonts.css', *root.glob('scripts/*.mjs')]
for path in text_files:
    assert '\ufffd' not in path.read_text(encoding='utf-8'), f'{path}: invalid replacement glyph'
report = {'requiredVietnameseCodepoints': len(required), 'fontFilesChecked': len(records), 'utf8TextFilesChecked': len(text_files), 'fonts': records}
(root / 'qa/font-coverage-verified.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Font cmaps: {len(records)} files × {len(required)} required codepoints; {len(text_files)} UTF-8 source files checked.')
