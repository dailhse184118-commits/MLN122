import ExpandCard from './ExpandCard';

// Teaching model only. These values are not Grab fares, fees or earnings.
export const hypotheticalFare = Object.freeze({ fare: 100000, feeRate: 0.2, fuel: 18000, maintenance: 7000, depreciation: 10000 });
export function calculateFare({ fare, feeRate, fuel, maintenance, depreciation }) {
  const fee = Math.round(fare * feeRate);
  const gross = fare - fee;
  const costs = fuel + maintenance + depreciation;
  return { fee, gross, costs, net: gross - costs };
}
const money = value => `${new Intl.NumberFormat('vi-VN').format(value)} đ`;

export default function FareExample() {
  const { fee, gross, costs, net } = calculateFare(hypotheticalFare);
  const steps = [
    ['Khách trả', hypotheticalFare.fare, 'Giá chuyến giả định'],
    ['Trừ phí nền tảng', fee, '20% × 100.000 đ'],
    ['Tài xế nhận trước chi phí', gross, '100.000 − 20.000'],
    ['Trừ chi phí vận hành', costs, '18.000 + 7.000 + 10.000'],
    ['Thu nhập ròng minh họa', net, '80.000 − 35.000'],
  ];
  return <figure className="fare-example reveal" aria-labelledby="fare-title">
    <figcaption>
      <span className="section-label">GIẢ ĐỊNH · HYPOTHETICAL</span>
      <h3 id="fare-title">Một chuyến xe, tiền được phân chia thế nào?</h3>
      <p>Mọi số tiền và tỷ lệ dưới đây chỉ phục vụ học tập, <strong>không phải số liệu hoặc chính sách phí của Grab</strong>.</p>
    </figcaption>
    <ol className="fare-flow">{steps.map(([label, amount, detail], i) => <li key={label}>
      <span className="fare-step">0{i + 1}</span><span>{label}</span><strong>{money(amount)}</strong><small>{detail}</small>
      {i < steps.length - 1 && <span className="fare-arrow" aria-hidden="true">→</span>}
    </li>)}</ol>
    <p className="fare-takeaway"><strong>20.000 đ là doanh thu phí trong mô hình, không phải lợi nhuận công ty.</strong> Nền tảng còn phải trang trải công nghệ, nhân sự, hỗ trợ, tiếp thị và các nghĩa vụ liên quan.</p>
    <ExpandCard title="Giả định của phép tính và cách đọc thu nhập ròng">
      <p>Chi phí tài xế được phân bổ cho một chuyến: nhiên liệu 18.000 đ, bảo dưỡng 7.000 đ, khấu hao 10.000 đ. Kết quả 45.000 đ là phần còn lại sau các chi phí đã liệt kê.</p>
      <p>Mô hình đơn giản hóa bỏ qua thuế, tiền thưởng, khuyến mại, tiền boa, phí cầu đường và chi phí khác. Chưa quy đổi thời gian chạy xe hoặc chờ thành chi phí cơ hội. Vì vậy không dùng 45.000 đ để suy ra lương theo giờ, mức sống hay thu nhập thực tế của tài xế.</p>
      <p><strong>Gợi ý thảo luận:</strong> Nếu phí giảm nhưng số chuyến cũng giảm, thu nhập theo ngày có chắc tăng? Cần dữ liệu về lượng chuyến, chi phí và thời gian.</p>
    </ExpandCard>
  </figure>;
}
