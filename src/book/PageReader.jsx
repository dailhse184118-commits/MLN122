import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { pageAtom, pages } from './UI';

export function getVisibleFaces(page) {
  if (page === 0) return [pages[0].front];
  if (page === pages.length) return [pages.at(-1).back];
  return [pages[page - 1].back, pages[page].front];
}

export default function PageReader({ onClose }) {
  const [page, setPage] = useAtom(pageAtom);
  const dialog = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector('button')?.focus();
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  const onKey = event => {
    if (event.key === 'Escape') onClose();
    if (event.key !== 'Tab') return;
    const buttons = [...dialog.current.querySelectorAll('button:not(:disabled)')];
    const first = buttons[0], last = buttons.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return <div ref={dialog} className="book-reader" role="dialog" aria-modal="true" aria-labelledby="reader-title" onKeyDown={onKey}>
    <div className="book-reader-toolbar">
      <h2 id="reader-title">Đọc bản lớn · {page === 0 ? 'Bìa trước' : page === 6 ? 'Bìa sau' : `Cặp trang ${page}/5`}</h2>
      <div><button onClick={onClose}>Về sách 3D</button><button disabled={page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>Trang trước</button><button disabled={page === pages.length} onClick={() => setPage(p => Math.min(pages.length, p + 1))}>Trang sau</button></div>
    </div>
    <p className="book-summary-note">Tóm tắt học tập do sinh viên biên soạn; không phải bản sao chính thức của giáo trình.</p>
    <div className="book-reader-pages">{getVisibleFaces(page).map(face => <img key={face} src={`/textures/${face}.png`} alt={`Trang tóm tắt MLN122: ${face}`} width="1536" height="2048" />)}</div>
  </div>;
}
