
import React, { useState, useEffect } from 'react';
import StartPage from '../components/StartPage';
import QuizPage from '../components/QuizPage';
import ResultPage from '../components/ResultPage';
import { User, QuizAttempt, Question } from '../data/types';
import { getRandomQuestions, getResultLevel, getMockAnalysis, badges } from '../data/mockData';

// App state type
type AppState = 'start' | 'quiz' | 'result';

const Index = () => {
  // App state
  const [appState, setAppState] = useState<AppState>('start');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [userCount, setUserCount] = useState(238); // Mock user count, would be from database in real implementation

  // Handle start of quiz
  const handleStartQuiz = (email: string, selfAssessedLevel: string | null) => {
    // Create user or load existing
    const user: User = {
      email,
      self_assessed_level: selfAssessedLevel || undefined,
      result_history: [],
      badges_earned: [],
      email_consent: true
    };
    
    setCurrentUser(user);
    
    // Get random questions
    const questions = getRandomQuestions(7);
    setQuizQuestions(questions);
    
    // Move to quiz state
    setAppState('quiz');
  };

  // Handle quiz completion
  const handleQuizComplete = (answers: number[]) => {
    if (!currentUser || quizQuestions.length === 0) return;
    
    // Calculate score
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (answers[i] === quizQuestions[i].correct_option_index) {
        score++;
      }
    }
    
    // Create attempt record
    const attempt: QuizAttempt = {
      user_email: currentUser.email,
      questions_presented: quizQuestions,
      user_answers: answers,
      score,
      calculated_age_level: getResultLevel(score).age_level,
      completion_timestamp: new Date(),
      gemini_analysis_result: getMockAnalysis(score)
    };
    
    setCurrentAttempt(attempt);
    
    // Add badges
    const newBadges = [...currentUser.badges_earned];
    if (!newBadges.includes('첫 진단 완료!')) {
      newBadges.push('첫 진단 완료!');
    }
    
    // Update user
    const updatedUser = {
      ...currentUser,
      latest_result: attempt,
      result_history: [...currentUser.result_history, attempt],
      badges_earned: newBadges
    };
    
    setCurrentUser(updatedUser);
    
    // Update mock user count
    setUserCount(prevCount => prevCount + 1);
    
    // Move to result state
    setAppState('result');
  };

  // Handle retry
  const handleRetry = () => {
    setAppState('start');
    setQuizQuestions([]);
    setCurrentAttempt(null);
  };

  // Render based on app state
  const renderContent = () => {
    switch (appState) {
      case 'start':
        return <StartPage onStart={handleStartQuiz} userCount={userCount} />;
      case 'quiz':
        return <QuizPage questions={quizQuestions} onComplete={handleQuizComplete} />;
      case 'result':
        if (!currentAttempt) return <div>Loading results...</div>;
        
        const resultLevel = getResultLevel(currentAttempt.score);
        const previousAge = currentUser && currentUser.result_history.length > 1 
          ? currentUser.result_history[currentUser.result_history.length - 2].calculated_age_level 
          : undefined;
        
        return (
          <ResultPage 
            result={currentAttempt}
            resultLevel={resultLevel}
            previousAge={previousAge}
            badges={badges.filter(badge => currentUser?.badges_earned.includes(badge.name))}
            onRetry={handleRetry}
            analysisResult={currentAttempt.gemini_analysis_result || ''}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Index;
