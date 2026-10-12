# MLN122 Slot 8 — Báo cáo chỉnh sửa 12/10/2026

Đợt thay ảnh mới đã hoàn tất sau báo cáo này. Xem [VISUAL_ASSETS_REPORT_MLN122.md](VISUAL_ASSETS_REPORT_MLN122.md): 17/17 tests, 75/75 HTTP assets và thay đổi material sách. Số liệu bên dưới là kết quả của đợt chỉnh nội dung trước đó.

Đã sửa trực tiếp bản hiện tại tại `D:\MLN122\Website-MLN111-main`. Giữ hệ màu, font, khung nội dung, game kể chuyện, các asset nhân vật, mô hình sách, cơ chế lật và các GLB trang trí. Không thay framework hoặc thiết kế lại website.

## Nội dung và cách trình bày

- Thẻ Bản chất nhấn mục đích và động cơ đằng sau quan hệ giữa chủ thể; trình bày riêng hai vai trò: động lực trực tiếp và cơ sở vật chất cho những lợi ích khác.
- Phân biệt lợi ích với quan hệ lợi ích. Dùng tên đầy đủ của bốn nhân tố; giữ bốn quan hệ cơ bản, thống nhất/mâu thuẫn, cá nhân/nhóm/xã hội.
- Bỏ các đoạn lặp trong phần nhân tố, chủ thể Grab và danh sách giải pháp. Phần quan trọng giữ ở tiêu đề/tóm tắt, ví dụ và đánh đổi nằm trong ExpandCard. Vẫn đủ lý luận, Grab, giải pháp và liên hệ sinh viên FPT.
- Grab: ba lớp thông tin riêng gồm sự kiện công bố, phản ánh tài xế cần xác minh, diễn giải của nhóm. Không coi rà soát là kết luận vi phạm hoặc mặc nhiên coi đối tác là người lao động có hợp đồng.
- Phép tính **GIẢ ĐỊNH / HYPOTHETICAL**: 100.000đ khách trả − 20.000đ phí = 80.000đ tài xế nhận trước chi phí; trừ 35.000đ vận hành còn 45.000đ theo mô hình. Ghi rõ khoản phí là doanh thu phí minh họa, chưa phải lợi nhuận công ty; các khoản bỏ qua được giải thích trong thẻ mở rộng.
- Trang chủ dùng tiêu đề “LỢI ÍCH KINH TẾ”, toàn bộ chủ đề nằm ở phụ đề. Ảnh mới tạo bằng AI theo quy tắc người dùng: phong cách chụp thật, 50mm/F1.8, ánh sáng ban ngày khoảng 5500K, màu dịu và bóng mềm; không phải ảnh tư liệu.

## Game và quiz

- Hai nhân vật nằm trong các cột riêng. Khung câu hỏi/đáp án có nền đủ đậm và tăng chiều cao theo nội dung, không dùng vùng cuộn bị giới hạn 75% như trước. Màn hình hẹp đưa nhân vật lên trên khung chữ.
- Thay bối cảnh quán bar/ký túc xá bằng trao đổi tại cửa hàng và phòng làm việc của nhóm sinh viên; văn phòng cũ vẫn dùng cho trao đổi giá/phí và minh bạch.
- Bốn tình huống có phương án phù hợp, đúng một phần và nhầm khái niệm, mỗi phương án có lý giải riêng. Giữ **50/20/0 điểm**, tối đa 200, giọng đọc, chuyển cảnh và chơi lại. Xáo trộn vị trí đáp án ở mỗi lượt chơi.
- Khóa bằng ref trước khi cộng điểm, đồng thời vô hiệu hóa nút khi đã chọn. Kết quả cuối hiển thị đúng từng lựa chọn và số điểm tương ứng.
- Quiz ôn nhanh gồm bốn câu về phân biệt khái niệm, hai vai trò, nhân tố phân phối thu nhập và đọc phép tính giả định. Giữ giao diện, thanh tiến độ và điểm 0–4. Phản hồi phụ thuộc phương án chọn.

## Sách 3D

- `src/book/Book.jsx` không đổi so với backup trước đợt chỉnh: hình học, skeleton, texture mapping và animation lật gốc được giữ.
- Giữ nguyên hai bìa và năm GLB trang trí, đã so sánh nội dung file/hash với nguồn trước chỉnh. Chỉnh camera theo tỷ lệ Canvas, đặt mô hình trang trí sang bên phải. Chế độ đọc mặc định có góc nhìn gần thẳng, giảm rung/float và hạt trang trí để dễ đọc; chế độ 3D vẫn giữ các hiệu ứng.
- Sắp chữ lại mười mặt bên trong ở cùng kích thước **1536×2048** và bảng màu kem/đỏ trầm. Chữ nội dung 64px; trang bốn nhân tố 51px. Bộ sinh texture kiểm tra phần nội dung không vượt footer. Không sao chép nguyên trang giáo trình.
- Thêm ghi chú sách là tóm tắt học tập do sinh viên biên soạn. Nút **Đọc bản lớn** mở chính những texture của cặp trang hiện tại; trước/sau dùng chung page atom, quay lại sách không mất trang.
- Thứ tự bìa → khái niệm/vai trò → quan hệ/nhân tố → thống nhất/mâu thuẫn → Grab/giải pháp → sinh viên/tổng kết → bìa sau.

## Nguồn và giới hạn học thuật

