# Báo cáo chuyển đổi MLN122 — 12/10/2026

Đây là lịch sử đợt chuyển đổi đầu tiên. Bản hiện tại đã được chỉnh tiếp theo yêu cầu mới; xem [REFINEMENT_REPORT_MLN122.md](REFINEMENT_REPORT_MLN122.md) để biết nội dung, file và kiểm thử mới nhất.

## Phạm vi và nguồn đầu vào

Đã đọc yêu cầu trong `Pasted text.txt` do người dùng xác định là yêu cầu thực hiện. Các README trong ZIP là tư liệu mô tả bản nguồn, không thay thế yêu cầu đó. Hướng dẫn SDI được cung cấp trong chat không được dùng để chuyển website môn MLN122 thành dự án SDI.

Đã kiểm tra kiến trúc React/Vite, toàn bộ component JSX, luồng `App → GamePage / BookPage / AIUsagePage`, CSS liên quan bố cục, package/lockfile, danh sách tài nguyên và 12 texture. CSS dài của bản gốc được tìm kiếm và đọc theo phần liên quan, không khẳng định đọc từng dòng. Không phân tích từng mesh của các GLB.

Hai ZIP bổ sung (bản file thay đổi và bản nguồn đầy đủ) khớp theo SHA-256 đối với mọi file có trong nguồn đầy đủ tại thời điểm đối chiếu. Bản thay đổi đã được tích hợp; bản sao các file MLN111 bị thay nằm ở `D:\MLN122\MLN111-before-Slot8.zip`. ZIP gốc người dùng vẫn được giữ.

## Thay đổi chính

- Giữ React 18, Vite 4, Tailwind 3, Jotai, Three.js và cơ chế sách dùng skinned mesh; giữ màu sắc, nền, kiểu chữ, nhân vật, parallax, typewriter, chuyển cảnh, meter và phản hồi của game.
- Dùng nội dung MLN122 đã có trong ZIP làm nền. `TonTaiXaHoi.jsx` bổ sung giải thích/ví dụ, các quan hệ cơ bản, bốn nhóm chủ thể Grab, nguyên nhân, hệ quả dự kiến, giải pháp kèm bên được bảo vệ và đánh đổi, liên hệ sinh viên FPT/WeDo.
- `src/content/mln122.js` tập trung nội dung bổ sung, nguồn và bốn tình huống game. Mỗi tình huống có ba lựa chọn: 50 điểm phù hợp, 20 điểm cho góc nhìn chưa đầy đủ, 0 điểm cho phương án sai. Điểm tối đa 200 là điểm học tập, không phải thước đo rủi ro thực tế.
- `GearOfEra.jsx`: hiển thị điểm, khóa nhấp lặp, reset bằng state, dọn timer, giọng đọc tùy chọn, lựa chọn vẫn hiện nếu không có API giọng đọc; thêm nút bỏ qua đọc. Giữ ba lựa chọn và hiệu ứng của bản nguồn.
- `QuizGame.jsx`: thay toàn bộ câu hỏi cũ bằng cùng bốn tình huống; tích hợp phần ôn nhanh có thể mở/đóng, bên cạnh trải nghiệm kể chuyện.
- `Conclusion.jsx`: kết luận và nguồn ngay trên trang thuyết trình. `AIUsagePage.jsx` giữ bố cục bản bổ sung, khai báo đúng việc Codex hỗ trợ và giới hạn kiểm chứng; bỏ nguồn báo chí chưa được đọc đối chiếu.
- `Navbar.jsx`, `App.jsx`: bổ sung đường đến Grab/kết luận; chuyển từ sách/nguồn về đúng phần; ưu tiên hash; tải sách và phụ lục theo nhu cầu. Thanh điều hướng cuộn ngang trên màn hình nhỏ.
- `ExpandCard.jsx`: nút thật, trạng thái `aria-expanded`, liên kết nội dung bằng ID, không giới hạn chiều cao gây cắt phần giải thích.
- `book/UI.jsx`: nhãn đúng từng cặp mặt; nút trước/sau có tên và biên giới hạn; hỗ trợ phím mũi tên. 6 lá/12 mặt và thứ tự vật lý giữ nguyên.
- Giữ 11 texture PNG của bản bổ sung; tạo lại riêng `Coverpage_open.png` vì chữ trên bìa được cung cấp bị chồng. Bìa 1536×2048, kem–đỏ, chữ có dấu; script tái tạo ở `scripts/generate-book-cover.mjs`. Không dùng AI tạo ảnh cho chữ sách.
- Giữ GLB gốc. Bỏ preload tất cả model từ đầu, chỉ tải model trang đang xem; model không chặn sách khi tải. Đổi ánh sáng môi trường tải ngoài thành ambient light cục bộ kết hợp đèn sẵn có.
- Ảnh mở đầu kế thừa được lưu cục bộ; tải các font đang dùng vào `public/fonts`. Không còn cần Google Fonts/Pinterest để hiển thị khi chạy bản build. Nguồn gốc/giấy phép đầy đủ của ảnh, GLB kế thừa vẫn cần nhóm rà soát.
- Cập nhật dependency trong phạm vi phiên bản tương thích bằng `npm audit fix`; dùng npm/package-lock làm nguồn cài đặt, bỏ yarn.lock cũ. Thêm công cụ kiểm thử ở devDependencies; không thêm framework sản phẩm.
- Các file cũ không dùng `YThucXaHoi.jsx`, `BienChung.jsx`, `components/UI.jsx` trở thành export tương thích đến nội dung/trạng thái hiện tại; bỏ nội dung môn cũ và state sách trùng.

