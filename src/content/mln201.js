// Nội dung biên soạn cho thuyết trình; ví dụ và giải pháp là phân tích của bài học.
import { visualAssets } from './visualAssets';
export const references = [
  { title: 'Bộ GD&ĐT (2021). Giáo trình Kinh tế chính trị Mác – Lênin, hệ không chuyên. NXB Chính trị quốc gia Sự thật.', url: 'https://www.nxbctqg.org.vn/giao-trinh-kinh-te-chinh-tri-mac-lenin-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-.html', note: 'Nguồn xác nhận ấn bản 2021. Phần lý luận được diễn giải, đối chiếu thuật ngữ với bản toàn văn đăng lại và bài giảng của Bộ môn Kinh tế chính trị 2, Đại học Thương mại; chưa kiểm tra bản in của nhóm. Không gán số trang cho từng luận điểm.' },
  { title: 'Ủy ban Cạnh tranh Quốc gia (11/09/2026). Rà soát, xác minh phản ánh về chính sách giá, phí của Grab.', url: 'https://vcc.gov.vn/default.aspx?category_id=e0904ba0-4694-4595-9f66-dc2df621842a&do=detail&id=f73009a6-f838-4d43-9535-911c7e85ea9e&page=news', note: 'Đã đọc thông báo gốc. Trạng thái được mô tả tại mốc thông báo, không phải kết luận vi phạm hay xác nhận tình trạng mới nhất.' },
  { title: 'Bản toàn văn giáo trình 2021 đăng lại trên PDFCoffee.', url: 'https://pdfcoffee.com/giao-trinh-ktct-2021-pdf-free.html', note: 'Bản do người dùng tải lên, có OCR sai dấu. Đã đọc phần lợi ích kinh tế và quan hệ lợi ích để đối chiếu thuật ngữ; không xem nền tảng đăng lại là cơ quan xác nhận học thuật. Nhóm nên kiểm tra bản in hoặc bản thư viện được cấp quyền.' },
  { title: 'Đại học Thương mại, Bộ môn Kinh tế chính trị 2. Bài giảng Chương 5.', url: 'https://tmu-moodle.tmu.edu.vn/moodledata/filedir/a0/de/a0de9337223bf59c9bc2cce5ec1fcacc9dcbf0df.pdf', note: 'Tài liệu trên hệ thống học tập của trường; đã đọc phần III về khái niệm, bản chất, hai vai trò, bốn nhân tố và bốn quan hệ cơ bản. Dùng đối chiếu bổ sung, không thay thế giáo trình 2021.' },
];

export const concepts = [
  { title: 'Khái niệm', text: 'Lợi ích kinh tế là lợi ích vật chất mà chủ thể nhận được khi tham gia hoạt động kinh tế. Nó gắn với việc đáp ứng nhu cầu và điều kiện tái sản xuất đời sống.', example: 'Sinh viên làm thêm quan tâm tiền công thực nhận và khả năng trang trải học phí, sinh hoạt.' },
  { title: 'Bản chất', text: 'Các chủ thể xác lập quan hệ kinh tế vì những lợi ích có thể đạt được. Vì vậy, cần làm rõ mục đích và động cơ đằng sau quan hệ ấy, gắn với vai trò của mỗi bên trong nền sản xuất xã hội.', example: 'Người lao động và doanh nghiệp hợp tác: một bên tìm kiếm thu nhập, bên kia tổ chức sản xuất để thu lợi nhuận.' },
  { title: 'Vai trò', text: 'Lợi ích kinh tế tạo động lực trực tiếp cho hoạt động kinh tế, thúc đẩy lao động, đầu tư và đổi mới. Việc thực hiện lợi ích kinh tế tạo cơ sở vật chất cho các lợi ích khác.', example: 'Thu nhập ổn định giúp người lao động học kỹ năng mới; lợi nhuận tạo nguồn lực để doanh nghiệp đầu tư.' },
];

