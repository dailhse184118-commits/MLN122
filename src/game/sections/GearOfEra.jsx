import { useState, useEffect, useRef } from 'react';

/* ═══ CHARACTER PORTRAITS ════════════════════════════ */
const PORTRAITS = {
  minh: '/images/char-minh.png',
  friend_rich: '/images/char-rich.png',
  boss: '/images/char-boss.png',
  friend_hometown: '/images/char-hometown.png',
  boy_que: '/images/boy_que.png',
};

import { scenarios } from '../../content/mln122';
import { createScenarioRun } from '../../content/quiz';

/* ═══ COMPONENTS ══════════════════════════════════════ */

function TransparentSprite({ portraitKey, side, speaking }) {
  const src = PORTRAITS[portraitKey];
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r < 35 && g < 35 && b < 35) data[i+3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  const positioning = side === 'left'
    ? { transform: speaking ? 'translateY(-8px) scale(1.02)' : 'scale(1)' }
    : { transform: speaking ? 'translateY(-8px) scale(1.02)' : 'scale(1)' };

  return (
    <div className="balance-character" aria-hidden="true" style={{
      position: 'relative', bottom: 0, zIndex: speaking ? 100 : 90,
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      filter: speaking ? 'brightness(1.1) drop-shadow(0 0 30px rgba(255,255,255,0.2))' : 'brightness(0.7) grayscale(0.2)',
      ...positioning
    }}>
      <canvas ref={canvasRef} style={{ height: '100%', width: '100%', display: 'block', objectFit: 'contain' }} />
      {speaking && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'gold', color: '#000', padding: '8px 25px', borderRadius: 20,
          fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          animation: 'fadeUp 0.3s ease both', zIndex: 110
        }}>
          ĐANG NÓI...
        </div>
      )}
    </div>
  );
}

function RainEffect() {
  const drops = useRef(Array.from({ length: 150 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2, duration: 0.5 + Math.random() * 0.5, opacity: 0.1 + Math.random() * 0.3
  })));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
      {drops.current.map(d => (
        <div key={d.id} style={{
          position: 'absolute', top: -20, left: `${d.left}%`, width: 1, height: 20,
          background: '#fff', opacity: d.opacity, animation: `rain-fall ${d.duration}s ${d.delay}s linear infinite`
        }} />
      ))}
      <style>{`@keyframes rain-fall { to { transform: translateY(100vh); } }`}</style>
    </div>
  );
}

function ActTransition({ act, title, quote, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <div onClick={onDone} style={{ position: 'absolute', inset: 0, zIndex: 5000, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, cursor: 'pointer' }}>
      <p style={{ color: 'gold', fontSize: 13, fontWeight: 900, letterSpacing: 5, marginBottom: 15, animation: 'fadeUp 0.8s ease both' }}>{act.toUpperCase()}</p>
      <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 30, animation: 'fadeUp 1s 0.2s ease both' }}>{title}</h1>
      <p style={{ fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', maxWidth: 550 }}>{quote}</p>
      <div style={{ position: 'absolute', bottom: 40, fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: 3 }}>CLICK TO SKIP</div>
    </div>
  );
}

function StarField({ driftLevel }) {
  const stars = useRef(Array.from({ length: 120 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: 1 + Math.random() * 2, dur: 5 + Math.random() * 10, delay: Math.random() * 5
  })));
  const starColor = driftLevel > 70 ? 'rgba(255, 50, 50, 0.6)' : driftLevel > 40 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(74, 222, 128, 0.6)';
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {stars.current.map(s => (
        <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: starColor, borderRadius: '50%', boxShadow: `0 0 10px ${starColor}`, animation: `twinkle ${s.dur}s ${s.delay}s infinite alternate` }} />
      ))}
    </div>
  );
}

