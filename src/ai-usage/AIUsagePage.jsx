import React from 'react';
import { references } from '../content/mln122';

const SOURCES = [
  { title: references[3].title, type: 'Tài liệu đối chiếu từ đại học', detail: references[3].note, url: references[3].url },
  { title: references[2].title, type: 'Bản đối chiếu thuật ngữ', detail: references[2].note, url: references[2].url },
  { title:'Giáo trình Kinh tế chính trị Mác – Lênin (2021)', type:'Cơ sở lý luận', detail:references[0].note, url:references[0].url },
  { title:'Ủy ban Cạnh tranh Quốc gia (11/09/2026)', type:'Nguồn thực tiễn chính thức', detail:'Thông báo về việc rà soát, xác minh phản ánh liên quan đến chính sách giá cước, phí, chiết khấu và các khoản khấu trừ áp dụng đối với đối tác tài xế Grab.', url:'https://vcc.gov.vn/default.aspx?category_id=e0904ba0-4694-4595-9f66-dc2df621842a&do=detail&id=f73009a6-f838-4d43-9535-911c7e85ea9e&page=news' },
  { title:'Nhóm sinh viên – phân tích và đề xuất', type:'Nhận định, không phải kết luận điều tra', detail:'Bốn chủ thể lợi ích, khung phân tích mâu thuẫn, đề xuất đối thoại và tình huống game mô phỏng là nội dung vận dụng học thuật; không phải thông tin chính thức về quyết định của Grab.', url:null }
];

export const AIUsagePage = () => (
  <div className="ai-usage-page w-full min-h-screen bg-[#0d0705] text-[#ede6d6] pt-32 pb-24 px-6 md:px-12 relative overflow-y-auto flex justify-center">
    <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1a120d] to-transparent opacity-50 pointer-events-none" />
    <div className="max-w-[1000px] w-full relative z-10">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4">
        <span className="section-label text-[#c9922a] mb-4 tracking-[0.2em] block uppercase font-['Be_Vietnam_Pro'] text-xs font-semibold">PHỤ LỤC · MLN122 · 5.3.1</span>
        <h1 className="font-['Noto_Serif'] text-4xl md:text-5xl font-medium tracking-wide mb-6">Nguồn &amp; Minh Bạch Học Thuật</h1>
        <div className="w-24 h-[1px] bg-[#c9922a] mx-auto opacity-40" />
        <p className="mt-6 text-[#a39481] font-['Be_Vietnam_Pro'] font-normal max-w-2xl mx-auto leading-relaxed">Phân biệt giữa kiến thức từ giáo trình, sự kiện được cơ quan chức năng công bố và nhận định học thuật của nhóm trong tình huống Grab – đối tác tài xế.</p>
      </div>
      <div className="grid grid-cols-1 gap-12">
        <section className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[20px] p-8 md:p-12 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
          <h2 className="font-['Noto_Serif'] text-2xl tracking-wider mb-7">1. Phạm Vi &amp; Phương Pháp</h2>
          <div className="space-y-6 font-['Be_Vietnam_Pro'] text-[#b8a996] leading-relaxed">
            <p><strong className="text-[#ede6d6]">Lý luận:</strong> Giải thích lợi ích kinh tế; quan hệ lợi ích; mặt thống nhất và mâu thuẫn; những yếu tố ảnh hưởng trong khuôn khổ mục 5.3.1.</p>
            <p><strong className="text-[#ede6d6]">Sự kiện:</strong> Tính đến tư liệu trích dẫn ngày 11/09/2026, việc rà soát và xác minh phản ánh là bước thu thập thông tin. <strong className="text-[#c9922a]">Không được coi đây là kết luận Grab vi phạm.</strong></p>
            <p><strong className="text-[#ede6d6]">Vận dụng:</strong> Các mô hình lợi ích và 4 tình huống trong game là tình huống giả định nhằm minh họa nguyên lý, không phải số liệu hay chính sách xác nhận của doanh nghiệp.</p>
          </div>
        </section>
        <section className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[20px] p-8 md:p-12 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
          <h2 className="font-['Noto_Serif'] text-2xl tracking-wider mb-7">2. Sử Dụng AI Có Trách Nhiệm</h2>
          <div className="ai-method-grid grid grid-cols-1 md:grid-cols-3 gap-8 font-['Be_Vietnam_Pro'] text-[#b8a996] leading-relaxed">
            <div><h3 className="text-[#ede6d6] font-medium mb-3">Hỗ trợ soạn nội dung</h3><p className="text-sm">Bản chỉnh sửa có dùng Codex để biên tập nội dung, tra cứu nguồn, sửa mã, sắp chữ texture sách và thực hiện kiểm tra kỹ thuật. Năm ảnh mới (skyline, tài xế, văn phòng, khách hàng, sinh viên) được tạo bằng AI từ tham chiếu người dùng, theo phong cách chụp thật; không phải ảnh tư liệu. Hero và bốn nền game dùng ánh sáng ban ngày; hero được thay theo hướng cân bằng trắng trung tính khoảng 5500K. Phần lớn giao diện và tài nguyên được kế thừa từ nguồn người dùng cung cấp.</p></div>
            <div><h3 className="text-[#ede6d6] font-medium mb-3">Kiểm chứng nguồn</h3><p className="text-sm">Đã đọc thông báo UBCTQG, trang nhà xuất bản và phần lý luận trong bản 2021 đăng lại trên PDFCoffee; đã đọc phần III của bài giảng Chương 5 trên hệ thống Đại học Thương mại để đối chiếu bổ sung. Bản đăng lại có lỗi OCR. Nhóm cần kiểm tra bản in đang dùng; website không gán số trang cho từng diễn giải.</p></div>
            <div><h3 className="text-[#ede6d6] font-medium mb-3">Trách nhiệm sinh viên</h3><p className="text-sm">Sinh viên cần rà soát luận điểm, kiểm tra lý luận và bổ sung các công cụ thực tế đã dùng trước khi nộp. Nguồn gốc, giấy phép của tài nguyên kế thừa chưa được xác minh đầy đủ.</p></div>
          </div>
        </section>
        <section className="pt-8">
          <div className="flex flex-col items-center gap-1 mb-10 text-center"><h2 className="font-['Noto_Serif'] text-3xl tracking-wider">3. Danh Mục Tài Liệu Tham Khảo</h2><span className="text-[#a39481] text-xs italic mt-2">Các liên kết mở trực tiếp đến nguồn</span></div>
          <div className="space-y-6">
            {SOURCES.map((src, idx) => <div key={idx} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.04)] rounded-[16px] p-6 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 md:border-r border-[rgba(255,255,255,0.05)] pr-4"><span className="text-[#c9922a] text-xs">{String(idx+1).padStart(2,'0')} · {src.type}</span><h3 className="font-['Noto_Serif'] text-xl text-[#ede6d6] tracking-wide mt-2">{src.title}</h3></div>
                <div className="md:w-2/3 font-['Be_Vietnam_Pro'] text-[#b8a996] text-sm leading-relaxed"><p className="mb-4">{src.detail}</p>{src.url && <a href={src.url} target="_blank" rel="noreferrer" className="text-[#c9922a] underline underline-offset-4">Xem nguồn gốc ↗</a>}</div>
              </div>
            </div>)}
          </div>
        </section>
      </div>
    </div>
  </div>
);
