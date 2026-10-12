import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import PageReader from './PageReader';
import { getIllustrationTheme } from './illustrationThemes';

// ── State atoms ──
export const pageAtom = atom(0);
export const viewModeAtom = atom("reading"); // "showcase" | "reading"

export const pages = [
  { front: "Coverpage_open", back: "Open 1" },
  { front: "Open 2", back: "46_Page_1" },
  { front: "46_Page_2", back: "47_Page_1" },
  { front: "47_Page_2", back: "48_Page_1" },
  { front: "48_Page_2", back: "Close 1" },
  { front: "Close 2", back: "Coverpage_close" },
];

const pageLabels = [
  "Bìa", "Khái niệm", "Quan hệ", "Hai mặt", "Grab & giải pháp", "Sinh viên", "Bìa sau",
];

const pageTitles = [
  null,
  "Khái quát — Lợi ích kinh tế",
  "Quan hệ — Các chủ thể và yếu tố tác động",
  "Hai mặt — Thống nhất và mâu thuẫn",
  "Thực tiễn — Grab và giải pháp",
  "Vận dụng — Sinh viên và tổng kết",
  null,
];

/* ── SVG Icons (no emoji, no external lib) ── */
const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [readerOpen, setReaderOpen] = useState(false);
  const header = useRef(null);

  useEffect(() => {
    const node = header.current;
    if (!node) return;
    const measure = () => document.documentElement.style.setProperty('--book-top-clearance', `${Math.ceil(node.getBoundingClientRect().bottom) + 12}px`);
    measure();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    observer?.observe(node);
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure); };
  }, [page]);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play().catch(() => {});
  }, [page]);

  useEffect(() => {
    const onKey = e => {
      if (readerOpen || e.target.closest('button, a, input, textarea, select')) return;
      if (e.key === 'ArrowRight') setPage(p => Math.min(pages.length, p + 1));
      if (e.key === 'ArrowLeft') setPage(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setPage, readerOpen]);

  const totalPages = pages.length + 1; // includes "bia sau"
  const progress = ((page) / (totalPages - 1)) * 100;
  const currentTitle = pageTitles[page] || null;

  return (
    <>
      {/* ── Animated Mesh Gradient Background ── */}

      <div className="center-spotlight" />

      {/* Noise + Vignette overlays */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />

      <main aria-hidden={readerOpen || undefined} className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        {/* ── Header ── */}
        <div ref={header} className="book-header pointer-events-auto flex items-center justify-between px-8 pt-24">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: '#C5272D' }}
            >
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'Noto Serif, serif' }}>M</span>
            </div>
            <div>
              <h1
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ fontFamily: 'Noto Serif, serif', color: '#1A1A1A' }}
              >
                Kinh tế chính trị
              </h1>
              <p className="book-topic uppercase">
                Lợi ích kinh tế & Quan hệ lợi ích
              </p>
            </div>
          </div>

          {/* Page eyebrow title */}
          <div className="flex items-center gap-4">
            {currentTitle && (
              <div className="page-eyebrow hidden md:block">
                <span className="accent">{String(page).padStart(2, '0')}</span>
                <span style={{ margin: '0 6px', opacity: 0.3 }}>|</span>
                {currentTitle}
                <p className="book-illustration-label">Minh họa: {getIllustrationTheme(page)?.label}</p>
              </div>
            )}
            <div className="text-right hidden sm:block">
              <p className="book-chapter uppercase">
                Chương V · 5.3.1
              </p>
            </div>
          </div>
        </div>

        {/* ── Side Navigation Arrows ── */}
        <div className="pointer-events-auto flex items-center justify-between px-4 absolute top-1/2 left-0 right-0 -translate-y-1/2">
          <button
            className="view-toggle"
            aria-label="Trang trước"
            disabled={page === 0}
            style={{
              padding: '10px',
              opacity: page > 0 ? 1 : 0.3,
              pointerEvents: page > 0 ? 'auto' : 'none',
            }}
            onClick={() => setPage(Math.max(0, page - 1))}
          >
            <ChevronLeft />
          </button>
          <button
            className="view-toggle"
            aria-label="Trang sau"
            disabled={page === pages.length}
            style={{
              padding: '10px',
              opacity: page < totalPages - 1 ? 1 : 0.3,
              pointerEvents: page < totalPages - 1 ? 'auto' : 'none',
            }}
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          >
            <ChevronRight />
          </button>
        </div>

        {/* ── Bottom: Floating Nav Island ── */}
        <div className="book-footer w-full pointer-events-auto flex flex-col items-center justify-center">
          <div className="book-nav rounded-full px-2 py-2 flex flex-col items-center gap-0" style={{ maxWidth: '90vw' }}>

            {/* Nav buttons */}
            <div className="flex items-center gap-1 overflow-x-auto px-1">
              {[...pages].map((_, index) => (
                <button
                  key={index}
                  className={`book-nav-btn shrink-0 ${index === page ? 'active' : ''}`}
                  onClick={() => setPage(index)}
                >
                  {pageLabels[index]}
                </button>
              ))}
              <button
                className={`book-nav-btn shrink-0 ${page === pages.length ? 'active' : ''}`}
                onClick={() => setPage(pages.length)}
              >
                {pageLabels[pages.length]}
              </button>
            </div>
          </div>
          <p className="book-summary-note">Tóm tắt học tập do sinh viên biên soạn · Không phải bản sao chính thức của giáo trình.</p>
        </div>
      </main>

      {/* ── View Mode Toggle (fixed bottom-right) ── */}
      <div className="book-view-actions">
      <button className="view-toggle" onClick={() => setReaderOpen(true)}>Đọc bản lớn</button>
      <button
        className={`view-toggle ${viewMode === 'reading' ? 'active' : ''}`}
        onClick={() => setViewMode(viewMode === 'showcase' ? 'reading' : 'showcase')}
      >
        {viewMode === 'showcase' ? <BookIcon /> : <CubeIcon />}
        <span>{viewMode === 'showcase' ? 'Đọc sách' : '3D View'}</span>
      </button>
      </div>
      {readerOpen && <PageReader onClose={() => setReaderOpen(false)} />}


    </>
  );
};