## Đáp ứng bốn yêu cầu

| Yêu cầu | Vị trí và nội dung |
|---|---|
| 1. Lý luận | `#ton-tai`, `#quan-he`: khái niệm/bản chất/vai trò; thống nhất–mâu thuẫn; lực lượng sản xuất, địa vị, phân phối, hội nhập; lợi ích cá nhân–nhóm–xã hội và quan hệ lao động/doanh nghiệp. Các thẻ mở rộng có ví dụ. |
| 2. Tình huống Việt Nam | `#tinh-huong`: Grab, tài xế, khách hàng, Nhà nước/xã hội; phân phối, hợp tác, mâu thuẫn, nguyên nhân và hệ quả có điều kiện; dẫn thông báo gốc và phân biệt thông tin công bố với phân tích. |
| 3. Giải pháp | `#giai-phap`: minh bạch, đối soát/công bằng cho tài xế, khách hàng, giám sát, đối thoại, cạnh tranh và phát triển bền vững. Mỗi phương án nêu cách làm, lợi ích được bảo vệ, đánh đổi; có tiêu chí đánh giá. |
| 4. Liên hệ sinh viên | `#sinh-vien`: chọn việc, làm cho doanh nghiệp, khởi nghiệp WeDo, dự án cộng đồng; ví dụ FPT và câu hỏi tự kiểm tra. WeDo được ghi là minh họa, không phải bằng chứng hiệu quả kinh doanh. |

Tám phần logic: mở đầu `#hero` → lý luận `#ton-tai` → quan hệ `#quan-he` → Grab `#tinh-huong` → giải pháp `#giai-phap` → sinh viên `#sinh-vien` → hoạt động `#quiz` → kết luận `#conclusion`. Không tạo tám trang riêng.

## Ánh xạ sách

| Trạng thái sách | Mặt trái / mặt phải |
|---|---|
| 0 | Bìa trước `Coverpage_open` |
| 1 | `Open 1` — khái niệm/bản chất / `Open 2` — biểu hiện/vai trò |
| 2 | `46_Page_1` — các quan hệ / `46_Page_2` — yếu tố tác động |
| 3 | `47_Page_1` — thống nhất / `47_Page_2` — mâu thuẫn |
| 4 | `48_Page_1` — Grab / `48_Page_2` — giải pháp |
| 5 | `Close 1` — sinh viên / `Close 2` — tổng kết |
| 6 | Bìa sau `Coverpage_close` |

Sách rút gọn nội dung để dễ đọc; phần phân tích sâu và phạm vi nguồn nằm trên trang và phụ lục. GLB chỉ là trang trí kế thừa, không phải bằng chứng học thuật hoặc mô hình minh họa chính xác nền tảng Grab.

## Kiểm chứng học thuật

Đã đọc [thông báo gốc UBCTQG ngày 11/09/2026](https://vcc.gov.vn/default.aspx?category_id=e0904ba0-4694-4595-9f66-dc2df621842a&do=detail&id=f73009a6-f838-4d43-9535-911c7e85ea9e&page=news). Thông báo ghi việc rà soát/xác minh phản ánh và yêu cầu cung cấp thông tin ngày 08/09, chưa đưa ra kết luận vi phạm. Website mô tả trạng thái tại thông báo, không khẳng định đã kiểm tra mọi diễn biến sau đó.

[Trang nhà xuất bản](https://www.nxbctqg.org.vn/giao-trinh-kinh-te-chinh-tri-mac-lenin-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-.html) xác nhận ấn bản hệ không chuyên 2021. Không có toàn văn giáo trình trong ba ZIP; PDF thư viện tìm thấy chỉ là phần giới thiệu 8 trang. Chưa đối chiếu nội dung bản in trang 196–214. Phạm vi này lấy từ đề bài, không gán số trang cụ thể cho từng diễn giải.

Cần nhóm/giảng viên đối chiếu trước thuyết trình: định nghĩa và bản chất lợi ích kinh tế; hai vai trò; bốn yếu tố tác động; thứ tự và cách gọi các quan hệ cơ bản; số mục/trang theo bản giáo trình dùng tại lớp. Không có trích dẫn nguyên văn được tự tạo. Không đưa tỷ lệ phí, số tiền thu nhập, thị phần hoặc phân loại pháp lý tài xế chưa kiểm chứng. Các nguyên nhân/hệ quả và giải pháp là phân tích có điều kiện, không phải kết luận điều tra hoặc kết quả thực nghiệm.

## Kiểm thử và giới hạn

Chi tiết tại [TESTING_REPORT_MLN122.md](TESTING_REPORT_MLN122.md). Build và kiểm thử logic thành công. Chưa thể xác nhận website sẵn sàng trình chiếu hoàn toàn vì chưa thực hiện kiểm thử trực quan trình duyệt và đối chiếu toàn văn giáo trình.