export const factors = [
  ['Trình độ phát triển của lực lượng sản xuất', 'Công nghệ và năng suất quyết định khả năng tạo ra của cải để phân phối. Ví dụ vận dụng: công cụ ghép chuyến tốt có thể giảm thời gian xe chạy rỗng.'],
  ['Địa vị của chủ thể trong hệ thống quan hệ sản xuất xã hội', 'Sở hữu tư liệu sản xuất, quyền tổ chức và quyền phân phối tạo vị thế khác nhau. Ví dụ vận dụng: bên vận hành nền tảng có quyền thiết kế cơ chế phí.'],
  ['Chính sách phân phối thu nhập của Nhà nước', 'Thuế, an sinh và chính sách thu nhập tác động đến phần lợi ích mỗi bên nhận được; cần xét cả hiệu quả lẫn công bằng.'],
  ['Hội nhập kinh tế quốc tế', 'Mở rộng thị trường và đầu tư đồng thời tăng áp lực cạnh tranh; chủ thể có thể được lợi hoặc chịu sức ép điều chỉnh.'],
];

export const relationships = [
  ['Người lao động ↔ Người sử dụng lao động', 'Cùng cần hoạt động sản xuất ổn định; có thể mâu thuẫn về tiền công, thời giờ làm việc và phần kết quả được phân phối. Ví dụ: tăng lương cần gắn với năng suất và điều kiện lao động.'],
  ['Những người sử dụng lao động', 'Có thể hợp tác trong chuỗi cung ứng, đồng thời cạnh tranh về thị trường, vốn và lao động. Liên kết cần tránh gây hại cho cạnh tranh và người tiêu dùng.'],
  ['Những người lao động', 'Cùng có nhu cầu việc làm, thu nhập và an toàn; đồng thời có thể cạnh tranh cơ hội việc làm. Hợp tác, chia sẻ kỹ năng và đại diện phù hợp giúp bảo vệ lợi ích chung.'],
  ['Cá nhân ↔ Nhóm ↔ Xã hội', 'Lợi ích cá nhân là động lực; lợi ích nhóm có thể giúp hợp tác. Khi nhóm dùng đặc quyền để chuyển chi phí cho cộng đồng, lợi ích xã hội bị tổn hại.'],
];

export const stakeholders = [
  ['Grab — doanh nghiệp nền tảng', 'Doanh thu từ dịch vụ, khả năng bù đắp chi phí công nghệ và phát triển mạng lưới.', 'Cần tài xế và khách hàng tiếp tục tham gia; phí cao có thể gây bất mãn và giảm sức hấp dẫn.'],
  ['Đối tác tài xế', 'Thu nhập thực nhận, lượng chuyến, chi phí vận hành hợp lý và thông tin dễ kiểm tra.', 'Doanh thu chuyến xe chưa phải thu nhập ròng: còn nhiên liệu, khấu hao và thời gian chờ.'],
  ['Khách hàng', 'Giá phù hợp, an toàn, dịch vụ đáng tin cậy và khả năng khiếu nại.', 'Giá thấp thiếu bền vững có thể ảnh hưởng nguồn cung và chất lượng; tăng giá có thể giảm khả năng tiếp cận.'],
  ['Nhà nước và xã hội', 'Cạnh tranh lành mạnh, quyền lợi các bên, nguồn thu hợp pháp, giao thông an toàn và phát triển bền vững.', 'Cần cân bằng giám sát với chi phí tuân thủ, đổi mới và cơ hội sinh kế.'],
];

