
import React, { useState, useEffect } from 'react';
import StartPage from '../components/StartPage';
import QuizPage from '../components/QuizPage';
import UserInfoForm from '../components/UserInfoForm';
import ResultPage from '../components/ResultPage';
import { User, QuizAttempt, Question } from '../data/types';
import { getRandomQuestions, getResultLevel, getMockAnalysis, badges } from '../data/mockData';

// App state type
type AppState = 'start' | 'quiz' | 'userInfo' | 'result';

const Index = () => {
  // App state
  const [appState, setAppState] = useState<AppState>('start');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [userCount, setUserCount] = useState(238); // Mock user count, would be from database in real implementation
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [selfAssessedLevel, setSelfAssessedLevel] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Handle start of quiz
  const handleStartQuiz = (selfAssessedLevel: string | null) => {
    setSelfAssessedLevel(selfAssessedLevel);
    
    // Get random questions
    const questions = getRandomQuestions(7);
    setQuizQuestions(questions);
    
    // Move to quiz state
    setAppState('quiz');
  };

  // Handle quiz completion
  const handleQuizComplete = (answers: number[]) => {
    if (quizQuestions.length === 0) return;
    
    // Calculate score
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (answers[i] === quizQuestions[i].correct_option_index) {
        score++;
      }
    }
    
    setQuizAnswers(answers);
    setQuizScore(score);
    
    // Move to user info state
    setAppState('userInfo');
  };

  // Handle user info submission
  const handleUserInfoSubmit = (name: string, email: string) => {
    // Create user
    const user: User = {
      email,
      self_assessed_level: selfAssessedLevel || undefined,
      result_history: [],
      badges_earned: [],
      email_consent: true
    };
    
    setCurrentUser(user);
    
    // Create attempt record
    const attempt: QuizAttempt = {
      user_email: email,
      questions_presented: quizQuestions,
      user_answers: quizAnswers,
      score: quizScore,
      calculated_age_level: getResultLevel(quizScore).age_level,
      completion_timestamp: new Date(),
      gemini_analysis_result: getMockAnalysis(quizScore)
    };
    
    setCurrentAttempt(attempt);
    
    // Add badges
    const newBadges = [...user.badges_earned];
    if (!newBadges.includes('첫 진단 완료!')) {
      newBadges.push('첫 진단 완료!');
    }
    
    // Update user
    const updatedUser = {
      ...user,
      latest_result: attempt,
      result_history: [...user.result_history, attempt],
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
    setQuizAnswers([]);
    setQuizScore(0);
  };

  // Render based on app state
  const renderContent = () => {
    switch (appState) {
      case 'start':
        return <StartPage onStart={handleStartQuiz} userCount={userCount} />;
      case 'quiz':
        return <QuizPage questions={quizQuestions} onComplete={handleQuizComplete} />;
      case 'userInfo':
        return <UserInfoForm 
                onSubmit={handleUserInfoSubmit} 
                score={quizScore}
                totalQuestions={quizQuestions.length}
              />;
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