function SoundControl({ muted, setMuted }) {
  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}>
      <button aria-label={muted ? 'Bật giọng đọc' : 'Tắt giọng đọc'} onClick={() => setMuted(!muted)} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer', width: 45, height: 45 }}>{muted ? '🔇' : '🔊'}</button>
    </div>
  );
}

function ConsciousnessMeter({ level }) {
  return (
    <div className="balance-meter" style={{ position: 'absolute', top: 30, left: 30, width: '220px', zIndex: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 8, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 2 }}>
        <span style={{ color: level < 40 ? '#4ade80' : 'inherit' }}>CÂN BẰNG</span>
        <span style={{ color: level > 70 ? '#f87171' : 'inherit' }}>XUNG ĐỘT</span>
      </div>
      <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ height: '100%', width: `${level}%`, background: `linear-gradient(to right, #4ade80, gold, #f87171)`, transition: 'width 1.5s ease' }} />
      </div>
    </div>
  );
}

/* ═══ MAIN APP ════════════════════════════════════════ */

export default function GearOfEra() {
  const [SCENARIOS, setScenarios] = useState(() => createScenarioRun(scenarios));
  const [history, setHistory] = useState([]);
  const [phase, setPhase] = useState('cinematic');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [counts, setCounts] = useState({ integrity: 0, adaptation: 0, change: 0 });
  const [muted, setMuted] = useState(true);
  const [score, setScore] = useState(0);
  const choiceLocked = useRef(false);
  const timers = useRef([]);
  const schedule = (fn, delay) => { timers.current.push(setTimeout(fn, delay)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const restart = () => {
    timers.current.forEach(clearTimeout); timers.current = []; choiceLocked.current = false;
    window.speechSynthesis?.cancel();
    setIdx(0); setPicked(null); setScore(0); setHistory([]); setScenarios(createScenarioRun(scenarios));
    setCounts({ integrity: 0, adaptation: 0, change: 0 });
    setDriftLevel(50); setAchievement(null); setShowTransition(false);
    setShouldShake(false); setIsGlitching(false); setPhase('rules');
  };
  const [driftLevel, setDriftLevel] = useState(50);
  const [shouldShake, setShouldShake] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showTransition, setShowTransition] = useState(false);

  const actQuotes = {
    1: 'Lợi ích kinh tế là động lực của các chủ thể.',
    2: 'Minh bạch giúp các bên hiểu và thương lượng.',
    3: 'Lợi ích cá nhân cần đặt trong quan hệ xã hội.',
    4: 'Phát triển bền vững cần hài hòa lợi ích.'
  };

  const handleMouseMove = (e) => {
    setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 });
  };

  const ambientRef = useRef(null);
  useEffect(() => {
    if (!muted && SCENARIOS[idx].ambient) {
      if (ambientRef.current) ambientRef.current.pause();
      ambientRef.current = new Audio(SCENARIOS[idx].ambient);
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.3;
      ambientRef.current.play().catch(() => { });
    }
    return () => { if (ambientRef.current) ambientRef.current.pause(); };
  }, [idx, muted, phase]);

  const handleChoice = (i) => {
    if (choiceLocked.current || phase !== 'game' || showTransition) return;
    choiceLocked.current = true;
    const c = SCENARIOS[idx].choices[i];
    setPicked(i);
    setHistory(items => [...items, { title: SCENARIOS[idx].title, answer: c.text, score: c.score, concept: c.concept }]);
    setScore(prev => prev + c.score);
    setCounts(prev => ({ ...prev, [c.type]: prev[c.type] + 1 }));

    if (c.type === 'integrity') {
      setDriftLevel(l => Math.max(0, l - 15));
      setAchievement("🌟 HÀI HÒA LỢI ÍCH");
    }
    if (c.type === 'change') {
      setDriftLevel(l => Math.min(100, l + 20));
      setShouldShake(true); setIsGlitching(true);
      setAchievement("🥀 BẮT ĐẦU XUNG ĐỘT");
      schedule(() => { setShouldShake(false); setIsGlitching(false); }, 500);
    }
    if (c.type === 'adaptation') {
      setDriftLevel(l => Math.min(100, l + 10));
      setAchievement("⚖️ CẦN CÂN NHẮC THÊM");
    }

    schedule(() => { setPhase('result'); setAchievement(null); }, 1200);
  };

  const parallax = { bg: { x: mouse.x * 0.5, y: mouse.y * 0.5 }, sprite: { x: mouse.x * -1, y: mouse.y * -1 } };

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative', width: '100%', background: '#050505', color: '#fff', overflow: 'hidden', fontFamily: "'Be Vietnam Pro', sans-serif" }} className={`balance-game ${shouldShake ? 'shake-effect' : ''} ${driftLevel > 75 ? 'stress-pulse' : ''} ${isGlitching ? 'glitch-active' : ''}`}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.1 } to { opacity: 1 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes shake { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(-5px, 5px); } 50% { transform: translate(5px, -5px); } 75% { transform: translate(-5px, -5px); } }
        .shake-effect { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes heartbeat { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
        .stress-pulse { animation: heartbeat 1s infinite ease-in-out; }
        @keyframes glitch { 0% { transform: translate(0) } 20% { transform: translate(-5px, 5px) skewX(5deg); filter: hue-rotate(90deg); } 40% { transform: translate(5px, -5px) skewY(-5deg); filter: hue-rotate(180deg); } 60% { transform: translate(-3px, 3px); filter: brightness(2); } 100% { transform: translate(0) } }
        .glitch-active { animation: glitch 0.3s ease infinite; }
        .bg-blur { filter: blur(10px) brightness(0.4) !important; transition: 1s; }
        .achievement-card { position: absolute; top: 100px; left: 30px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-left: 4px solid gold; padding: 10px 20px; border-radius: 8px; animation: fadeUp 0.5s ease both; z-index: 2000; }
      `}</style>

      <StarField driftLevel={driftLevel} />
      <div className="balance-score" role="status">Tình huống {idx + 1}/4 · {score}/200 điểm</div>
      <SoundControl muted={muted} setMuted={setMuted} />
      {phase === 'game' && !showTransition && <ConsciousnessMeter level={driftLevel} />}
      {showTransition && <ActTransition act={SCENARIOS[idx].act} title={SCENARIOS[idx].title} quote={actQuotes[idx + 1]} onDone={() => setShowTransition(false)} />}
      {achievement && <div className="achievement-card"><span style={{ fontSize: 10, color: 'gold', fontWeight: 900, display: 'block' }}>DANH HIỆU</span><span style={{ fontSize: 14, fontWeight: 900 }}>{achievement}</span></div>}

      <div className="balance-content">
        {phase === 'cinematic' && <Cinematic onDone={() => setPhase('rules')} />}
        {phase === 'rules' && <RulesScreen onStart={() => setPhase('game')} />}
        {phase === 'game' && <GameScreen key={SCENARIOS[idx].id} scenario={SCENARIOS[idx]} onChoice={handleChoice} muted={muted} parallax={parallax} />}
        {phase === 'result' && <ResultScreen choice={SCENARIOS[idx].choices[picked]} onNext={() => { if (idx + 1 < SCENARIOS.length) { choiceLocked.current = false; setIdx(idx + 1); setPhase('game'); setShowTransition(true); } else setPhase('end'); }} />}
        {phase === 'end' && <EndScreen counts={counts} score={score} history={history} onRestart={restart} />}
      </div>
    </div>
  );
}

function Cinematic({ onDone }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = "BALANCE — Mỗi quyết định kinh tế ảnh hưởng tới nhiều chủ thể. Hãy thử cân bằng lợi ích của doanh nghiệp, đối tác tài xế, khách hàng và cộng đồng qua bốn tình huống mô phỏng.";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i++; setDisplayText(fullText.slice(0, i)); if (i >= fullText.length) clearInterval(t); }, 40);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <h1 style={{ fontSize: 60, fontWeight: 900, color: 'gold', marginBottom: 30, letterSpacing: 10, animation: 'fadeUp 1s ease both' }}>BALANCE</h1>
      <p style={{ fontSize: 20, color: '#ccc', maxWidth: 700, fontStyle: 'italic' }}>{displayText}</p>
      {<button onClick={onDone} style={{ marginTop: 40, padding: '18px 60px', background: 'gold', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer' }}>BƯỚC VÀO →</button>}
    </div>
  );
}

function RulesScreen({ onStart }) {
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: 500, background: 'rgba(255,255,255,0.02)', padding: 50, borderRadius: 30, border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ color: 'gold', marginBottom: 20 }}>LUẬT CHƠI</h2>
        <p style={{ color: '#aaa', marginBottom: 30 }}>Bốn tình huống giả định sẽ kiểm tra cách bạn cân bằng lợi ích kinh tế. Các tình huống dùng để học lý luận, không mô tả quyết định cụ thể của Grab.</p><p className="balance-rules-score">Phân tích đầy đủ: 50 điểm · Đúng một phần: 20 điểm · Nhầm khái niệm: 0 điểm. Tối đa 200 điểm. Thanh cân bằng chỉ minh họa phản hồi trò chơi.</p>
        <button onClick={onStart} style={{ padding: '15px 50px', background: 'gold', border: 'none', borderRadius: 10, fontWeight: 900, cursor: 'pointer' }}>BẮT ĐẦU</button>
      </div>
    </div>
  );
}

function GameScreen({ scenario, onChoice, muted, parallax }) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState('context');
  const [displayText, setDisplayText] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);
  const advanceTimer = useRef(null);

  const startDialogue = () => {
    setStep('dialogue');
    setIsTyping(true);
    let i = 0;
    setDisplayText('');

    if (typingTimer.current) clearInterval(typingTimer.current);

    typingTimer.current = setInterval(() => {
      i++;
      setDisplayText(scenario.dialogue.slice(0, i));
      if (i >= scenario.dialogue.length) {
        clearInterval(typingTimer.current);
        setIsTyping(false);
        // Only auto-show choices if not using TTS or if TTS is very short
        advanceTimer.current = setTimeout(() => setStep('choices'), 400);
      }
    }, 40);

    if (!muted && window.speechSynthesis && window.SpeechSynthesisUtterance) {
      window.speechSynthesis?.cancel();
      const ut = new SpeechSynthesisUtterance(scenario.dialogue);
      ut.lang = 'vi-VN';
      ut.pitch = scenario.character.pitch;
      ut.rate = scenario.character.rate;
      ut.onend = ut.onerror = () => {
        clearInterval(typingTimer.current); clearTimeout(advanceTimer.current);
        setDisplayText(scenario.dialogue); setIsTyping(false); setStep('choices');
      };
      window.speechSynthesis.speak(ut);
    }
  };

  const skipTyping = () => {
    if (isTyping) {
      clearInterval(typingTimer.current);
      clearTimeout(advanceTimer.current); window.speechSynthesis?.cancel();
      setDisplayText(scenario.dialogue);
      setIsTyping(false);
      setStep('choices');
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
      clearTimeout(advanceTimer.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => { if (muted) window.speechSynthesis?.cancel(); }, [muted]);

  return (
    <div className="balance-scene" style={{ position: 'relative' }} onClick={step === 'dialogue' ? skipTyping : null}>
      {scenario.weather === 'rain' && <RainEffect />}
      <div className="balance-scene-bg" aria-hidden="true" style={{ position: 'absolute', inset: '-50px', backgroundImage: `url(${scenario.image})`, backgroundSize: 'cover', backgroundPosition: scenario.imagePosition || 'center', filter: step === 'choices' ? 'blur(3px) brightness(0.48)' : 'brightness(0.62)', transform: `translate(${parallax.bg.x}px, ${parallax.bg.y}px)`, transition: 'all 1s' }} />
      {step === 'context' && (
        <div className="balance-context" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
          <div style={{ maxWidth: 600, textAlign: 'center', animation: 'fadeUp 1s ease' }}>
            <h2 style={{ color: 'gold', marginBottom: 20 }}>{scenario.title}</h2>
            <p style={{ lineHeight: 1.8, marginBottom: 40 }}>{scenario.context}</p>
            <button onClick={startDialogue} style={{ padding: '15px 50px', background: 'gold', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer' }}>TIẾP TỤC</button>
          </div>
        </div>
      )}

      {(step === 'dialogue' || step === 'choices') && (
        <div className="balance-stage">
          <div className="balance-cast balance-cast-left" style={{ transform: `translateY(${parallax.sprite.y * 0.25}px)` }}>
            <TransparentSprite portraitKey={scenario.character.side === 'left' ? scenario.character.portrait : 'minh'} side="left" speaking={scenario.character.side === 'left' ? step === 'dialogue' : step === 'choices'} />
          </div>
          <div className="balance-cast balance-cast-right" style={{ transform: `translateY(${parallax.sprite.y * 0.25}px)` }}>
            <TransparentSprite portraitKey={scenario.character.side === 'right' ? scenario.character.portrait : 'minh'} side="right" speaking={scenario.character.side === 'right' ? step === 'dialogue' : step === 'choices'} />
          </div>
          <div className="balance-dialogue">
            <div className="balance-question" style={{ maxWidth: 800, textAlign: 'center', marginBottom: step === 'choices' ? 30 : 50 }}>
              <p style={{ color: 'gold', fontSize: 12, fontWeight: 900, marginBottom: 5 }}>{scenario.character.name}:</p>
              <p className="balance-question-text" style={{ fontWeight: 600 }}>{displayText}</p>
              {step === 'dialogue' && <button onClick={skipTyping} className="balance-skip">Hiện lựa chọn ngay</button>}
            </div>
            {step === 'choices' && (
              <div className="balance-choices">
                {scenario.choices.map((c, i) => (
                  <button key={c.text} disabled={submitted} onClick={() => { if (submitted) return; setSubmitted(true); onChoice(i); }} style={{ padding: '15px 25px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 15, color: '#fff', cursor: 'pointer', textAlign: 'left' }}><span className="balance-choice-label" aria-hidden="true">{c.label}</span>{c.text}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {scenario.secret && step === 'dialogue' && (
        <button aria-label="Mở gợi ý lý thuyết" onClick={e => { e.stopPropagation(); setShowSecret(true); }} style={{ position: 'relative', zIndex: 150, width: 44, height: 44, background: 'gold', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px gold' }} />
      )}

      {showSecret && (
        <div onClick={() => setShowSecret(false)} style={{ position: 'absolute', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
          <div style={{ maxWidth: 400, border: '1px solid gold', padding: 30, borderRadius: 20 }}>
            <h3 style={{ color: 'gold', marginBottom: 15 }}>{scenario.secret.title}</h3>
            <p>{scenario.secret.content}</p><button onClick={() => setShowSecret(false)} className="balance-skip">Đóng gợi ý</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultScreen({ choice, onNext }) {
  return (
    <div className="balance-result" role="status" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'rgba(0,0,0,0.95)' }}>
      <div style={{ maxWidth: 600, padding: 40 }}>
        <h2 style={{ color: 'gold', marginBottom: 20 }}>{choice.resultTitle}</h2>
        <p style={{ color: 'gold', marginBottom: 15 }}>{choice.concept} · +{choice.score} điểm</p>
        <p style={{ marginBottom: 40, lineHeight: 1.6 }}>{choice.result}</p>
        <button onClick={onNext} style={{ padding: '15px 50px', background: '#fff', color: '#000', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer' }}>TIẾP TỤC</button>
      </div>
    </div>
  );
}

function EndScreen({ counts, score, history, onRestart }) {
  let title = '🌟 NHẬN DIỆN TỐT CÁC LỢI ÍCH';
  let message = 'Bạn cân nhắc thu nhập, lợi nhuận, lợi ích khách hàng và tác động xã hội trước khi ra quyết định. Đây là tư duy phù hợp với phát triển bền vững.';
  let card = 'Quan hệ lợi ích kinh tế vừa thống nhất vừa mâu thuẫn. Đối thoại, minh bạch và cơ chế điều tiết giúp tạo nền tảng hợp tác dài hạn.';
  let color = '#4ade80';

  if (counts.adaptation + counts.change >= 3) {
    title = '⚠️ LỢI ÍCH DỄ XUNG ĐỘT';
    message = 'Nhiều lựa chọn tập trung vào lợi ích một phía. Hãy thử cân nhắc thêm tác động tới người lao động, doanh nghiệp, khách hàng và cộng đồng.';
    card = 'Khi một bên tối đa hóa lợi ích mà không xét đến các quan hệ xã hội, sự mâu thuẫn có thể gia tăng, làm suy giảm hợp tác và hiệu quả chung.';
    color = '#f87171';
  } else if (counts.integrity < 3) {
    title = '⚖️ CẦN THÊM GÓC NHÌN';
    message = 'Bạn đã nhìn thấy một số xung đột nhưng vẫn có quyết định bỏ sót lợi ích của chủ thể khác. Hãy thử phân tích cả hệ thống.';
    card = 'Hài hòa không đồng nghĩa chia đều. Cần đánh giá lợi ích chính đáng, đóng góp, chi phí, khả năng thương lượng và tính bền vững.';
    color = 'gold';
  }

  return (
    <div className="balance-end" style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', background:'radial-gradient(circle, #1a1a1a 0%, #000 100%)', overflowY:'auto' }}>
      <div style={{ animation:'fadeUp 1s ease both', maxWidth:800, padding:40 }}>
        <p role="status" style={{ color: 'gold', marginBottom: 20 }}>Điểm học tập: {score}/200 · {counts.integrity}/4 lựa chọn phù hợp</p>
        <h2 style={{ fontSize:22, color:'#9ca3af', marginBottom:20, letterSpacing:4 }}>KẾT QUẢ RA QUYẾT ĐỊNH</h2>
        <div style={{ fontSize:40, fontWeight:900, color, textShadow:`0 0 40px ${color}33`, lineHeight:1.2, marginBottom:30 }}>{title}</div>
        <p style={{ fontSize:20, lineHeight:1.8, color:'#d1d5db', marginBottom:30, background:'rgba(255,255,255,0.03)', padding:25, borderRadius:20 }}>{message}</p>
        <div className="marx-card" style={{ padding:30, textAlign:'left', borderLeft:`8px solid ${color}`, background:'rgba(0,0,0,0.5)', marginBottom:30 }}>
          <p style={{ color:'gold', fontWeight:900, fontSize:13, marginBottom:15, letterSpacing:2 }}>📚 LIÊN HỆ LÝ LUẬN MLN122</p>
          <p style={{ fontSize:17, lineHeight:1.6, color:'#fff' }}>{card}</p>
        </div>
        <ol className="balance-history" aria-label="Lựa chọn của bạn">{history.map((entry, i) => <li key={entry.title}><strong>{i + 1}. {entry.title} · +{entry.score} điểm</strong><span>{entry.answer}</span><small>{entry.concept}</small></li>)}</ol>
        <button onClick={onRestart} style={{ padding:'16px 65px', background:'gold', color:'#000', border:'none', borderRadius:50, fontWeight:900, cursor:'pointer', fontSize:18 }}>CHƠI LẠI</button>
      </div>
    </div>
  );
}
