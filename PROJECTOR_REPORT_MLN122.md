# MLN122 Slot 8 — Chỉnh sửa cho trình chiếu lớp học

Ngày thực hiện: 12/10/2026. Sửa trực tiếp repository hiện tại, giữ template kem, burgundy, vàng trầm và đen. Không thay cấu trúc bài học, game, quiz hoặc mô hình sách sáu lá/mười hai mặt.

## 1. Những file thay đổi

| Nhóm | File / tài nguyên | Thay đổi chính |
|---|---|---|
| Typography | `src/styles/projection.css`, `src/index.css`, `src/main.jsx`, `index.html`, `public/fonts/fonts.css` | Cỡ chữ responsive, font tiếng Việt đóng gói, preload, khoảng cách và tương phản |
| Điều hướng và bài học | `src/game/sections/Navbar.jsx`, `TonTaiXaHoi.jsx`, `Hero.jsx`, `src/content/visualAssets.js`, `src/ai-usage/AIUsagePage.jsx` | Đo chiều cao navbar, anchor clearance, bỏ cỡ chữ inline nhỏ, ảnh ban ngày, thống nhất font |
| Game | `src/game/sections/GearOfEra.jsx` | Tăng chữ câu hỏi, lựa chọn, hướng dẫn và kết quả; giữ các cột nhân vật riêng |
| Sách | `src/book/UI.jsx`, `BookPage.jsx`, `Experience.jsx`, `Book.jsx`, `ModelShowcase.jsx`, `PageParticles.jsx`, `PopupElements.jsx`, `PageReader.jsx`, `IntroScreen.jsx`, `framing.js` | Minh họa trong chế độ đọc, camera, texture filtering, header tự đo chiều cao, reader và typography |
| Minh họa mới | `src/book/EconomicIllustrations.jsx`, `src/book/illustrationThemes.js` | Năm mô hình hình học nhẹ theo nội dung từng cặp trang |
| Font và ảnh | 11 WOFF2 và hai giấy phép trong `public/fonts`, font nguồn trong `assets/fonts`, `public/images/mln122/hero-hcmc-daylight.jpg` | Font cục bộ; hero AI ban ngày 1600×900; giữ bản nguồn và ảnh hoàng hôn cũ ngoài public |
| Texture | 12 PNG trong `public/textures` | Tạo lại chữ bằng font đóng gói; giữ tên file, màu sắc, số trang và thứ tự |
| Công cụ | `scripts/book-fonts.mjs`, `generate-book-pages.mjs`, `generate-book-cover.mjs`, `generate-book-back-cover.mjs`, `relabel-book-back-cover.mjs`, `book-contact-sheet.mjs`, `audit-vietnamese-fonts.py`, `verify-projection-typography.mjs`, `verify-assets.mjs`, `optimize-visual-assets.mjs`, `run-tests.mjs` | Nguồn editable, kiểm tra font/texture/tài nguyên, ghi file thay thế nguyên tử để tránh PNG ghi dở khi Vite đọc |
| Kiểm thử | `tests/interactions.test.jsx`, `tests/book-scene.test.jsx`, `tests/fiber-stub.mjs`, `tests/drei-stub.mjs` | Giữ các kiểm thử tương tác; thêm chế độ 3D, bàn phím reader và kiểm tra tọa độ camera |
| Tài liệu | `README.md`, `README_MLN122.md`, báo cáo này và `qa/*projector*`, `qa/font-*`, ảnh QA | Kết quả thực tế và giới hạn kiểm chứng |

Năm GLB cũ, tổng 184.510.388 byte (khoảng 176 MiB), được giữ ở `assets/legacy-models`. Các TTF cũ được giữ ở `assets/fonts/legacy`. Cả hai nhóm không nằm trong `public`, không được xuất cùng bản chạy. Danh sách thay đổi chi tiết ở `qa/projector-changed-files.json`.

## 2. Sửa font tiếng Việt

Audit cmap của 26 TTF cũ cho thấy Outfit thiếu 95 trong 112 mã ký tự tiếng Việt/dấu kết hợp được kiểm tra. Playfair Display có các chữ dựng sẵn nhưng thiếu dấu horn kết hợp U+031B. Be Vietnam Pro đang có đủ tập ký tự này nên được giữ làm font thân bài.

