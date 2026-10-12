# Cập nhật mã học phần MLN122

Ngày thực hiện: 12/10/2026. Theo yêu cầu của nhóm, mã học phần hiện tại được thống nhất thành MLN122 trong website, các trang sách, tên và đường dẫn nội dung, README và tài liệu thuyết trình.

Nội dung lý luận, tình huống Grab, phép tính giả định, câu hỏi, điểm số, thiết kế và cơ chế lật sách giữ nguyên. Module nội dung chuyển thành `src/content/mln122.js`; năm ảnh nền chuyển sang `public/images/mln122` và các tham chiếu đã cập nhật.

## Kết quả kiểm tra đã thực hiện

- `npm test`: 17/17 kiểm thử tự động đạt. Đây là kiểm thử logic và React renderer, không phải kiểm thử trực quan WebGL.
- `npm run build`: thành công; các cảnh báo Jotai và kích thước bundle sách có từ trước vẫn còn.
- `node scripts/verify-assets.mjs http://127.0.0.1:4180`: 75/75 tài nguyên public đúng HTTP 200 và không rơi vào HTML fallback; HTML sử dụng MLN122.
- Đối chiếu pixel của 12 texture với bản Git trước thay đổi: mọi pixel ngoài vùng ghi mã học phần giữ nguyên. Năm ảnh chụp nền giữ nguyên toàn bộ byte.
- Kịch bản Word và Markdown được đổi sang MLN122. Bản Word được xuất bằng Microsoft Word để kiểm tra bố cục; đã xem đủ 15 trang ảnh cuối cùng, không thấy cắt chữ hoặc chồng nội dung.

Các bằng chứng kiểm tra hiện tại nằm ở `qa/course-code-tests.txt`, `qa/course-code-build.txt`, `qa/course-code-http.txt`, `qa/course-code-texture-checks.json` và `qa/back-cover-course-label.json`. Báo cáo và bằng chứng của các đợt trước là lịch sử triển khai, không thay thế kết quả kiểm tra ở trên.

Các ZIP gốc và ZIP sao lưu ngoài repository là bản lưu lịch sử, không được sửa nội dung. Chưa kiểm tra hiển thị trình duyệt hoặc xác nhận trạng thái triển khai Vercel trong đợt đổi mã này.
