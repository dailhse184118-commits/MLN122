# MLN201 — Thay ảnh theo tham chiếu, 12/10/2026

Đã sửa trực tiếp website hiện tại, dùng ba infographic người dùng cung cấp làm tham chiếu hình ảnh. Không đưa chữ, nút, logo, giá cước hoặc nội dung học thuật trong infographic vào website. Tạo năm ảnh riêng bằng built-in image_gen; không sử dụng infographic như một nền ghép nhiều hình.

## Năm asset cục bộ

Tất cả là JPEG progressive **1600×900, tỷ lệ 16:9**. File gốc được giữ tại thư mục generated_images của Codex; bản tối ưu nằm trong dự án.

| Vị trí | File trong public/images/mln201 | Dung lượng |
|---|---|---:|
| Hero — skyline TP.HCM hoàng hôn | hero-hcmc-sunset.jpg | 225.412 byte |
| Game 1 — tài xế và nền tảng | game-1-driver.jpg | 229.145 byte |
| Game 2 — doanh nghiệp nền tảng | game-2-platform-office.jpg | 180.503 byte |
| Game 3 — khách hàng | game-3-customer.jpg | 170.261 byte |
| Game 4 — khởi nghiệp sinh viên | game-4-student-startup.jpg | 168.648 byte |

Tổng dung lượng **973.969 byte**, giảm khoảng **90–91%** so với PNG tạo ban đầu. Đã giải mã lại cả năm JPEG để kiểm tra kích thước và xem contact sheet của các bản tối ưu. `qa/visual-assets-manifest.json` lưu kích thước, đường dẫn và dung lượng thực tế.

Hero theo yêu cầu mới: skyline hoàng hôn, vùng trái tối trầm và thoáng, vùng phải có ánh vàng. Đây là ngoại lệ hoàng hôn so với quy tắc ảnh ban ngày trước đó. Bốn ảnh game dùng phong cách 50mm/F1.8, ánh sáng tự nhiên khoảng 5500K, màu dịu và bóng mềm. Các thông số là mô tả phong cách tạo ảnh AI, không phải thông số máy ảnh đo được. Ảnh không phải tư liệu thực tế của Grab/FPT và không chứa logo hoặc giao diện được ghép vào.

Prompt và chế độ tạo: `qa/VISUAL_IMAGE_PROMPTS_MLN201.md`. Contact sheet `qa/replacement-assets-contact-sheet.jpg` chỉ là bản xem trước asset, **không phải screenshot website**. Năm file dùng trên website vẫn riêng biệt.

## Tích hợp vào template hiện tại

- `Hero.jsx` dùng skyline mới. Giữ headline, phụ đề, nút, pills và các lớp chuyển sắc. Khung ảnh phủ phần hero, crop bằng object-fit: cover; bỏ nền tranh cũ đang hiển thị. Nội dung HTML vẫn nằm trên các lớp ảnh.
- `src/content/visualAssets.js` gom năm đường dẫn cục bộ. Không dùng URL ảnh bên ngoài.
- `mln201.js` gắn đúng ảnh cho bốn tình huống. Chuyển tình huống minh bạch/doanh nghiệp sang số 2, tình huống khách trả thêm sang số 3 để khớp thứ tự người dùng yêu cầu. Giữ các lựa chọn, phản hồi và mức 50/20/0 điểm; đổi phần giới thiệu tình huống 2 sang cuộc thảo luận vận hành trong doanh nghiệp.
- `GearOfEra.jsx` giữ typewriter, giọng đọc, parallax, chuyển cảnh, replay và khóa cộng điểm. Ảnh có vị trí crop theo cảnh, tăng độ hiện của ảnh ở bước giới thiệu; khi trả lời có blur nhẹ. Khung chữ riêng giữ nền đen 94%, ảnh ở lớp dưới và không nhận pointer event. Nhân vật vẫn trong hai cột riêng.
- `AIUsagePage.jsx` cập nhật khai báo đúng năm ảnh AI và phạm vi dùng.

## Sách 3D