export const solutions = [
  ['Minh bạch giá và khoản khấu trừ', 'Hiển thị cách tính, căn cứ thu phí, phần tài xế nhận và thông báo trước khi thay đổi; có bản đối soát dễ tải.', 'Bảo vệ tài xế và khách hàng; nền tảng tăng niềm tin.', 'Tăng chi phí triển khai; công khai thông tin cần bảo vệ dữ liệu cá nhân và bí mật kinh doanh hợp pháp.'],
  ['Cơ chế công bằng cho tài xế', 'Đối soát có thể kiểm tra, kênh phản hồi quyết định, thí điểm hỗ trợ thời gian chờ và đánh giá thu nhập sau chi phí.', 'Bảo vệ sinh kế và giữ nguồn cung dịch vụ.', 'Giảm phí hoặc hỗ trợ thu nhập có thể giảm nguồn lực đầu tư; cần thử nghiệm thay vì ấn định một mức phí “đúng” cho mọi dịch vụ.'],
  ['Bảo vệ khách hàng', 'Thông báo tổng giá trước khi đặt, giải thích biến động giá, xử lý khiếu nại và duy trì tiêu chuẩn an toàn.', 'Bảo vệ khả năng lựa chọn, túi tiền và chất lượng phục vụ.', 'Giá quá thấp có thể không bù chi phí; hỗ trợ nhóm cần thiết phải có nguồn tài trợ rõ ràng.'],
  ['Giám sát dựa trên bằng chứng', 'Thu thập hợp đồng, dữ liệu giá và phí; đánh giá cạnh tranh và tác động chính sách theo thẩm quyền.', 'Bảo vệ lợi ích xã hội và quyền lợi hợp pháp của các bên.', 'Tuân thủ làm tăng chi phí; cần quy định tương xứng, tránh hạn chế đổi mới hoặc bảo hộ doanh nghiệp.'],
  ['Đối thoại và giải quyết tranh chấp', 'Thiết lập đầu mối, thời hạn phản hồi, cơ chế xem xét lại và đối thoại định kỳ với đại diện phù hợp.', 'Giúp tài xế được lắng nghe, khách hàng được giải quyết vấn đề và doanh nghiệp giảm xung đột.', 'Cần thời gian và đại diện thực chất; không thay thế quyền yêu cầu cơ quan có thẩm quyền giải quyết.'],
  ['Cạnh tranh và phát triển bền vững', 'Cải thiện năng suất ghép chuyến, chất lượng dịch vụ và điều kiện hợp tác thay vì chỉ chuyển chi phí sang bên khác.', 'Tạo thêm giá trị để lợi ích cá nhân, doanh nghiệp và xã hội cùng có cơ sở phát triển.', 'Đầu tư có chi phí ban đầu; cần theo dõi thu nhập ròng, giá, an toàn và mức độ hài lòng thay vì chỉ doanh thu.'],
];

export const reflections = [
  ['Chọn việc', 'Sinh viên FPT cân nhắc thu nhập, khả năng học hỏi, điều kiện làm việc và giá trị sản phẩm. Một công việc trả cao nhưng yêu cầu lừa khách hàng không tạo lợi ích bền vững.'],
  ['Làm cho doanh nghiệp', 'Lập trình viên bảo vệ dữ liệu người dùng, báo cáo đúng tiến độ và trao đổi khối lượng công việc. Lương và cơ hội phát triển cần đi cùng trách nhiệm với khách hàng, đồng nghiệp.'],
  ['Khởi nghiệp với WeDo', 'Ví dụ minh họa: duy trì gói cơ bản phù hợp sinh viên, thu phí tính năng tạo giá trị cho nhóm và dành ngân sách cho bảo mật, độ tin cậy. Đây là phương án thảo luận, không phải dữ liệu doanh thu hay kết quả kinh doanh đã kiểm chứng.'],
  ['Dự án cộng đồng', 'Nhóm sinh viên xây công cụ cho câu lạc bộ: thống nhất quyền sở hữu, chi phí máy chủ, trách nhiệm hỗ trợ và cách bàn giao. Tình nguyện vẫn cần kế hoạch để tránh hệ thống bị bỏ lại.'],
];

