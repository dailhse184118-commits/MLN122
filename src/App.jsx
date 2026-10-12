import { useState, useEffect, lazy, Suspense } from "react";
const BookPage = lazy(() => import("./book/BookPage").then(m => ({ default: m.BookPage })));
import { GamePage } from "./game/GamePage";
const AIUsagePage = lazy(() => import("./ai-usage/AIUsagePage").then(m => ({ default: m.AIUsagePage })));
import Navbar from "./game/sections/Navbar";

const TABS = [
  { id: "book", label: "Sách 3D" },
  { id: "game", label: "Bài thuyết trình" },
  { id: "ai", label: "Nguồn & AI" },
];

function getActiveTab() {
  const hash = window.location.hash.replace("#", "");
  const path = window.location.pathname.replace("/", "");
  const from = TABS.find(t => t.id === (hash || path));
  return from ? from.id : "game";
}

function App() {
  const [activeTab, setActiveTab] = useState(getActiveTab);
  const [hasVisitedBook, setHasVisitedBook] = useState(false);

  // React to browser back/forward and hash changes
  useEffect(() => {
    const onNav = () => {
      const tab = getActiveTab();
      setActiveTab(tab);
      if (tab === 'game') requestAnimationFrame(() => {
        document.getElementById(window.location.hash.slice(1) || 'hero')?.scrollIntoView({ block: 'start' });
      });
    };
    window.addEventListener("hashchange", onNav);
    window.addEventListener("popstate", onNav);
    return () => {
      window.removeEventListener("hashchange", onNav);
      window.removeEventListener("popstate", onNav);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeTab !== 'game') { window.scrollTo(0, 0); return; }
      const id = window.location.hash.slice(1);
      const target = document.getElementById(id === 'game' || !id ? 'hero' : id);
      target?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);

  const handleTabChange = (id) => {

    setActiveTab(id === 'book' || id === 'ai' ? id : 'game');
    window.location.hash = id;
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      {/* Tab Content */}
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Suspense fallback={<div className="mln-loading" role="status">Đang mở nội dung</div>}>
        {activeTab === "book" && <BookPage skipIntro={hasVisitedBook} onEntered={() => setHasVisitedBook(true)} />}
        {activeTab === "game" && <GamePage />}
        {activeTab === "ai" && <AIUsagePage />}
        </Suspense>
      </div>
    </div>
  );
}


export default App;
