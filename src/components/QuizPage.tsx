
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Question } from '../data/types';

interface QuizPageProps {
  questions: Question[];
  onComplete: (answers: number[]) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setSelectedOption(null);
    if (timerActive) {
      setTimeLeft(30);
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleNext();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, timerActive]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(userAnswers);
    }
  };

  const handleSkip = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = -1; // Mark as skipped
    setUserAnswers(newAnswers);
    handleNext();
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="font-medium text-gray-700">질문 {currentQuestionIndex + 1}/{questions.length}</p>
          {timerActive && (
            <div className="flex items-center">
              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white mr-1">
                <span className="text-sm">{timeLeft}</span>
              </div>
              <span className="text-sm">초</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={toggleTimer} className="text-sm">
            {timerActive ? "타이머 끄기" : "타이머 켜기"}
          </Button>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{currentQuestion.question_text}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 bg-gray-200 text-gray-700">
                  {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={handleNext} 
            disabled={selectedOption === null}
            className={`${selectedOption !== null ? 'btn-primary' : 'opacity-50 cursor-not-allowed'} text-lg`}
          >
            {currentQuestionIndex < questions.length - 1 ? "다음" : "결과 확인하기"}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="text-blue-600 hover:text-blue-700"
          >
            이 질문 건너뛰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