Heading dùng Noto Serif normal/italic dạng variable, weight 100–900. Thân bài dùng Be Vietnam Pro weight 300, 400, 500, 600, 700, 800, 900; italic 400 và 700. Chọn font dựa trên glyph coverage, không chỉ tên family. Toàn bộ 11 WOFF2 có đủ 112 mã cần kiểm tra, tổng 567.596 byte. Font nguồn lấy từ Google Fonts; giấy phép SIL OFL được đóng gói cùng tài nguyên: [Noto Serif](https://github.com/google/fonts/blob/main/ofl/notoserif/OFL.txt), [Be Vietnam Pro](https://github.com/google/fonts/blob/main/ofl/bevietnampro/OFL.txt).

Đã thêm `font-display: swap`, preload hai face chính, fallback serif/sans thích hợp và `font-synthesis: none`. Không tải font từ Google Fonts trong thời gian chạy. HTML giữ `lang="vi"`, UTF-8; kiểm tra 45 file văn bản UTF-8 không thấy ký tự thay thế U+FFFD.

Canvas sách chuyển sang Skia với font TTF đóng gói, loại bỏ phụ thuộc font Windows/Pango có thể fallback âm thầm. Kiểm tra 14 file font thực tế (11 WOFF2 và ba TTF dùng trong sách) đều đủ 112 mã. Mẫu NFC và NFD cho cùng độ rộng chữ với cả hai family; đã xem trực quan mẫu chữ tại `qa/vietnamese-font-specimen.png`. Bộ tạo trang kiểm tra giới hạn glyph theo từng dòng để dấu không va chạm hoặc vượt khung.

Giới hạn: cmap và shaping Skia đã được kiểm tra; chưa xác nhận font cuối cùng được browser chọn bằng `document.fonts` hoặc DevTools.

## 3. Cỡ chữ trước và sau

Theo phản hồi tiếp theo của người dùng, chữ giao diện đã giảm theo ba lượt: khoảng 10%, 5–7%, rồi thêm khoảng 5%. Nội dung và texture sách đã được người dùng chấp nhận, được giữ nguyên trong lượt khôi phục hiệu ứng và xoay 360°. Các giá trị hiện tại dưới đây tính từ CSS ở zoom 100%, root 16px; không phải số đo từ browser. Hai số sau lần lượt là tại 1366px và 1920px chiều rộng.

| Thành phần | Trước | Sau |
|---|---:|---:|
| Hero headline | 82 / 88px | 72 / 89px |
| Heading section | 44,8px | 39,7 / 49px |
| Tiêu đề feature card | 18,4px | 20 / 23,3px |
| Nội dung feature card | 15,2px | 18,5 / 21,5px |
| Tiêu đề accordion | 16,8px | 20 / 23,3px |
| Nội dung accordion | khoảng 16px | 18,5 / 21,5px |
| Câu hỏi game kể chuyện | 24,6 / 25px | 26,6 / 33,8px |
| Lựa chọn game kể chuyện | 15,7 / 18px | 19,5 / 22,5px |
| Câu hỏi quiz | 25,6px | 26,6 / 33,8px |
| Lựa chọn quiz | 15,2px | 19,5 / 22,5px |
| Chú thích nguồn chính | 13,6px | 16 / 17,6px |
| Navigation | 12px | 15 / 16,5px |
| Navigation sách | 11px | 16px |
| Heading reader | 19,2px | 23,5px |

Body line-height 1,7; heading 1,4; câu hỏi game 1,5 và đáp án 1,55. Card tự tăng chiều cao; grid giảm số cột khi cần. Màn hình nhỏ dùng body 16,5–17px, không giữ nguyên desktop size rồi ép nội dung vào khung cố định.

Trong texture 1536×2048: body tăng từ 64px lên 96px với trang ba mục, từ 51px lên 92px với trang bốn mục; tiêu đề trang tăng 82px → 100px. Đây là pixel trong ảnh texture, không phải kích thước chữ CSS khi sách được chiếu lên màn hình.

## 4. Năm minh họa 3D

| Cặp trang | Minh họa |
|---|---|
| Khái niệm / vai trò | Các chồng tiền, thu nhập và cột tăng trưởng |
| Quan hệ / nhân tố | Mạng các chủ thể kết nối với nhau |
| Thống nhất / mâu thuẫn | Cán cân với hai đĩa lợi ích |
| Grab / giải pháp | Xe máy, điện thoại nền tảng và các nhánh phân phối tiền |
| Sinh viên / tổng kết | Laptop, ba thành viên cùng làm việc và biểu đồ phát triển |

Hiện trong cả chế độ đọc mặc định và `3D View`; bìa trước/sau không đặt minh họa. Mỗi lần chỉ dựng mô hình của phần đang đọc; dưới 60 mesh mỗi cảnh trong kiểm thử. Dùng geometry nhỏ, vật liệu roughness cao, vàng trầm và burgundy; không tải GLB. Chuyển động xuất hiện nhẹ, bob 0,02 đơn vị và cán cân nghiêng chậm; có hỗ trợ reduced motion. Khôi phục PageParticles: burst 40 hạt sáng và 12 hạt burgundy trong 1,8 giây khi lật trang; thêm 24 hạt vàng nhẹ trong 3D View. Tắt hạt khi hệ điều hành yêu cầu reduced motion.

Camera dành vùng riêng bên cạnh sách trên desktop hoặc phía trên trên màn hình hẹp. `3D View` cho phép xoay đủ 360° ngang, nghiêng gần toàn bộ chiều dọc và zoom có giới hạn. Camera dùng bán kính bao cảnh để sách và minh họa không bị cắt khi nhìn từ các hướng khác nhau. Bấm Đọc sách để trở về góc đọc thẳng. Khi người dùng kéo, camera tự động ngừng nội suy để không giành quyền điều khiển; thao tác kéo quá 4px không bị coi là click lật trang. Không đổi skeleton, UV, sáu lá sách hay thuật toán lật trang gốc.

## 5. Sách dễ đọc hơn

Tạo lại đủ 10 trang nội dung và hai bìa bằng nguồn JavaScript editable; PNG lossless, tổng 3.022.114 byte. Nền kem, khung vàng, heading burgundy và số trang 01–10 được giữ. Các câu trên texture được tóm gọn để nhường chỗ cho chữ lớn; diễn giải đầy đủ vẫn ở website. Bốn quan hệ cơ bản, bốn nhân tố, hai vai trò, hai mặt, Grab, giải pháp và liên hệ sinh viên vẫn có đủ.

Tách rõ phản ánh tài xế, thông báo rà soát và nhận định của nhóm. Trang giải pháp giữ đúng nghĩa “hài hòa không nhất thiết chia đều”. Không thêm dữ liệu thực tế, trích dẫn hoặc số trang giáo trình. Loại ký hiệu mũi tên không có glyph trong font canvas bằng từ nối tiếng Việt có nghĩa rõ ràng.

Renderer tăng anisotropy tối đa 8 theo khả năng GPU, giữ sRGB; giảm hover emissive 0,22 → 0,06. Book nghiêng ít hơn trong chế độ đọc. Header đo chiều cao thực tế; chuyển ghi chú sách do sinh viên biên soạn xuống footer để dành thêm không gian cho sách. `Đọc bản lớn` dùng texture đầy đủ và chung trạng thái trang; bổ sung phím mũi tên và Escape.

Đã xem đủ 12 mặt qua ba contact sheet `qa/book-projection-1.png` đến `-3.png`; đây là ảnh texture, không phải screenshot website/WebGL.

## 6. UI và hero

- Navbar dùng ResizeObserver để tính clearance; anchor dùng `scroll-margin-top` theo số đo đó. Link giữ một dòng, có horizontal scroll khi màn hình hẹp.
- Nhãn giữa sơ đồ Thống nhất & Mâu thuẫn hiển thị ngang; trên màn hình hẹp hai phía chuyển thành một cột.
- Card số trang trí có vùng riêng; card kết luận chỉ có đoạn văn cũng được chừa chỗ. Accordion mở không áp max-height, tăng padding và chữ.
- Nhân vật game giữ cột riêng; mobile chuyển nhân vật lên hàng trên. Câu hỏi/lựa chọn ở trong panel tối và document flow, không đặt trên layer của nhân vật.
- Hướng dẫn, điểm, giải thích và lịch sử lựa chọn được tăng chữ. Giữ chuyển cảnh, typewriter, sound control, điểm 0/20/50, tối đa 200 và replay.
- Hero thay bằng ảnh AI mô phỏng chụp ban ngày TP.HCM, white balance trung tính khoảng 5500K theo art direction, màu tiết chế, không chữ/UI trong ảnh. JPEG cục bộ 1600×900; không còn hero hoàng hôn cam trong bản chạy.

Các điều chỉnh bố trí được triển khai trong source; chưa xác nhận toàn bộ giao diện bằng screenshot browser.

## 7. Kiểm tra đã chạy

| Kiểm tra | Kết quả / bằng chứng |
|---|---|
| `npm test` | 23/23 pass; `qa/tests-projector.txt` |
| `npm run build` | Exit 0; `qa/build-projector.txt` |
| Asset HTTP production preview | 57/57 public assets đúng HTTP 200 và MIME không phải HTML; `qa/http-projector.txt` |
| Bundle production | Bốn file build được GET và đối chiếu SHA-256 với file hiện tại; `/book`, `/ai` trả HTML SPA |
| Font cmap / UTF-8 | 14 font đủ 112 mã, 45 file UTF-8; `qa/font-coverage-verified.json` |
| Font shaping / text metrics | NFC/NFD cùng độ rộng; 20 tổ hợp tình huống/chiều rộng; `qa/projection-typography-metrics.json` |
| Typesetting sách | 10 trang không tràn chân trang và không chồng glyph; `qa/book-typesetting.json` |
| Book logic | Bảy vị trí điều hướng, 12 mặt texture, chế độ đọc/3D, reader, phím trái/phải/Escape và khôi phục scrolling |
| Sparkles | Burst phát lại khi lật nhanh, tự dừng, ambient còn trong 3D View và reduced motion tắt hiệu ứng |
| Game / quiz | Đúng, sai, điểm từng phần, tổng hỗn hợp 120/200, khóa double click, phản hồi, xáo trộn và replay |
| Camera tính toán | 1366×768, 1920×1080, 2560×1440, 820×1180, 390×844: 50 cấu hình mở sách mặc định và 2.520 góc orbit lấy mẫu qua các cặp trang/bìa; bounding box sách/mô hình nằm trong khung và tách nhau ở góc đọc ban đầu |

Kiểm thử camera dùng geometry Three.js, perspective projection và React renderer có stub Fiber/Drei; không có GPU/WebGL hoặc layout engine browser. Chiều cao canvas được giả định trong kiểm thử; source đo header và canvas thực tế khi chạy. Mẫu metrics game là ước lượng xuống dòng, không phải đo layout DOM. Ở viewport hẹp nội dung game có thể cần cuộn, không cắt đáp án.

Build còn hai cảnh báo: directive `use client` của Jotai được bundler bỏ qua, và chunk sách khoảng 877 KB minified / 241 KB gzip. Sách đã lazy-load riêng nhưng chưa tối ưu thêm dependency để tránh thay runtime trong đợt này.

## 8. Giới hạn còn lại

Browser automation từ chối mở localhost vì không xác minh được saved browser permissions. Chưa chụp được homepage, lý thuyết, quan hệ, Grab, giải pháp, sinh viên, game, sách hay kết luận ở 1366×768/1920×1080. Chưa kiểm tra browser console, lựa chọn font thực tế, âm thanh phát ra, animation lật trang trên GPU, FPS, bóng/ánh sáng cuối cùng hoặc khả năng đọc từ cuối lớp trên máy chiếu thật. Không ghi các phần này là đã pass.

Cần mở bản deploy hoặc `npm run preview` trên máy trình chiếu, zoom 100%, đi hết bảy vị trí sách, thử `3D View`, `Đọc bản lớn`, một lượt game và một lượt quiz. Tình trạng deploy Vercel chỉ được coi là thành công khi nền tảng báo deployment ready; Git push thành công không tự xác nhận deployment.

## Tái tạo trang sách

```sh
node scripts/generate-book-cover.mjs
node scripts/generate-book-pages.mjs
node scripts/generate-book-back-cover.mjs
node scripts/book-contact-sheet.mjs
node scripts/verify-projection-typography.mjs
npm test
npm run build
```

Trong đợt khôi phục 360°/lấp lánh không tạo lại ảnh trang sách; 12 texture vẫn giống commit trước.

Các script canvas dùng `@napi-rs/canvas` trong devDependencies và TTF ở `assets/fonts`; không cần font Windows. `scripts/audit-vietnamese-fonts.py` dùng Python với `fonttools` và `brotli`, chỉ phục vụ kiểm tra, không cần trên Vercel.
