import ExpandCard from '../../components/ExpandCard';
import FareExample from '../../components/FareExample';
import { concepts, factors, relationships, stakeholders, solutions, reflections, references } from '../../content/mln201';

export default function QuanHeLoiIch() {
  return (
    <section id="ton-tai">
      <div className="page-section">
        <div className="section-header reveal">
          <span className="section-label">02 — Cơ sở lý luận · Mục 5.3.1</span>
          <h2>Lợi Ích Kinh Tế</h2>
          <div className="section-divider" />
          <p><strong>Lợi ích kinh tế</strong> là lợi ích vật chất mà con người thu được khi tham gia hoạt động kinh tế. Đây là động lực trực tiếp thúc đẩy các chủ thể sản xuất, lao động, đầu tư và kinh doanh.</p>
        </div>
        <div className="feature-grid reveal delay-1">
          <div className="feature-card">
            <div className="fc-num">01</div><h4>Bản Chất</h4>
            <p>Lợi ích kinh tế thể hiện <strong>mục đích và động cơ</strong> khiến các chủ thể xác lập quan hệ với nhau trong nền sản xuất xã hội: mỗi bên hướng đến lợi ích gì?</p>
          </div>
          <div className="feature-card">
            <div className="fc-num">02</div><h4>Vai Trò: Động Lực Trực Tiếp</h4>
            <p>Kỳ vọng cải thiện đời sống và thu nhập thúc đẩy chủ thể <strong>lao động, kinh doanh, đầu tư và đổi mới</strong>.</p>
          </div>
          <div className="feature-card">
            <div className="fc-num">03</div><h4>Vai Trò: Cơ Sở Vật Chất</h4>
            <p>Thực hiện lợi ích kinh tế tạo điều kiện vật chất cho sự hình thành và phát triển <strong>lợi ích chính trị, xã hội, văn hóa</strong> và các lợi ích khác.</p>
          </div>
        </div>

        <div className="card-grid card-grid-2 reveal mln-detail-grid">{concepts.map(c => <ExpandCard key={c.title} title={`${c.title} — giải thích và ví dụ`}><p>{c.text}</p><p><strong>Ví dụ:</strong> {c.example}</p></ExpandCard>)}</div>
        <p className="mln-source-note">Nội dung diễn giải theo Chương 5, phần lợi ích kinh tế và quan hệ lợi ích kinh tế. <a href="#conclusion">Nguồn đối chiếu và phạm vi kiểm chứng ↗</a></p>
        <div className="phan-separator reveal" style={{ margin: '5rem 0' }} />
        <div className="section-header reveal" id="quan-he">
          <span className="section-label">03 — Quan hệ lợi ích kinh tế</span>
          <h2>Quan Hệ Lợi Ích Kinh Tế</h2>
          <div className="section-divider" />
          <p>Những tương tác giữa cá nhân, tổ chức, cộng đồng và quốc gia nhằm xác lập lợi ích kinh tế, gắn với điều kiện sản xuất và thể chế xã hội cụ thể.</p>
        </div>
        <div className="def-box reveal mln-comparison">
          <div><h3>Lợi ích: đạt được gì?</h3><p>Thu nhập của người lao động và lợi nhuận của doanh nghiệp là những biểu hiện cụ thể.</p></div>
          <div><h3>Quan hệ lợi ích: tương tác thế nào?</h3><p>Hợp tác, thương lượng và phân phối giữa các bên để thực hiện lợi ích ấy.</p></div>
        </div>
        <h3 className="mln-subheading reveal">Bốn nhân tố ảnh hưởng</h3>
        <div className="card-grid card-grid-2 reveal mln-detail-grid">{factors.map(([t, d], i) => <ExpandCard title={`${i + 1}. ${t}`} key={t}><p>{d}</p></ExpandCard>)}</div>
        <h3 className="mln-subheading reveal">Bốn quan hệ lợi ích cơ bản</h3>
        <p className="mln-source-note">Với tài xế nền tảng, cần xét hình thức hợp tác thực tế; không mặc nhiên đồng nhất với quan hệ lao động có hợp đồng.</p>
        <div className="card-grid card-grid-2 reveal mln-detail-grid">{relationships.map(([t, d]) => <ExpandCard title={t} key={t}><p>{d}</p></ExpandCard>)}</div>
        <ExpandCard title="Lợi ích cá nhân và lợi ích xã hội"><p>Lợi ích cá nhân chính đáng là động lực lao động và sáng tạo. Lợi ích xã hội tạo môi trường để cá nhân phát triển. Tuy nhiên, lợi ích trước mắt có thể gây thiệt hại cho cộng đồng nếu một chủ thể chuyển chi phí sang người khác, chẳng hạn gây ô nhiễm để giảm chi phí sản xuất. Cần kết hợp hiệu quả kinh tế với tiến bộ và công bằng xã hội.</p></ExpandCard>
        <div className="phan-separator reveal" style={{ margin: '5rem 0' }} />
        <div className="section-header reveal">
          <span className="section-label">Hai Mặt Của Một Quan Hệ</span>
          <h2>Thống Nhất &amp; Mâu Thuẫn</h2>
          <div className="section-divider" />
        </div>
        <div className="dialectic-wrapper reveal delay-1">
          <div className="dialectic-side left">
            <h4 style={{ color: 'var(--gold-pale)' }}>Sự thống nhất</h4>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>CÙNG TẠO RA GIÁ TRỊ</p>
          </div>
          <div className="dialectic-mid">Quan hệ lợi ích</div>
          <div className="dialectic-side" style={{ background: 'var(--card-bg)' }}>
            <h4 style={{ color: 'var(--brown-dark)' }}>Sự mâu thuẫn</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>KHÁC BIỆT PHÂN CHIA GIÁ TRỊ</p>
          </div>
        </div>
        <div className="card-grid card-grid-2 reveal mln-detail-grid">
          <ExpandCard title="Thống nhất: cùng tạo ra giá trị" summary="Các bên cần nhau; lợi ích của bên này có thể tạo điều kiện cho bên khác."><p>Nền tảng cần tài xế và khách hàng; tài xế cần cơ hội nhận chuyến; khách cần đi lại thuận tiện. Ghép chuyến hiệu quả có thể giảm xe chạy rỗng và tạo thêm giá trị cho nhiều bên.</p></ExpandCard>
          <ExpandCard title="Mâu thuẫn: cách đạt lợi ích có thể đối lập" summary="Một bên hưởng thêm có thể làm bên khác bị thiệt hoặc cản trở lợi ích của họ."><p>Giữ nguyên giá chuyến và chi phí khác, tăng phần khấu trừ làm phần tài xế nhận giảm. Khi năng suất hoặc lượng chuyến thay đổi, cần tính lại tổng lợi ích; không mặc định mọi thay đổi đều là bên được, bên mất.</p></ExpandCard>
        </div>
        <div className="phan-separator reveal" style={{ margin: '5rem 0' }} />
        <div className="section-header reveal" id="tinh-huong">
          <span className="section-label">04 — Tình huống Việt Nam · Grab</span>
          <h2>Grab &amp; Đối Tác Tài Xế</h2>
          <div className="section-divider" />
          <p>Ứng dụng kết nối khách hàng với tài xế. Giá chuyến, phí kết nối và chi phí vận hành liên kết lợi ích của nhiều chủ thể.</p>
        </div>
        <div className="def-box reveal delay-1" style={{ marginTop: '2rem' }}>
          <h3>Đọc vụ việc theo ba lớp thông tin</h3>
          <p><strong>Sự kiện chính thức:</strong> Thông báo ngày 11/09/2026 của Ủy ban Cạnh tranh Quốc gia nêu việc yêu cầu tài liệu và rà soát, xác minh vấn đề giá, phí của Grab.</p>
          <p><strong>Phản ánh của một số tài xế:</strong> Vấn đề giá cước, phí, chiết khấu và các khoản khấu trừ được nêu trong thông báo là phản ánh cần được xác minh.</p>
          <p><strong>Phân tích của nhóm:</strong> Có khả năng tồn tại căng thẳng giữa mục tiêu hiệu quả của nền tảng và thu nhập ròng của tài xế. Đây là một cách vận dụng lý luận, <strong>không phải kết luận Grab vi phạm pháp luật</strong>.</p>
          <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>Nguồn chính thức: <a href="https://vcc.gov.vn/default.aspx?category_id=e0904ba0-4694-4595-9f66-dc2df621842a&do=detail&id=f73009a6-f838-4d43-9535-911c7e85ea9e&page=news" target="_blank" rel="noreferrer">Ủy ban Cạnh tranh Quốc gia, 11/09/2026 ↗</a></p>
        </div>

        <div className="card-grid card-grid-2 stakeholder-grid reveal mln-detail-grid">{stakeholders.map(([t, d, tradeoff]) => <ExpandCard key={t} title={t} summary={d}><p><strong>Điểm cần xét:</strong> {tradeoff}</p></ExpandCard>)}</div>
        <FareExample />
        <div className="card-grid card-grid-2 reveal mln-detail-grid"><ExpandCard title="Nguyên nhân — phân tích kinh tế"><p>Thông tin và khả năng thương lượng có thể không cân xứng. Chi phí đầu vào, áp lực cạnh tranh giá và nhu cầu bù đắp đầu tư có thể làm căng thẳng phân phối. Muốn xác nhận trong vụ việc cụ thể, cần hợp đồng, dữ liệu giá, khấu trừ và chi phí thực tế.</p></ExpandCard><ExpandCard title="Hệ quả có thể xảy ra"><p>Nếu phân phối thiếu minh bạch hoặc một bên khó duy trì hoạt động, có thể xuất hiện tranh chấp, giảm niềm tin, nguồn cung hoặc chất lượng. Đây là khả năng để thảo luận, chưa phải kết quả đo lường hay khẳng định hậu quả do Grab gây ra.</p></ExpandCard></div>
        <p className="mln-source-note">Thông tin sự kiện được trình bày tại mốc thông báo 11/09/2026, không xác nhận trạng thái mới nhất. Phép tính được gắn nhãn GIẢ ĐỊNH; không dùng để suy ra phí hoặc thu nhập thực tế của Grab. Phân tích quan hệ lợi ích không tự chứng minh vi phạm pháp luật hoặc quan hệ lao động có hợp đồng.</p>
        <div className="phan-separator reveal" style={{ margin: '5rem 0' }} />
        <div className="section-header reveal" id="giai-phap">
          <span className="section-label">05 — Giải pháp hài hòa</span>
          <h2>Hài Hòa Các Quan Hệ Lợi Ích</h2>
          <div className="section-divider" />
          <p>Giải pháp tốt không đơn thuần chuyển chi phí từ nhóm này sang nhóm khác, mà tìm cách tăng giá trị chung và xây dựng nguyên tắc phân chia có thể giải thích, giám sát được.</p>
        </div>
        <div className="card-grid card-grid-2 reveal mln-detail-grid">{solutions.map(([t, action, protects, tradeoff]) => <ExpandCard key={t} title={t}><p><strong>Cách làm:</strong> {action}</p><p><strong>Bảo vệ lợi ích:</strong> {protects}</p><p><strong>Đánh đổi:</strong> {tradeoff}</p></ExpandCard>)}</div>
        <div className="def-box reveal"><h3>Đánh giá hiệu quả của giải pháp</h3><p>Theo dõi thu nhập sau chi phí, giá khách hàng trả, chất lượng, an toàn, xử lý khiếu nại và khả năng duy trì nền tảng. Hài hòa không đồng nghĩa chia bằng nhau; cần tạo thêm giá trị, phân phối hợp lý và tôn trọng lợi ích hợp pháp để phát triển bền vững.</p></div>
        <div className="phan-separator reveal" style={{ margin: '5rem 0' }} />
        <div className="section-header reveal" id="sinh-vien">
          <span className="section-label">06 — Liên hệ sinh viên FPT</span>
          <h2>Sinh Viên Cân Bằng Lợi Ích Như Thế Nào?</h2>
          <div className="section-divider" />
          <p>Khi chọn công việc hoặc khởi nghiệp, thu nhập và tăng trưởng là mục tiêu chính đáng. Điều quan trọng là <strong>cách đạt được lợi ích</strong> không gây thiệt hại vô lý cho người khác hoặc cộng đồng.</p>
        </div>
        <div className="feature-grid reveal delay-1">
          <div className="feature-card"><div className="fc-num">01</div><h4>Chọn Việc Làm</h4><p>Không chỉ nhìn lương danh nghĩa: đánh giá thu nhập thực tế, cơ hội phát triển, điều kiện lao động, trách nhiệm và tính minh bạch của doanh nghiệp.</p></div>
          <div className="feature-card"><div className="fc-num">02</div><h4>Khởi Nghiệp</h4><p>Tạo doanh thu từ giá trị thực; thiết kế giá minh bạch, tôn trọng người dùng, cộng tác viên và quyền riêng tư; cân nhắc tác động xã hội lâu dài.</p></div>
          <div className="feature-card"><div className="fc-num">03</div><h4>Dự Án Cộng Đồng</h4><p>Xác định ai hưởng lợi, ai chịu chi phí; đo lường hiệu quả thực chất; công khai ngân sách và tham khảo ý kiến người chịu tác động.</p></div>
        </div>
        <div className="card-grid card-grid-2 reveal mln-detail-grid">{reflections.map(([t, d]) => <ExpandCard key={t} title={t}><p>{d}</p></ExpandCard>)}</div>
        <div className="icon-card reveal delay-2" style={{ maxWidth: '900px', margin: '2rem auto', textAlign: 'left' }}>
          <h4>Câu hỏi dành cho cả lớp</h4><p>Nếu nền tảng giảm khấu trừ cho tài xế nhưng đồng thời tăng giá cước với khách hàng, liệu đó đã là <strong>hài hòa lợi ích kinh tế</strong>? Nhóm cần dựa trên tiêu chí nào để đánh giá?</p>
        </div>
        <div style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.7, fontSize: '0.8rem' }} className="reveal">
          <p>Tham khảo: Giáo trình Kinh tế chính trị Mác – Lênin (2021); thông báo UBCTQG (11/09/2026). Xem phạm vi kiểm chứng ở phần kết luận.</p>
        </div>
      </div>
    </section>
  );
}
