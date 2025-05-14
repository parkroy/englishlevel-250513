
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Question } from '../data/types';
import { useToast } from '../hooks/use-toast';
import { Timer } from 'lucide-react';

interface QuizPageProps {
  questions: Question[];
  onComplete: (answers: number[]) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(true);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setSelectedOption(null);
    setShowTimeoutAlert(false);
    if (timerActive) {
      setTimeLeft(20);
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setShowTimeoutAlert(true);
            toast({
              title: "시간 초과!",
              description: "다음 문제로 넘어갑니다.",
              variant: "destructive",
            });
            // Give user a brief moment to see the timeout message before moving on
            setTimeout(() => {
              handleNext();
              setShowTimeoutAlert(false);
            }, 1500);
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

  // Set timer circle color based on time remaining
  const getTimerColor = () => {
    if (timeLeft <= 5) {
      // Pulsing red for last 5 seconds
      return 'animate-pulse bg-red-500';
    }
    if (timeLeft <= 10) {
      // Calculate a gradient from yellow to red as time decreases from 10 to 0
      const redIntensity = 255; // Red stays at 255
      const greenIntensity = Math.round((timeLeft / 10) * 255); // Green goes from 255 to 0
      return `bg-[rgb(${redIntensity},${greenIntensity},0)]`;
    }
    return 'bg-primary'; // Default color (primary)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg relative">
        {showTimeoutAlert && (
          <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center z-10 animate-fade-in">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-2xl font-bold text-red-500 mb-2">시간 초과!</p>
              <p className="text-gray-700">다음 문제로 넘어갑니다.</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <p className="font-medium text-gray-700">문제 {currentQuestionIndex + 1}/{questions.length}</p>
          {timerActive && (
            <div className="flex items-center">
              <div 
                className={`flex h-6 w-6 items-center justify-center rounded-full text-white mr-1 transition-colors duration-300 ${getTimerColor()}`}
              >
                <span className="text-sm">{timeLeft}</span>
              </div>
              <span className="text-sm">초</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={toggleTimer} className="text-sm">
            {timerActive ? (
              <span className="flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                타이머 끄기
              </span>
            ) : (
              <span className="flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                타이머 켜기
              </span>
            )}
          </Button>
        </div>
        
        {/* Step Indicators */}
        <div className="mb-6 flex justify-between">
          {questions.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentQuestionIndex 
                  ? 'bg-primary scale-125' 
                  : index < currentQuestionIndex 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="progress-bar mb-4">
          <div 
            className="progress-fill transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mb-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">{currentQuestion.question_text}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`quiz-option transform transition-all duration-200 ${
                  selectedOption === index ? 'selected scale-[1.02]' : ''
                } hover:scale-[1.01]`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  selectedOption === index ? 'bg-white text-primary' : 'bg-gray-200 text-gray-700'
                }`}>
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
            className={`${selectedOption !== null ? 'btn-primary hover:scale-[1.02] active:scale-100 transition-transform' : 'opacity-50 cursor-not-allowed'} text-lg`}
          >
            {currentQuestionIndex < questions.length - 1 ? "다음" : "결과 확인하기"}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            이 문제 건너뛰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
