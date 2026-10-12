import React, { useState, useRef } from 'react';

import { createQuiz } from '../../content/quiz';

export default function QuizGame() {
  const [QUESTIONS, setQuestions] = useState(createQuiz);
  const answerLock = useRef(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index) => {
    if (answerLock.current) return;
    answerLock.current = true;
    setSelectedOption(index);
    setIsAnswered(true);
    if (QUESTIONS[currentQuestion].options[index].correct) {
      setScore(value => value + 1);
    }
  };

  const handleNext = () => {
    if (!answerLock.current) return;
    answerLock.current = false;
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QUESTIONS.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(createQuiz());
    answerLock.current = false;
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="quiz-container reveal visible">
        <div className="quiz-result">
          <div className="result-icon">🏆</div>
          <h2>Hoàn thành Quiz!</h2>
          <p className="result-score">
            Bạn đã trả lời đúng <strong>{score}</strong>/<strong>{QUESTIONS.length}</strong> câu hỏi.
          </p>
          <div className="result-rank">
            {score === QUESTIONS.length ? "Nắm vững tình huống 🎓" : score >= 2 ? "Học giả Ưu tú 📖" : "Cần cố gắng thêm 💪"}
          </div>
          <button className="quiz-btn" onClick={restartQuiz}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentQuestion];

  return (
    <div className="quiz-container reveal visible">
      <div className="quiz-header">
        <span className="quiz-progress">Câu hỏi {currentQuestion + 1} / {QUESTIONS.length}</span>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="quiz-question-box">
        <h3>{q.question}</h3>
        <div className="options-grid">
          {q.options.map((option, index) => {
            let className = "option-card";
            if (isAnswered) {
              if (q.options[index].correct) className += " correct";
              else if (index === selectedOption) className += " incorrect";
              else className += " disabled";
            } else if (index === selectedOption) {
              className += " selected";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="quiz-feedback animate-in fade-in" role="status">
          <p className="explanation">
            <strong>{q.options[selectedOption].correct ? "✅ Chính xác!" : "❌ Chưa đúng!"}</strong> {q.options[selectedOption].explanation}
          </p>
          <button className="quiz-btn next" onClick={handleNext}>
            {currentQuestion === QUESTIONS.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        </div>
      )}
    </div>
  );
}