- Không thay bất kỳ texture nội dung nào: đã đối chiếu hash cả **12 texture** với gói nguồn đã chỉnh trước đợt này, tất cả giữ nguyên.
- Trong `Book.jsx` chỉ đổi hai material mặt trang: roughness 0,1 → 0,88 và metalness 0. Giấy lì hơn giúp giảm phản sáng. Đã so sánh source sau khi chuẩn hóa hai thay đổi material: phần geometry, skeleton và animation lật khớp bản trước.
- Giữ màu kem/đỏ trầm, các mô hình trang trí, cơ chế lật, Đọc bản lớn và ghi chú sách tóm tắt của sinh viên.
- Tăng vùng Canvas nhẹ bằng cách giảm khoảng chừa trên/dưới, giảm khoảng fit của chế độ đọc; giữ margin để không đè các điều khiển. Khung reading dùng span 2,8×2,2 cho cặp trang mở. Tính khoảng camera theo tỷ lệ Canvas.

## Kiểm tra đã thực hiện

- `npm run build`: **đạt**, Vite 4.5.14, 648 modules. Main JS 204,60KB; book JS 942,22KB. Còn cảnh báo chunk sách lớn và directive Jotai use client bị bỏ qua. Log `qa/build-visual-assets.txt`.
- `npm test`: **17/17 đạt**, Node test runner + React Test Renderer. Log `qa/tests-visual-assets.txt`. Có mock clock/window/speech, không phải trình duyệt thật.
- Kiểm tra asset mới gắn đúng hero và bốn tình huống; đường dẫn riêng, tồn tại trong public. Game vẫn đạt 200/0/80; chọn hỗn hợp đạt 120, không cộng điểm đôi, lịch sử/reset đúng. Quiz, accordion, navigation và reader vẫn đạt.
- Kiểm tra toán học framing ở Canvas đại diện cho màn hình 1920×1080, 1366×768, 1024×768 và 390px; bảy trạng thái sách/12 mặt/biên trước-sau đúng ở mức renderer.
- Dev và production preview đã khởi động; **75/75 asset public HTTP 200** và không phải HTML fallback. HEAD kiểm tra đường dẫn/MIME, không xác nhận GPU. Log preview `qa/http-visual-assets.txt`.
- Đã giải mã cả năm JPEG tối ưu và xem contact sheet; đã đối chiếu đủ 12 texture. `qa/book-visual-preservation.json` lưu bằng chứng bảo toàn.
- Các server do trợ lý khởi động đã được dừng sau kiểm tra để không khóa esbuild khi npm ci.

## Giới hạn kiểm tra desktop

Đã thử khôi phục kết nối browser cũ không còn khả dụng và kết nối in-app browser hiện tại theo quy trình được hỗ trợ. Navigation localhost vẫn bị từ chối với **saved browser permissions could not be verified / browser security check unavailable**. Không dùng browser khác hoặc cách chụp gián tiếp để né kiểm tra quyền.

Vì vậy **chưa xác nhận trực quan bố cục desktop**, clipping từng cảnh, console runtime hay material/GPU và lật sách thực tế. Kết quả renderer, source và framing toán học không thay thế kiểm tra trên máy trình chiếu. Không có screenshot website mới để tuyên bố đã kiểm tra thành công.

Khi chạy `npm run dev`, cần xem hero và từng tình huống ở 1366×768/1920×1080, kiểm tra toàn bộ câu hỏi/đáp án và lật sách. Các thay đổi bố cục giữ nguyên nguyên tắc vùng chữ nằm trong flow riêng, không bị ảnh nền đè lên.

## File thay đổi

17 file triển khai được liệt kê ở `qa/visual-changed-files.json`: năm JPEG; `visualAssets.js`; `Hero.jsx`, `GearOfEra.jsx`, `mln201.js`, `AIUsagePage.jsx`, `index.css`; `Book.jsx`, `BookPage.jsx`, `Experience.jsx`, `framing.js`; `optimize-visual-assets.mjs`; và `tests/interactions.test.jsx`. Các báo cáo và bằng chứng QA cập nhật riêng.

Backup source trước đợt thay ảnh: `D:\MLN122\MLN201-before-visual-assets-20261012-150252.zip`. Asset cũ được giữ tại chỗ, website không còn tham chiếu chúng ở năm vị trí này.