const choice = (text, score, result, concept) => ({ text, type: score === 50 ? 'integrity' : score === 20 ? 'adaptation' : 'change', score, resultTitle: score === 50 ? 'Phân tích phù hợp' : score === 20 ? 'Đúng một phần' : 'Cần phân biệt rõ hơn', result, concept });
export const scenarios = [
  { id: 1, act: 'TÌNH HUỐNG 01', title: 'Nền tảng và tài xế', tag: 'Phân phối lợi ích', image: visualAssets.driver, imagePosition: 'right center', context: 'GIẢ ĐỊNH: giá chuyến và chi phí vận hành giữ nguyên, nền tảng tăng tỷ lệ phí. Minh được mời phân tích tác động tới các bên.', character: { name: 'Đại diện nền tảng', portrait: 'boss', side: 'right', pitch: 1, rate: 1 }, dialogue: 'Cách phân tích nào nhận diện đầy đủ quan hệ lợi ích trong tình huống này?', choices: [
    choice('Phần tài xế nhận giảm; hai bên vẫn cần nhau để duy trì dịch vụ.', 50, 'Khi giá và chi phí khác giữ nguyên, tăng phí làm phần tài xế nhận giảm: mâu thuẫn phân phối. Hai bên vẫn cùng cần khách hàng và dịch vụ phát triển: mặt thống nhất. Mâu thuẫn lợi ích không tự chứng minh vi phạm.', 'Thống nhất và mâu thuẫn'),
    choice('Doanh thu phí tăng nên tổng giá trị dịch vụ tạo ra cũng tăng.', 0, 'Tăng phần phí trong cùng giá chuyến là thay đổi phân chia, chưa chứng minh tạo thêm giá trị. Cần phân biệt phân phối kết quả với tăng năng suất hoặc tăng lượng dịch vụ.', 'Tạo giá trị và phân phối'),
    choice('Tài xế nhận ít hơn, nên cần ưu tiên xem lại mức phí trước.', 20, 'Đã thấy tác động trực tiếp đến tài xế. Để phân tích đầy đủ còn cần xét nhu cầu bù chi phí nền tảng, khả năng hợp tác và lợi ích khách hàng.', 'Phân tích nhiều chủ thể'),
  ], secret: { x: '75%', y: '40%', title: 'Gợi ý phân tích', content: 'Thu nhập ròng phải xét sau chi phí. Phí nền tảng là khoản thu, chưa phải lợi nhuận.' } },
  { id: 3, act: 'TÌNH HUỐNG 03', title: 'Khách hàng trả thêm', image: visualAssets.customer, imagePosition: 'right center', context: 'GIẢ ĐỊNH: nền tảng giảm phí tài xế nhưng tăng giá khách hàng trả. Chưa có dữ liệu mới về lượng chuyến và chất lượng.', character: { name: 'Khách hàng', portrait: 'friend_rich', side: 'left', pitch: 1, rate: 1 }, dialogue: 'Cần đánh giá thế nào trước khi coi đây là phương án hài hòa lợi ích?', choices: [
    choice('So sánh thu nhập ròng, giá, lượng chuyến và chất lượng của các bên.', 50, 'Giảm phí có thể có lợi trên mỗi chuyến, nhưng tăng giá có thể làm nhu cầu giảm. Hài hòa phải xem xét cả tài xế, nền tảng và khách hàng, không chỉ chuyển chi phí.', 'Hài hòa quan hệ lợi ích'),
    choice('Ưu tiên so sánh phần tài xế nhận trên mỗi chuyến trước và sau.', 20, 'Đây là chỉ tiêu cần thiết, nhưng chưa phản ánh lượng chuyến, thời gian chờ hay khả năng tiếp cận của khách hàng. Cần mở rộng đánh giá.', 'Lợi ích cá nhân trong quan hệ xã hội'),
    choice('Nếu nền tảng giữ doanh thu phí và tài xế nhận thêm thì đã hài hòa.', 0, 'Tiêu chí này bỏ sót khách hàng và tác động của giá đến lượng chuyến. Hai bên được lợi trong tính toán mỗi chuyến chưa đủ để kết luận hài hòa toàn bộ.', 'Thống nhất và mâu thuẫn'),
  ] },
  { id: 2, act: 'TÌNH HUỐNG 02', title: 'Doanh nghiệp nền tảng', image: visualAssets.platform, imagePosition: 'center', context: 'GIẢ ĐỊNH: doanh nghiệp nền tảng bàn cách triển khai yêu cầu minh bạch giá và khoản khấu trừ do cơ quan quản lý đang xem xét. Đây là mô phỏng, không phải quyết định đã ban hành.', character: { name: 'Người tham gia đối thoại', portrait: 'friend_hometown', side: 'right', pitch: 1, rate: 1 }, dialogue: 'Đánh giá nào phù hợp về lợi ích và chi phí của yêu cầu minh bạch?', choices: [
    choice('Giúp đối soát và thương lượng, nhưng cần cân nhắc chi phí tuân thủ.', 50, 'Thông tin rõ giúp các bên kiểm tra lợi ích và đối thoại có căn cứ. Doanh nghiệp phải đầu tư hệ thống; mâu thuẫn phân phối vẫn có thể tồn tại. Cần quy định tương xứng.', 'Điều kiện hài hòa lợi ích'),
    choice('Nếu công thức đã công khai, mức phí đó có thể coi là công bằng.', 0, 'Minh bạch giúp biết cách tính nhưng chưa chứng minh phân phối hợp lý. Còn cần đánh giá đóng góp, chi phí, điều kiện hợp tác và tác động thực tế.', 'Minh bạch và phân phối hợp lý'),
    choice('Nên đánh giá trước mức độ tài xế dễ hiểu và kiểm tra các khoản trừ.', 20, 'Đây là lợi ích quan trọng của minh bạch. Phân tích vẫn cần thêm quyền lợi khách hàng, chi phí của nền tảng và hiệu quả giám sát.', 'Lợi ích cá nhân, nhóm và xã hội'),
  ] },
  { id: 4, act: 'TÌNH HUỐNG 04', title: 'Khởi nghiệp sinh viên', image: visualAssets.students, imagePosition: 'center', context: 'GIẢ ĐỊNH: nhóm sinh viên FPT xây WeDo để làm việc nhóm. Nhóm cần doanh thu duy trì sản phẩm và muốn sinh viên tiếp cận được.', character: { name: 'Bạn đồng sáng lập', portrait: 'friend_rich', side: 'left', pitch: 1, rate: 1 }, dialogue: 'Phương án nào cân nhắc đầy đủ hơn lợi ích của nhóm và người dùng?', choices: [
    choice('Thử gói cơ bản dễ tiếp cận, gói trả phí có giá trị; theo dõi chi phí và chất lượng.', 50, 'Kết hợp nguồn thu, khả năng tiếp cận và tái đầu tư tạo cơ sở cho lợi ích nhiều bên. Cần kiểm chứng nhu cầu, chi phí và khả năng trả tiền; không bảo đảm mô hình chắc chắn thành công.', 'Lợi ích cá nhân, nhóm và xã hội'),
    choice('Thử miễn phí toàn bộ để tăng người dùng, theo dõi mức độ sử dụng trước.', 20, 'Có chú ý đến khả năng tiếp cận, nhưng chưa làm rõ nguồn lực bảo mật, máy chủ và hỗ trợ. Lợi ích người dùng khó bền vững nếu thiếu điều kiện vật chất duy trì.', 'Lợi ích trước mắt và lâu dài'),
    choice('Chọn gói có doanh thu thử nghiệm cao nhất vì đó là đủ để đánh giá lợi ích chung.', 0, 'Doanh thu phản ánh một phía và chưa trừ chi phí. Cần xét chất lượng, người dùng, khả năng duy trì và tác động dài hạn trước khi đánh giá lợi ích chung.', 'Lợi ích kinh tế và trách nhiệm xã hội'),
  ] },
];
scenarios.sort((a, b) => a.id - b.id);
