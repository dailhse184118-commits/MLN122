# MLN201 — Website thuyết trình Slot 8

Website React/Vite về **lợi ích kinh tế và quan hệ lợi ích kinh tế**, Chương 5, mục 5.3.1. Có lý luận, tình huống Grab Việt Nam, giải pháp, liên hệ sinh viên, quiz/game và sách 3D sáu lá/mười hai mặt.

## Chạy cục bộ

```bash
npm ci
npm run dev
```

Kiểm tra và build:

```bash
npm test
npm run build
```

## Deploy trên Vercel

1. Trong Vercel, chọn **Add New → Project**, import repository `dailhse184118-commits/MLN122`.
2. Framework: **Vite**. Root Directory: **./** (gốc repository).
3. Build Command: **npm run build**. Output Directory: **dist**. Install Command: **npm ci**.
4. Website hiện không yêu cầu biến môi trường. Chọn **Deploy**.

`vercel.json` đã khai báo các cấu hình trên và rewrite cho đường dẫn SPA, ví dụ `/book` hoặc `/ai`. Tài nguyên ảnh, font, texture và model nằm trong `public` và được Vite sao chép vào `dist`. Không cần upload thư mục `dist` hay `node_modules` lên GitHub.

Tài liệu chính thức: [Vite trên Vercel](https://vercel.com/docs/frameworks/frontend/vite).

## Tài liệu và giới hạn kiểm chứng

- [Hướng dẫn sử dụng](README_MLN201.md)
- [Báo cáo nội dung và tương tác](REFINEMENT_REPORT_MLN201.md)
- [Báo cáo bộ ảnh mới](VISUAL_ASSETS_REPORT_MLN201.md)

Các ảnh mới là ảnh AI minh họa, không phải ảnh tư liệu của Grab/FPT. Sách là tóm tắt học tập do sinh viên biên soạn. Phép tính trong bài là giả định; thông báo rà soát không phải kết luận vi phạm. Xem phần Nguồn & AI trong website.

Build và 17 kiểm thử renderer đã đạt ở máy phát triển; các kiểm tra này không thay thế xác nhận trực quan WebGL trên máy trình chiếu. Chưa xác nhận deploy Vercel cho đến khi nền tảng trả deployment thành công.

Model gốc không dùng `assets/nhamay.glb` được giữ cục bộ và loại khỏi Git; các model 3D được website dùng trong `public/models` vẫn được đưa lên repo.
