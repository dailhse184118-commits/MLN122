# Kiểm thử bản MLN122 đã chỉnh — 12/10/2026

Đợt thay ảnh mới đã hoàn tất sau báo cáo này. Xem [VISUAL_ASSETS_REPORT_MLN122.md](VISUAL_ASSETS_REPORT_MLN122.md): 17/17 tests, 75/75 HTTP assets và thay đổi material sách. Số liệu bên dưới là kết quả của đợt chỉnh nội dung trước đó.

## Đã chạy

- `npm run build`: đạt, Vite 4.5.14; còn cảnh báo chunk sách 942,19KB và directive Jotai `use client` bị bỏ qua.
- `npm test`: **16/16 đạt**. Log ở [qa/tests-refinement.txt](qa/tests-refinement.txt). Kiểm tra renderer có mock clock/window/speech, không phải browser.
- Game đủ bốn tình huống: 200/0/80 điểm; chọn hỗn hợp 120 điểm; feedback theo phương án; khóa nhấp lặp; điểm, số lựa chọn phù hợp và lịch sử cuối đúng; reset.
- Quiz: xáo trộn đúng dữ liệu, vị trí đáp án thay đổi; không cộng đôi; feedback đúng/sai riêng; tổng 4/4 hoặc 0/4 và replay.
- Điều hướng: các link chuyển từ sách/AI đến quan hệ, Grab, giải pháp, sinh viên, kết luận; theo dõi mục đang đọc ở phần lồng nhau; accordion mở/đóng và aria.
- Sách: bảy trạng thái, sáu lá, mười hai mặt đúng thứ tự; biên trước/sau; chế độ Đọc bản lớn đi đủ bìa đến bìa sau, đóng và giữ trạng thái. Framing toán học được kiểm tra ở Canvas đại diện cho màn hình 1920/1366/1024/390px.
- Production preview đã khởi động; **70/70 tài nguyên public HTTP 200**, không phải HTML fallback, HTML đúng MLN122. Kiểm tra HEAD không kiểm tra WebGL decode.
- 12 texture có kích thước 1536×2048. Đã xem contact sheet toàn bộ và hai mặt phóng lớn. 10 trang sắp chữ không vượt footer; hai bìa giữ nguyên.
- Năm GLB đạt kiểm tra cấu trúc header/version/độ dài/JSON. Đã so sánh nội dung file với bản trước chỉnh: cả 5 giữ nguyên. `Book.jsx` cũng giữ nguyên.
- Quét mã nguồn không còn chủ đề MLN111. Preview do trợ lý khởi động đã dừng sau kiểm tra.

Lần kiểm tra HTTP dev ở 5173 ban đầu nhận ECONNREFUSED vì không có server đang nghe. Sau đó đã khởi động production preview riêng ở 4173 và kiểm tra thành công; không coi lần thất bại là đạt.

## Chưa chạy được

Browser bị chặn do không xác minh được saved browser permissions cho localhost. Không dùng cách né kiểm tra quyền. Chưa có screenshot ứng dụng hoặc kiểm tra trực quan desktop/mobile, console, giọng đọc thật, WebGL/GPU, clipping mô hình và animation lật thực tế toàn cuốn.

Kiểm tra nguồn/renderer/toán học/texture không thay thế xác nhận trực quan trên máy trình chiếu. Đọc [báo cáo chỉnh sửa](REFINEMENT_REPORT_MLN122.md) để biết file thay đổi và phạm vi nguồn học thuật.

## Kiểm tra trước buổi thuyết trình

1. Chạy `npm run dev` và mở dòng Local. Thử 1366×768 và 1920×1080; thanh nav không che tiêu đề khi nhấn link.
2. Mở các thẻ, nhất là Nhà nước và xã hội, nhân tố và giải pháp; kiểm tra không cắt chữ hoặc đường viền xuyên nội dung.
3. Game: chơi đủ bốn tình huống; đáp án xáo trộn nên chọn theo nội dung, không theo A/B/C cố định. Thử bốn đáp án 50 cho 200, bốn 20 cho 80 và bốn 0 cho 0; nhấp lặp, replay và giọng đọc.
4. Quiz: thử đúng/sai và replay; theo dõi thanh tiến độ, điểm, lý giải.
5. Lật sách từ bìa qua năm cặp trang đến bìa sau; thử mũi tên, nhãn, Đọc bản lớn, 3D View và zoom. Xem mô hình trang trí có nằm trọn khung ở chế độ 3D không.
6. Kiểm tra console và network thực tế. Đối chiếu lý luận với bản giáo trình được cấp quyền của nhóm.

Các bước này là checklist chưa xác nhận thực hiện, không phải kết quả đã đạt.
