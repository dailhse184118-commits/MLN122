# MLN122 — Website thuyết trình Slot 8

Chương 5, mục 5.3.1: Lợi ích kinh tế và quan hệ lợi ích kinh tế trong nền kinh tế thị trường định hướng xã hội chủ nghĩa.

Bản hoàn thiện trực tiếp từ source MLN111 và hai ZIP bổ sung người dùng cung cấp. Giữ template, game kể chuyện và sách 3D 6 lá/12 mặt.

## Chạy trên Windows CMD

Nhập từng dòng, Enter và chờ lệnh hoàn tất:

```cmd
cd /d "D:\MLN122\Website-MLN111-main"
npm ci
npm run dev
```

Nếu đã cài thư viện thì chỉ cần `npm run dev`. Dừng các tiến trình dev/preview bằng Ctrl+C trước khi chạy lại `npm ci` để tránh khóa `esbuild.exe`.

## Chạy trên Windows PowerShell

```powershell
Set-Location 'D:\MLN122\Website-MLN111-main'
npm ci
npm run dev -- --host 127.0.0.1
```

Mở http://127.0.0.1:5173/. Nếu giải nén sang vị trí khác, thay đường dẫn Set-Location tương ứng. Dùng npm với package-lock.json.

```powershell
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Preview thông thường ở http://127.0.0.1:4173/. Script kiểm tra tài nguyên:

```powershell
node scripts/verify-assets.mjs
node scripts/verify-assets.mjs http://127.0.0.1:4173 --production
```

Không mở index.html bằng file://; Three.js và module cần HTTP server. Các liên kết nguồn cần Internet; ảnh/font/texture/model hiển thị dùng tài nguyên cục bộ. Giọng đọc phụ thuộc API/voice có sẵn của trình duyệt, mặc định tắt.

## Kết quả và giới hạn

- Đợt tối ưu trình chiếu hiện tại: 23/23 kiểm thử tương tác/tọa độ thành công; build production thành công; 57/57 tài nguyên public đúng HTTP. Bốn artifact build được đối chiếu SHA-256 qua production preview. Sách có năm minh họa hình học, không tải GLB. Font cục bộ đủ 112 mã tiếng Việt đã kiểm tra.
- Chưa kiểm thử trực quan browser/desktop/mobile/WebGL/console vì công cụ không xác minh được quyền localhost. Chưa có screenshot website đang chạy.
- Đã đọc thông báo gốc UBCTQG ngày 11/09/2026; đây là rà soát/xác minh, không phải kết luận vi phạm.
- Đã đối chiếu phần lý luận với bản 2021 đăng lại và bài giảng Chương 5 của Đại học Thương mại. Chưa kiểm tra bản in của nhóm; không gán số trang cho từng diễn giải.
- Build còn cảnh báo directive Jotai và chunk sách khoảng 877 KB minified; chưa thay major runtime trong đợt này.

Xem [Báo cáo trình chiếu hiện tại](PROJECTOR_REPORT_MLN122.md), [báo cáo thay ảnh trước đó](VISUAL_ASSETS_REPORT_MLN122.md) và [báo cáo chỉnh sửa nội dung trước đó](REFINEMENT_REPORT_MLN122.md) và [Báo cáo kiểm thử](TESTING_REPORT_MLN122.md). Báo cáo chuyển đổi trước đó nằm ở IMPLEMENTATION_REPORT_MLN122.md.

## Sửa nội dung và sách

Nội dung và tình huống nằm ở src/content/mln122.js; quiz và hàm xáo trộn ở src/content/quiz.js; nội dung chính nằm ở src/game/sections/TonTaiXaHoi.jsx. Thứ tự sách khai báo ở src/book/UI.jsx, giữ tên texture kỹ thuật.

Bìa trước, mười trang nội dung và bìa sau được tạo bằng `node scripts/generate-book-cover.mjs`, `node scripts/generate-book-pages.mjs`, `node scripts/generate-book-back-cover.mjs`. Các script dùng Skia và Noto Serif/Be Vietnam Pro đóng gói trong assets/fonts, không phụ thuộc font Windows. Bằng chứng giới hạn glyph/layout nằm trong qa/book-typesetting.json. Cơ chế sách gốc nằm ở src/book/Book.jsx. Nút Đọc bản lớn dùng chung texture và trạng thái trang của sách 3D. Nguồn tài nguyên gốc/giấy phép cần nhóm rà soát nếu phát hành công khai.
