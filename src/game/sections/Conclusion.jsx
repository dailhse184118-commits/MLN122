import { references } from '../../content/mln201';

export default function Conclusion() {
  return <section id="conclusion"><div className="page-section">
    <div className="section-header reveal"><span className="section-label">08 — Kết luận & tài liệu</span><h2>Tạo giá trị. Phân phối hợp lý.</h2><div className="section-divider" /><p>Lợi ích kinh tế thúc đẩy hành động; quan hệ lợi ích giúp hiểu sự hợp tác và mâu thuẫn trong nền kinh tế.</p></div>
    <div className="feature-grid reveal">{['Tôn trọng lợi ích chính đáng của từng chủ thể.', 'Nhận diện cả thống nhất lẫn mâu thuẫn, dựa trên điều kiện thực tế.', 'Kết hợp lợi ích cá nhân, nhóm và xã hội để phát triển bền vững.'].map((t, i) => <div className="feature-card" key={t}><div className="fc-num">0{i + 1}</div><p>{t}</p></div>)}</div>
    <h3 className="mln-subheading reveal">Tài liệu tham khảo & phạm vi kiểm chứng</h3>
    <div className="ri-list reveal">{references.map((r, i) => <div className="ri-item" key={r.url}><div className="ri-num">0{i + 1}</div><div><a href={r.url} target="_blank" rel="noreferrer">{r.title} ↗</a><p>{r.note}</p></div></div>)}</div>
    <div className="def-box reveal" style={{ marginTop: '2rem' }}><h3>Trước khi thuyết trình</h3><p>Đối chiếu bản giáo trình nhóm đang dùng: định nghĩa, bản chất, vai trò, bốn yếu tố tác động và các quan hệ cơ bản. Không gán số trang cụ thể cho từng diễn giải khi chưa kiểm tra bản in. Kiểm tra thông báo mới nếu cần cập nhật vụ việc. Giải pháp, hệ quả dự kiến và WeDo là phân tích, minh họa của bài học.</p></div>
    <a className="mln-return" href="#hero">Về phần mở đầu ↑</a>
  </div></section>;
}
