// Fisher–Yates keeps each answer attached to its own explanation and score.
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const quizQuestions = [
  { question: 'Điểm nào phân biệt lợi ích kinh tế với quan hệ lợi ích kinh tế?', options: [
    { text: 'Lợi ích là điều chủ thể nhận được; quan hệ lợi ích là tương tác giữa các chủ thể để xác lập lợi ích.', correct: true, explanation: 'Một bên nói về lợi ích vật chất, bên kia nói về quan hệ để thực hiện lợi ích. Thu nhập của tài xế và cơ chế phân chia với nền tảng là hai cấp độ phân tích khác nhau.' },
    { text: 'Lợi ích chỉ xét thu nhập cá nhân; quan hệ lợi ích chỉ xét lợi nhuận của doanh nghiệp.', explanation: 'Cả cá nhân, tổ chức và cộng đồng đều có lợi ích và tham gia quan hệ lợi ích. Không thể phân biệt hai khái niệm bằng cách chia cá nhân với doanh nghiệp.' },
    { text: 'Lợi ích là khoản thu kỳ vọng; quan hệ lợi ích là khoản thu đã thực hiện.', explanation: 'Kỳ vọng hay thực hiện là trạng thái của lợi ích. Quan hệ lợi ích nói đến tương tác giữa các chủ thể, không phải thời điểm ghi nhận khoản thu.' },
  ] },
  { question: 'Lợi ích kinh tế có hai vai trò chủ yếu nào?', options: [
    { text: 'Thúc đẩy hoạt động kinh tế và tạo điều kiện vật chất phát triển các lợi ích khác.', correct: true, explanation: 'Thu nhập, lợi nhuận tạo động lực trực tiếp cho hành động. Khi được thực hiện, chúng còn cung cấp điều kiện vật chất cho những lợi ích xã hội, văn hóa, chính trị.' },
    { text: 'Thúc đẩy lao động và bảo đảm mọi chủ thể nhận mức thu nhập bằng nhau.', explanation: 'Vai trò tạo động lực không kéo theo thu nhập bằng nhau. Còn cần nhận diện vai trò làm cơ sở vật chất cho các lợi ích khác.' },
    { text: 'Cung cấp nguồn lực cho văn hóa và chủ yếu chi phối quyết định ngắn hạn.', explanation: 'Nguồn lực vật chất là một vai trò, nhưng lợi ích kinh tế còn trực tiếp thúc đẩy đầu tư và hoạt động dài hạn, không chỉ quyết định trước mắt.' },
  ] },
  { question: 'Nhà nước điều chỉnh thuế thu nhập, làm thay đổi tương quan thu nhập giữa các nhóm. Nhân tố nào tác động trực tiếp?', options: [
    { text: 'Chính sách phân phối thu nhập của Nhà nước.', correct: true, explanation: 'Tình huống mô tả thay đổi phân phối qua chính sách. Ba nhân tố còn lại là trình độ phát triển lực lượng sản xuất, địa vị chủ thể trong quan hệ sản xuất xã hội và hội nhập kinh tế quốc tế.' },
    { text: 'Trình độ phát triển của lực lượng sản xuất.', explanation: 'Năng suất và công nghệ ảnh hưởng lượng của cải có thể phân phối. Ở đây, thay đổi trực tiếp được nêu là chính sách thuế, không phải công nghệ hay năng suất.' },
    { text: 'Địa vị của chủ thể trong hệ thống quan hệ sản xuất xã hội.', explanation: 'Địa vị liên quan đến sở hữu và vai trò trong sản xuất. Tình huống không nêu thay đổi địa vị mà nêu việc Nhà nước điều chỉnh phân phối thu nhập.' },
  ] },
  { question: 'GIẢ ĐỊNH: Khách trả 100.000đ; phí nền tảng 20.000đ; tài xế tốn 35.000đ vận hành. Cách đọc nào đúng?', options: [
    { text: 'Tài xế còn 45.000đ sau chi phí đã nêu; chưa xác định được lợi nhuận nền tảng.', correct: true, explanation: '100.000 − 20.000 − 35.000 = 45.000đ. Phí 20.000đ là doanh thu phí minh họa; chưa trừ chi phí của nền tảng. Đây không phải số liệu Grab, không phải thu nhập theo giờ.' },
    { text: 'Tài xế còn 80.000đ thu nhập ròng; nền tảng có doanh thu phí 20.000đ.', explanation: '80.000đ là phần tài xế nhận trước chi phí vận hành. Cần trừ tiếp 35.000đ, còn 45.000đ theo giả định.' },
    { text: 'Tài xế còn 45.000đ; nền tảng có lợi nhuận 20.000đ.', explanation: 'Phần tài xế được tính đúng, nhưng phí thu được chưa phải lợi nhuận. Nền tảng còn chi phí công nghệ, nhân sự và các khoản khác.' },
  ] },
];
export const createQuiz = (random = Math.random) => quizQuestions.map(q => ({ ...q, options: shuffle(q.options, random) }));
export const createScenarioRun = (scenarios, random = Math.random) => scenarios.map(s => ({ ...s, choices: shuffle(s.choices, random).map((c, i) => ({ ...c, label: String.fromCharCode(65 + i) })) }));
