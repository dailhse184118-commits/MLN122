import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { href: '#hero', label: 'Mở Đầu' },
  { href: '#ton-tai', label: 'Lý Thuyết' },
  { href: '#quan-he', label: 'Quan Hệ' },
  { href: '#tinh-huong', label: 'Grab' },
  { href: '#giai-phap', label: 'Giải Pháp' },
  { href: '#sinh-vien', label: 'Sinh Viên' },
  { href: '#quiz', label: 'Tương Tác' },
  { href: '#conclusion', label: 'Kết Luận' },
  { href: '#book', label: 'Sách 3D' },
  { href: '#ai', label: 'Nguồn & AI' },
];

export default function Navbar({ activeTab, onTabChange }) {
  const [active, setActive] = useState('#hero');
  const wrapper = useRef(null);

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const measure = () => document.documentElement.style.setProperty('--nav-clearance', `${Math.ceil(node.getBoundingClientRect().bottom) + 20}px`);
    measure();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    observer?.observe(node);
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    // Only observe scroll if we are on the game tab
    if (activeTab === 'book') {
      setActive('#book');
      return;
    }
    if (activeTab === 'ai') {
      setActive('#ai');
      return;
    }

    const sections = NAV_LINKS.filter(link => !['#book', '#ai'].includes(link.href))
      .map(link => link.href.slice(1))
      .map(id => document.getElementById(id))
      .filter(el => el !== null);
    const updateActive = () => {
      const clearance = wrapper.current ? wrapper.current.getBoundingClientRect().bottom + 28 : 160;
      const current = sections.filter(section => section.getBoundingClientRect().top <= clearance).at(-1);
      setActive(`#${current?.id || 'hero'}`);
    };
    let frame;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [activeTab]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');

    // Switch to Book Tab
    if (id === 'book') {
      if (activeTab !== 'book' && onTabChange) {
        onTabChange('book');
      }
      return;
    }

    // Switch to AI Usage Tab
    if (id === 'ai') {
      if (activeTab !== 'ai' && onTabChange) {
        onTabChange('ai');
      }
      return;
    }

    // Handing clicks to Game Tab sections while currently on another Tab
    if (activeTab !== 'game' && id !== 'book' && id !== 'ai') {
      if (onTabChange) {
        onTabChange(id);
      }
      // App owns mounting and scrolling to the requested hash.
      return;
    }

    // Normal internal scroll within Game Tab
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
      setActive(href);
    }
  };

  const isBook = activeTab === 'book';

  return (
    <div ref={wrapper} className="navbar-theory-wrapper w-full flex justify-center z-[100] fixed pointer-events-none">
      <nav aria-label="Điều hướng thuyết trình" className={`navbar-theory pointer-events-auto ${isBook ? 'nav-mode-book' : ''}`}>
        <a href="#hero" className="navbar-brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="brand-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </span>
          <span>KTCT Mác – Lênin</span>
        </a>

        <ul className="navbar-nav">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'location' : undefined}
                className={active === l.href ? 'active group' : 'group'}
                onClick={(e) => handleNavClick(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
