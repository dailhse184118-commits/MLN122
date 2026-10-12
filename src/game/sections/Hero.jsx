import { visualAssets } from '../../content/visualAssets';

export default function Hero() {
  return (
    <section className="hero-v2" id="hero">
      <div className="hero-v2-bg" />
      <div className="hero-v2-overlay" />
      <div className="hero-v2-portrait-wrap">
        <img src={visualAssets.hero} alt="Ảnh AI minh họa skyline Thành phố Hồ Chí Minh bên sông Sài Gòn lúc hoàng hôn" width="1600" height="900" fetchpriority="high" className="hero-v2-portrait" />
        <div className="hero-v2-portrait-fade" />
        <span className="hero-image-credit">Minh họa bằng AI · Kinh tế Việt Nam</span>
      </div>
      <div className="hero-v2-content">
        <div className="hero-v2-badge"><span className="badge-dot">●</span> MLN122 · SLOT 8</div>
        <h1 className="hero-v2-title">
          <span className="hero-v2-title-lg">LỢI ÍCH<br />KINH TẾ</span>
        </h1>
        <p className="hero-v2-subtitle">Lợi ích kinh tế và quan hệ lợi ích kinh tế trong nền kinh tế thị trường định hướng xã hội chủ nghĩa</p>
        <p className="hero-v2-desc">Kinh tế chính trị Mác – Lênin · Chương 5 · Mục 5.3.1.<br />Vì sao các chủ thể vừa cần nhau, vừa có thể xung đột? Cùng phân tích qua Grab Việt Nam và những lựa chọn của sinh viên.</p>
        <div className="hero-v2-actions">
          <a href="#quiz" className="hero-v2-btn primary group"><span>Trò Chơi Tương Tác</span><div className="btn-icon-wrapper"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></div></a>
          <a href="#ton-tai" className="hero-v2-btn secondary group"><span>Khám Phá Lý Thuyết</span></a>
        </div>
        <div className="hero-v2-pills block mt-8">
          <a href="#quan-he" className="hero-v2-pill">Quan Hệ Lợi Ích</a>
          <a href="#tinh-huong" className="hero-v2-pill">Case Study: Grab</a>
          <a href="#giai-phap" className="hero-v2-pill">Hài Hòa Lợi Ích</a>
        </div>
      </div>
    </section>
  );
}
