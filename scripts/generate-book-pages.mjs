// Re-typeset the student-authored summary as deterministic text textures.
// The original book geometry, page order, covers and visual palette are retained.
import { createCanvas } from '@napi-rs/canvas';
import { registerBookFonts, writeBookTexture } from './book-fonts.mjs';
registerBookFonts();
export const bookPages = [
  { face: 'Open 1', label: 'KHÁI NIỆM & BẢN CHẤT', title: 'Lợi ích kinh tế', blocks: [
    ['Khái niệm', 'Lợi ích vật chất thu được từ hoạt động kinh tế.'],
    ['Bản chất', 'Mục đích và động cơ của quan hệ giữa các chủ thể.'],
    ['Ví dụ', 'Người lao động cần thu nhập; doanh nghiệp hướng tới lợi nhuận.'],
  ] },
  { face: 'Open 2', label: 'HAI VAI TRÒ CHỦ YẾU', title: 'Động lực & cơ sở vật chất', blocks: [
    ['Động lực trực tiếp', 'Thúc đẩy lao động, đầu tư, kinh doanh và đổi mới.'],
    ['Cơ sở vật chất', 'Tạo điều kiện cho lợi ích xã hội, văn hóa, chính trị.'],
    ['Ví dụ', 'Thu nhập giúp học tập; nguồn lực kinh tế duy trì văn hóa.'],
  ] },
  { face: '46_Page_1', label: 'QUAN HỆ LỢI ÍCH', title: 'Bốn quan hệ cơ bản', blocks: [
    ['', '1. Người lao động và người sử dụng lao động.'],
    ['', '2. Giữa những người sử dụng lao động.'],
    ['', '3. Giữa những người lao động.'],
    ['', '4. Lợi ích cá nhân, nhóm và xã hội.'],
  ] },
  { face: '46_Page_2', label: 'BỐN NHÂN TỐ ẢNH HƯỞNG', title: 'Bốn nhân tố', blocks: [
    ['1. Lực lượng sản xuất', 'Trình độ phát triển tạo điều kiện vật chất.'],
    ['2. Địa vị chủ thể', 'Vị trí trong quan hệ sản xuất xã hội.'],
    ['3. Phân phối thu nhập', 'Chính sách thu nhập của Nhà nước.'],
    ['4. Hội nhập quốc tế', 'Cơ hội thị trường và sức ép cạnh tranh.'],
  ] },
  { face: '47_Page_1', label: 'HAI MẶT CỦA QUAN HỆ', title: 'Sự thống nhất', blocks: [
    ['Các bên cần nhau', 'Lợi ích một bên có thể hỗ trợ lợi ích bên khác.'],
    ['Kinh tế nền tảng', 'Các bên cùng cần dịch vụ được duy trì.'],
    ['Tạo thêm giá trị', 'Ghép chuyến có thể giảm chạy rỗng: cần kiểm chứng.'],
  ] },
  { face: '47_Page_2', label: 'HAI MẶT CỦA QUAN HỆ', title: 'Sự mâu thuẫn', blocks: [
    ['Cách đạt lợi ích', 'Lợi ích một bên có thể cản trở lợi ích bên khác.'],
    ['Phân phối giả định', 'Giá, chi phí cố định: tăng phí giảm phần tài xế.'],
    ['Cần điều hòa', 'Đối thoại, phân phối hợp lý; chưa kết luận vi phạm.'],
  ] },
  { face: '48_Page_1', label: 'TÌNH HUỐNG VIỆT NAM', title: 'Grab & đối tác tài xế', blocks: [
    ['Thông báo 11/09/2026', 'UBCTQG rà soát giá và phí; chưa kết luận vi phạm.'],
    ['Phản ánh của tài xế', 'Phản ánh về giá, phí và khấu trừ cần được xác minh.'],
    ['Diễn giải của nhóm', 'Phân tích lợi ích; không phải kết luận pháp lý.'],
  ] },
  { face: '48_Page_2', label: 'GIẢI PHÁP HÀI HÒA', title: 'Hài hòa lợi ích', blocks: [
    ['Minh bạch và đối thoại', 'Đối soát rõ; dành nguồn lực, thời gian triển khai.'],
    ['Giám sát có bằng chứng', 'Bảo vệ lợi ích hợp pháp; cân nhắc chi phí tuân thủ.'],
    ['Đánh giá nhiều bên', 'Xét thu nhập ròng, giá, chất lượng; hài hòa không nhất thiết chia đều.'],
  ] },
  { face: 'Close 1', label: 'LIÊN HỆ SINH VIÊN FPT', title: 'Lợi ích gắn với trách nhiệm', blocks: [
    ['Chọn việc và làm việc', 'Xét thu nhập, kỹ năng, điều kiện và trách nhiệm.'],
    ['WeDo giả định', 'Gói cơ bản dễ tiếp cận; gói trả phí duy trì chất lượng.'],
    ['Dự án cộng đồng', 'Thống nhất lợi ích, chi phí, vận hành và bàn giao.'],
  ] },
  { face: 'Close 2', label: 'TỔNG KẾT & NGUỒN', title: 'Ba câu hỏi để suy ngẫm', blocks: [
    ['Câu hỏi để suy ngẫm', 'Ai hưởng lợi? Ai chịu chi phí? Phân chia hợp lý?'],
    ['Cơ sở lý luận', 'Giáo trình Bộ GD&ĐT năm 2021, Chương 5, mục 5.3.1.'],
    ['Nguồn và giới hạn', 'Thông báo UBCTQG 11/09/2026. Xem mục Nguồn & AI.'],
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
  ctx.fillStyle = '#79272c'; ctx.font = '600 40px BookSans'; ctx.fillText('KINH TẾ CHÍNH TRỊ MÁC – LÊNIN', 112, 130);
  ctx.fillStyle = '#51443b'; ctx.font = '40px BookSans'; ctx.fillText(page.label, 112, 186);
  ctx.font = 'bold 100px BookSerif'; ctx.textAlign = 'center'; ctx.fillStyle = '#79272c';
  const title = measure(page.title, 1300);
  title.forEach((line, i) => ctx.fillText(line, 768, 305 + i * 134));
  const divider = 344 + (title.length - 1) * 134;
  ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(112, divider); ctx.lineTo(1424, divider); ctx.stroke();
  ctx.fillStyle = '#79272c'; ctx.beginPath(); ctx.arc(768, divider, 8, 0, Math.PI * 2); ctx.fill();
  ctx.textAlign = 'left';
  let y = divider + 34;
  const fontSize = page.blocks.length === 4 ? 92 : 96;
  const headingSize = page.blocks.length === 4 ? 76 : 86;
  for (let i = 0; i < page.blocks.length; i++) {
    const [heading, body] = page.blocks[i];
    ctx.font = `bold ${headingSize}px BookSerif`;
    const headings = measure(heading, 1220);
    ctx.font = `${fontSize}px BookSans`;
    const bodies = measure(body, 1220);
    const lineHeight = fontSize * 1.28;
    const headingHeight = headingSize * 1.34;
    const rows = [...headings.map(text => ({ text, font: `bold ${headingSize}px BookSerif`, color: '#79272c', lineHeight: headingHeight })), ...bodies.map(text => ({ text, font: `${fontSize}px BookSans`, color: '#251d18', lineHeight }))].map(row => {
      ctx.font = row.font;
      const metrics = ctx.measureText(row.text);
      return { ...row, metrics, lineHeight: Math.max(row.lineHeight, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 8) };
    });
    const boxHeight = 20 + rows.reduce((sum, row) => sum + row.lineHeight, 0);
    ctx.fillStyle = i % 2 ? '#e8d4b7' : '#f1e2c8';
    ctx.beginPath(); ctx.roundRect(112, y, 1312, boxHeight, 12); ctx.fill();
    ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 1.5; ctx.stroke();
    let rowTop = y + 10, previousBottom = y;
    for (const row of rows) {
      const { actualBoundingBoxAscent: ascent, actualBoundingBoxDescent: descent } = row.metrics;
      const baseline = rowTop + (row.lineHeight - ascent - descent) / 2 + ascent;
      if (baseline - ascent < previousBottom || baseline + descent > y + boxHeight) throw new Error(`Clipped or overlapping marks on ${page.face}: ${row.text}`);
      ctx.font = row.font; ctx.fillStyle = row.color;
      ctx.fillText(row.text, 156, baseline);
      previousBottom = baseline + descent; rowTop += row.lineHeight;
    }
    y += boxHeight + (page.blocks.length === 4 ? 10 : 18);
  }
  if (y > 1850) throw new Error(`Text overflows ${page.face}: ${Math.round(y)}`);
  ctx.strokeStyle = '#b38c5c'; ctx.beginPath(); ctx.moveTo(112, 1890); ctx.lineTo(1424, 1890); ctx.stroke();
  ctx.fillStyle = '#51443b'; ctx.font = '34px BookSans'; ctx.fillText('MLN122 · SLOT 8 · CHƯƠNG 5 · MỤC 5.3.1', 112, 1940);
  ctx.textAlign = 'right'; ctx.font = 'bold 42px BookSerif'; ctx.fillStyle = '#79272c'; ctx.fillText(String(index + 1).padStart(2, '0'), 1424, 1940);
  return { image: canvas.toBuffer('image/png'), record: { face: page.face, width: 1536, height: 2048, bodyFont: fontSize, headingFont: headingSize, titleFont: 100, contentBottom: Math.round(y), bundledFonts: true, glyphBoundsChecked: true } };
}
const results = bookPages.map(generate);
for (const { image, record } of results) await writeBookTexture(`public/textures/${record.face}.png`, image);
await writeBookTexture('qa/book-typesetting.json', JSON.stringify(results.map(result => result.record), null, 2));
console.log(`Generated ${results.length} student summary pages; no text crosses the footer.`);
