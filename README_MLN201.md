# MLN201 — Website thuyết trình Slot 8

Chương 5, mục 5.3.1: Lợi ích kinh tế và quan hệ lợi ích kinh tế trong nền kinh tế thị trường định hướng xã hội chủ nghĩa.

Bản hoàn thiện trực tiếp từ source MLN111 và hai ZIP MLN201 người dùng cung cấp. Giữ template, game kể chuyện và sách 3D 6 lá/12 mặt.

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
node scripts/verify-assets.mjs http://127.0.0.1:4173
```

Không mở index.html bằng file://; Three.js và module cần HTTP server. Các liên kết nguồn cần Internet; ảnh/font/texture/model hiển thị dùng tài nguyên cục bộ. Giọng đọc phụ thuộc API/voice có sẵn của trình duyệt, mặc định tắt.

## Kết quả và giới hạn

- Đợt thay ảnh hiện tại: 17/17 kiểm thử logic thành công; build production thành công; 75/75 tài nguyên public trả đúng HTTP ở dev và production preview. Năm JPEG mới 1600×900, tổng 973.969 byte.
- Chưa kiểm thử trực quan browser/desktop/mobile/WebGL/console vì công cụ không xác minh được quyền localhost. Chưa có screenshot website đang chạy.
- Đã đọc thông báo gốc UBCTQG ngày 11/09/2026; đây là rà soát/xác minh, không phải kết luận vi phạm.
- Đã đối chiếu phần lý luận với bản 2021 đăng lại và bài giảng Chương 5 của Đại học Thương mại. Chưa kiểm tra bản in của nhóm; không gán số trang cho từng diễn giải.
- Còn 10 cảnh báo dependency sau cập nhật tương thích; chưa nâng major Vite/Tailwind.

Xem [Báo cáo thay ảnh hiện tại](VISUAL_ASSETS_REPORT_MLN201.md) và [báo cáo chỉnh sửa nội dung trước đó](REFINEMENT_REPORT_MLN201.md) và [Báo cáo kiểm thử](TESTING_REPORT_MLN201.md). Báo cáo chuyển đổi trước đó nằm ở IMPLEMENTATION_REPORT_MLN201.md.

## Sửa nội dung và sách

Nội dung và tình huống nằm ở src/content/mln201.js; quiz và hàm xáo trộn ở src/content/quiz.js; nội dung chính nằm ở src/game/sections/TonTaiXaHoi.jsx. Thứ tự sách khai báo ở src/book/UI.jsx, giữ tên texture kỹ thuật.

Bìa trước được tạo lại bằng `node scripts/generate-book-cover.mjs`, dùng font Times New Roman và Arial của Windows khi có. Mười trang bên trong được sắp chữ lại bằng `node scripts/generate-book-pages.mjs`; script này dùng font Windows và ghi bằng chứng giới hạn layout vào qa/book-typesetting.json. Cơ chế sách gốc nằm ở src/book/Book.jsx. Nút Đọc bản lớn dùng chung texture và trạng thái trang của sách 3D. Nguồn tài nguyên gốc/giấy phép cần nhóm rà soát nếu phát hành công khai.