Trang nhà xuất bản xác nhận [ấn bản 2021](https://www.nxbctqg.org.vn/giao-trinh-kinh-te-chinh-tri-mac-lenin-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-.html). Đã đọc phần liên quan trong [bản toàn văn đăng lại trên PDFCoffee](https://pdfcoffee.com/giao-trinh-ktct-2021-pdf-free.html) và đối chiếu bổ sung phần III của [bài giảng Chương 5, Bộ môn Kinh tế chính trị 2 — Đại học Thương mại](https://tmu-moodle.tmu.edu.vn/moodledata/filedir/a0/de/a0de9337223bf59c9bc2cce5ec1fcacc9dcbf0df.pdf). PDFCoffee là bản người dùng đăng lại, có OCR sai dấu; chưa kiểm tra bản in của nhóm. Không gán số trang riêng cho diễn giải.

Nguồn Grab là [thông báo UBCTQG ngày 11/09/2026](https://vcc.gov.vn/default.aspx?category_id=e0904ba0-4694-4595-9f66-dc2df621842a&do=detail&id=f73009a6-f838-4d43-9535-911c7e85ea9e&page=news). Mô tả theo mốc tư liệu, không xác nhận diễn biến mới nhất. Phép tính, game, giải pháp và WeDo là minh họa/phân tích.

## Kiểm tra thực tế

- `npm run build`: **đạt**, Vite 4.5.14, 647 modules. Main JS 204,27KB; book JS 942,19KB (trước gzip). Còn cảnh báo book chunk lớn và directive Jotai `use client` bị bỏ qua.
- `npm test`: **16/16 đạt**, Node test runner + React Test Renderer. Có mock clock/speech/window, không phải trình duyệt thật. Log: `qa/tests-refinement.txt`.
- Kiểm tra đúng/sai/một phần đạt 200/0/80; chọn hỗn hợp đạt 120 và lịch sử bốn lựa chọn chính xác. Nhấp lặp không cộng điểm đôi; quiz xáo trộn, giải thích và reset đạt.
- Kiểm tra điều hướng chuyển tab, link quan hệ/giải pháp/sinh viên, cập nhật mục đang đọc theo vị trí các phần lồng nhau và trạng thái accordion đạt.
- Kiểm tra bảy trạng thái sách, mười hai đường dẫn texture, biên trước/sau và chế độ đọc bản lớn từ bìa đến trang cuối đạt ở mức renderer. Kiểm tra toán học framing ở các kích thước Canvas đại diện cho 1920/1366/1024/390px đạt; không thay thế quan sát WebGL.
- Production preview đã khởi động. `node scripts/verify-assets.mjs http://127.0.0.1:4173`: **70/70 tài nguyên public trả HTTP 200**, không phải HTML fallback; HTML là MLN122. HEAD kiểm tra đường dẫn/MIME, không kiểm tra giải mã GPU.
- Năm GLB đạt kiểm tra header/version/độ dài/JSON glTF và giữ nguyên nội dung file. Không kiểm tra tải và vẽ WebGL thực tế.
- Đã xem contact sheet đủ 12 mặt và phóng lớn hai mặt khái niệm/nhân tố. `qa/book-contact-sheet-refined.png` là ảnh QA của texture, không phải screenshot ứng dụng. Bộ sắp chữ có cảnh báo Pango khi khởi tạo font trên Windows nhưng xuất file thành công; hai trang kiểm tra trực tiếp hiển thị dấu và chữ đúng.
- Quét `src` và `index.html` không thấy chủ đề cũ MLN111/Tồn tại xã hội/Ý thức xã hội.
- Preview do trợ lý khởi động đã được dừng sau kiểm tra để không khóa esbuild khi cài lại thư viện.

## Chưa kiểm tra được

Browser từ chối truy cập localhost với thông báo **saved browser permissions could not be verified / browser security check unavailable**. Không dùng cách né kiểm tra quyền. Vì vậy chưa xác nhận bằng trình duyệt: không chồng chữ ở từng độ phân giải, console/runtime, giọng đọc thật, tải GPU, mô hình không bị cắt và animation lật cả cuốn thực tế. Các sửa bố cục/camera được kiểm tra qua mã, renderer, toán học framing và texture.

Trước giờ thuyết trình, cần mở website trên máy trình chiếu: thử 1366×768 và 1920×1080, mở các accordion, chơi đủ bốn tình huống, bật/tắt giọng đọc; lật bảy trạng thái sách, thử Đọc bản lớn và 3D View. Nhóm cần đối chiếu bản giáo trình được cấp quyền đang sử dụng.

## File thay đổi

Danh sách 32 file triển khai nằm ở `qa/refinement-changed-files.json`. Nhóm chính:

- `src/content/mln122.js`, `src/content/quiz.js`; `TonTaiXaHoi.jsx`, `Hero.jsx`, `Navbar.jsx`, `QuizGame.jsx`, `GearOfEra.jsx`, `GamePage.jsx`.
- `src/components/ExpandCard.jsx`, `FareExample.jsx`; `src/index.css`; `src/ai-usage/AIUsagePage.jsx`.
- `src/book/BookPage.jsx`, `Experience.jsx`, `ModelShowcase.jsx`, `UI.jsx`; mới `PageReader.jsx`, `framing.js`.
- Mười texture bên trong; hai ảnh mới; `scripts/generate-book-pages.mjs`; `tests/interactions.test.jsx`.

Backup trước chỉnh: bản ZIP trong D:\MLN122, mốc 20261012-134946. Các báo cáo và bằng chứng QA được cập nhật riêng.
