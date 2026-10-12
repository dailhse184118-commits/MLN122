// Re-typeset the student-authored summary as deterministic text textures.
// The original book geometry, page order, covers and visual palette are retained.
import { createCanvas, registerFont } from 'canvas';
import { writeFileSync, existsSync } from 'node:fs';
if (existsSync('C:/Windows/Fonts/timesbd.ttf')) registerFont('C:/Windows/Fonts/timesbd.ttf', { family: 'BookSerif', weight: 'bold' });
if (existsSync('C:/Windows/Fonts/arial.ttf')) registerFont('C:/Windows/Fonts/arial.ttf', { family: 'BookSans' });
export const bookPages = [
  { face: 'Open 1', label: 'KHÁI NIỆM & BẢN CHẤT', title: 'Lợi ích kinh tế', blocks: [
    ['Khái niệm', 'Lợi ích vật chất mà con người có được từ hoạt động kinh tế, gắn với đáp ứng nhu cầu.'],
    ['Bản chất', 'Mục đích và động cơ khiến các chủ thể xác lập quan hệ với nhau trong nền sản xuất xã hội.'],
    ['Ví dụ minh họa', 'Người lao động tìm kiếm thu nhập; doanh nghiệp tổ chức kinh doanh để đạt lợi nhuận.'],
  ] },
  { face: 'Open 2', label: 'HAI VAI TRÒ CHỦ YẾU', title: 'Động lực & cơ sở vật chất', blocks: [
    ['Động lực trực tiếp', 'Kỳ vọng cải thiện thu nhập thúc đẩy lao động, đầu tư, kinh doanh và đổi mới.'],
    ['Cơ sở phát triển lợi ích khác', 'Lợi ích kinh tế được thực hiện tạo điều kiện vật chất cho các lợi ích xã hội, văn hóa, chính trị.'],
    ['Ví dụ minh họa', 'Thu nhập giúp người lao động học tập; nguồn lực kinh tế giúp duy trì hoạt động văn hóa.'],
  ] },
  { face: '46_Page_1', label: 'QUAN HỆ LỢI ÍCH', title: 'Tương tác để xác lập lợi ích', blocks: [
    ['Phân biệt hai khái niệm', 'Lợi ích: chủ thể đạt được gì? Quan hệ lợi ích: các bên tương tác thế nào để đạt lợi ích?'],
    ['Ba quan hệ giữa chủ thể', 'Người lao động – người sử dụng lao động; giữa những người sử dụng lao động; giữa những người lao động.'],
    ['Quan hệ thứ tư', 'Giữa lợi ích cá nhân, lợi ích nhóm và lợi ích xã hội. Lợi ích cá nhân chính đáng cần được tôn trọng.'],
  ] },
  { face: '46_Page_2', label: 'BỐN NHÂN TỐ ẢNH HƯỞNG', title: 'Vì sao lợi ích khác nhau?', blocks: [
    ['1. Trình độ phát triển của lực lượng sản xuất', 'Tác động đến khả năng tạo ra hàng hóa, dịch vụ để đáp ứng lợi ích.'],
    ['2. Địa vị của chủ thể trong hệ thống quan hệ sản xuất xã hội', 'Sở hữu và vai trò trong sản xuất ảnh hưởng vị thế hưởng lợi.'],
    ['3. Chính sách phân phối thu nhập của Nhà nước', 'Làm thay đổi mức thu nhập và tương quan thu nhập.'],
    ['4. Hội nhập kinh tế quốc tế', 'Tạo cơ hội thương mại, đầu tư và sức ép cạnh tranh.'],
  ] },
  { face: '47_Page_1', label: 'HAI MẶT CỦA QUAN HỆ', title: 'Sự thống nhất', blocks: [
    ['Các chủ thể cần nhau', 'Lợi ích của chủ thể này được thực hiện có thể tạo điều kiện cho chủ thể khác.'],
    ['Ví dụ kinh tế nền tảng', 'Nền tảng cần tài xế và khách hàng; tài xế cần cơ hội nhận chuyến; khách cần đi lại thuận tiện.'],
    ['Tạo thêm giá trị', 'Ghép chuyến tốt có thể giảm chạy rỗng. Phải kiểm tra dữ liệu trước khi kết luận về hiệu quả thực tế.'],
  ] },
  { face: '47_Page_2', label: 'HAI MẶT CỦA QUAN HỆ', title: 'Sự mâu thuẫn', blocks: [
    ['Cách đạt lợi ích có thể đối lập', 'Thực hiện lợi ích của một bên có thể cản trở hoặc làm tổn hại lợi ích bên khác.'],
    ['Minh họa phân phối', 'Giữ nguyên giá chuyến và chi phí khác, tăng phí nền tảng làm phần tài xế nhận giảm.'],
    ['Cần điều hòa', 'Đối thoại, minh bạch và phân phối hợp lý. Mâu thuẫn lợi ích không tự chứng minh vi phạm pháp luật.'],
  ] },
  { face: '48_Page_1', label: 'TÌNH HUỐNG VIỆT NAM', title: 'Grab & đối tác tài xế', blocks: [
    ['Sự kiện chính thức · 11/09/2026', 'UBCTQG thông báo rà soát, xác minh và yêu cầu tài liệu liên quan đến chính sách giá, phí.'],
    ['Phản ánh cần xác minh', 'Một số tài xế phản ánh vấn đề giá cước, phí, chiết khấu và các khoản khấu trừ.'],
    ['Phân tích của nhóm', 'Vận dụng lý luận về phân phối lợi ích; không xem rà soát là kết luận Grab vi phạm.'],
  ] },
  { face: '48_Page_2', label: 'GIẢI PHÁP HÀI HÒA', title: 'Tạo giá trị & phân phối hợp lý', blocks: [
    ['Minh bạch và đối thoại', 'Đối soát dễ kiểm tra; giải thích thay đổi phí. Đánh đổi: chi phí triển khai và thời gian đối thoại.'],
    ['Giám sát có bằng chứng', 'Bảo vệ quyền lợi hợp pháp, cạnh tranh lành mạnh. Cân nhắc chi phí tuân thủ và khả năng đổi mới.'],
    ['Đánh giá nhiều bên', 'Theo dõi thu nhập ròng, giá, chất lượng và khả năng duy trì. Hài hòa không đồng nghĩa chia đều.'],
  ] },
  { face: 'Close 1', label: 'LIÊN HỆ SINH VIÊN FPT', title: 'Lợi ích gắn với trách nhiệm', blocks: [
    ['Chọn việc và làm việc', 'Cân nhắc thu nhập, kỹ năng, điều kiện lao động; tôn trọng khách hàng và đồng nghiệp.'],
    ['WeDo · ví dụ giả định', 'Gói cơ bản dễ tiếp cận, gói trả phí tạo giá trị; cần nguồn lực bảo mật và chất lượng.'],
    ['Dự án cộng đồng', 'Thống nhất ai hưởng lợi, ai chịu chi phí và trách nhiệm vận hành, bàn giao.'],
  ] },
  { face: 'Close 2', label: 'TỔNG KẾT & NGUỒN', title: 'Ba câu hỏi để suy ngẫm', blocks: [
    ['Ai hưởng lợi? Ai chịu chi phí?', 'Cơ chế phân chia có rõ ràng, hợp lý và duy trì được lâu dài không?'],
    ['Cơ sở lý luận', 'Bộ GD&ĐT, Giáo trình Kinh tế chính trị Mác – Lênin, hệ không chuyên, NXB CTQG Sự thật, 2021.'],
    ['Nguồn vụ việc và giới hạn', 'Thông báo UBCTQG 11/09/2026. Xem liên kết và phạm vi đối chiếu tại mục Nguồn & AI trên website.'],
  ] },
];

