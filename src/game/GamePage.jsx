import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import TonTai from './sections/TonTaiXaHoi';
import GearOfEra from './sections/GearOfEra';
import Conclusion from './sections/Conclusion';
import QuizGame from './sections/QuizGame';
import ExpandCard from '../components/ExpandCard';

import useScrollReveal from '../hooks/useScrollReveal';

export const GamePage = () => {
  useScrollReveal();

  return (
    <div className="theory-page-container" style={{ width: '100%', minHeight: '100vh', scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>{`.theory-page-container::-webkit-scrollbar { display: none; }`}</style>
      <Hero />


      <TonTai />
       <section id="quiz">
      <div className="page-section"><div className="section-header reveal"><span className="section-label">07 — Hoạt động tương tác</span><h2>Bốn tình huống, nhiều lợi ích</h2><p>Ôn bốn khái niệm qua quiz, rồi cùng Minh phân tích lợi ích của các bên trong game.</p></div><ExpandCard title="Ôn nhanh: bốn câu hỏi MLN201"><QuizGame /></ExpandCard></div>
      <GearOfEra />
       </section>
      <Conclusion />


    </div>
  );
};