function generate(page, index) {
  const canvas = createCanvas(1536, 2048), ctx = canvas.getContext('2d');
  const measure = (text, maxWidth) => {
    const lines = []; let line = '';
    for (const word of text.split(' ')) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > maxWidth) { lines.push(line); line = word; } else line = candidate;
    }
    if (line) lines.push(line);
    return lines;
  };
  ctx.fillStyle = '#f3e5cb'; ctx.fillRect(0, 0, 1536, 2048);
  ctx.fillStyle = '#79272c'; ctx.fillRect(0, 0, 1536, 30);
  ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 4; ctx.strokeRect(58, 64, 1420, 1920);
  ctx.lineWidth = 1.5; ctx.strokeRect(72, 78, 1392, 1892);
  ctx.fillStyle = '#79272c'; ctx.font = 'bold 30px BookSans'; ctx.fillText('KINH TẾ CHÍNH TRỊ MÁC – LÊNIN', 112, 134);
  ctx.fillStyle = '#6b5549'; ctx.font = '28px BookSans'; ctx.fillText(page.label, 112, 182);
  ctx.font = 'bold 82px BookSerif'; ctx.textAlign = 'center'; ctx.fillStyle = '#79272c';
  const title = measure(page.title, 1300);
  title.forEach((line, i) => ctx.fillText(line, 768, 305 + i * 96));
  const divider = 330 + title.length * 96;
  ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(112, divider); ctx.lineTo(1424, divider); ctx.stroke();
  ctx.fillStyle = '#79272c'; ctx.beginPath(); ctx.arc(768, divider, 8, 0, Math.PI * 2); ctx.fill();
  ctx.textAlign = 'left';
  let y = divider + 54;
  const fontSize = page.blocks.length === 4 ? 51 : 64;
  for (let i = 0; i < page.blocks.length; i++) {
    const [heading, body] = page.blocks[i];
    ctx.font = `bold ${fontSize + 4}px BookSerif`;
    const headings = measure(heading, 1220);
    ctx.font = `${fontSize}px BookSans`;
    const bodies = measure(body, 1220);
    const lineHeight = fontSize * 1.36;
    const boxHeight = 56 + headings.length * lineHeight + bodies.length * lineHeight;
    ctx.fillStyle = i % 2 ? '#e8d4b7' : '#f1e2c8';
    ctx.beginPath(); ctx.roundRect(112, y, 1312, boxHeight, 12); ctx.fill();
    ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 1.5; ctx.stroke();
    let textY = y + 32 + fontSize;
    ctx.font = `bold ${fontSize + 4}px BookSerif`; ctx.fillStyle = '#79272c';
    headings.forEach(line => { ctx.fillText(line, 156, textY); textY += lineHeight; });
    ctx.font = `${fontSize}px BookSans`; ctx.fillStyle = '#40302a';
    bodies.forEach(line => { ctx.fillText(line, 156, textY); textY += lineHeight; });
    y += boxHeight + 28;
  }
  if (y > 1850) throw new Error(`Text overflows ${page.face}: ${Math.round(y)}`);
  ctx.strokeStyle = '#b38c5c'; ctx.beginPath(); ctx.moveTo(112, 1890); ctx.lineTo(1424, 1890); ctx.stroke();
  ctx.fillStyle = '#6b5549'; ctx.font = '26px BookSans'; ctx.fillText('MLN122 · SLOT 8 · CHƯƠNG 5 · MỤC 5.3.1', 112, 1940);
  ctx.textAlign = 'right'; ctx.font = 'bold 42px BookSerif'; ctx.fillStyle = '#79272c'; ctx.fillText(String(index + 1).padStart(2, '0'), 1424, 1940);
  writeFileSync(`public/textures/${page.face}.png`, canvas.toBuffer('image/png'));
  return { face: page.face, width: 1536, height: 2048, bodyFont: fontSize, contentBottom: Math.round(y) };
}
const results = bookPages.map(generate);
writeFileSync('qa/book-typesetting.json', JSON.stringify(results, null, 2));
console.log(`Generated ${results.length} student summary pages; no text crosses the footer.`);
