
import React, { useState, useEffect } from 'react';
import StartPage from '../components/StartPage';
import QuizPage from '../components/QuizPage';
import UserInfoForm from '../components/UserInfoForm';
import ResultPage from '../components/ResultPage';
import { User, QuizAttempt, Question } from '../data/types';
import { getRandomQuestions, getResultLevel, getMockAnalysis, badges } from '../data/mockData';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

// App state type
type AppState = 'start' | 'quiz' | 'userInfo' | 'result' | 'error';

const Index = () => {
  // App state
  const [appState, setAppState] = useState<AppState>('start');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [userCount, setUserCount] = useState(238); // Initial user count
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [selfAssessedLevel, setSelfAssessedLevel] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [resultLevel, setResultLevel] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Fetch user count from Supabase on mount
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data, error } = await supabase
          .from('app_metrics')
          .select('user_count')
          .single();
        
        if (error) {
          console.error('Error fetching user count:', error);
          // If we can't get the count, we'll just use the default value
          return;
        }
        
        if (data && data.user_count) {
          setUserCount(data.user_count);
        }
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };
    
    fetchUserCount();
  }, []);

  // Handle start of quiz
  const handleStartQuiz = (selfAssessedLevel: string | null) => {
    setSelfAssessedLevel(selfAssessedLevel);
    setLoading(true);
    
    try {
      // Get random questions
      const questions = getRandomQuestions(7);
      setQuizQuestions(questions);
      
      // Move to quiz state
      setAppState('quiz');
      toast({
        title: "테스트를 시작합니다!",
        description: "질문에 답하고 당신의 영어 나이를 확인하세요.",
      });
    } catch (err) {
      setError('문제를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
      setAppState('error');
      toast({
        title: "오류 발생",
        description: "문제를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (answers: number[]) => {
    if (quizQuestions.length === 0) {
      setError('문제가 로드되지 않았습니다. 다시 시도해주세요.');
      setAppState('error');
      return;
    }
    
    try {
      // Calculate score
      let score = 0;
      for (let i = 0; i < quizQuestions.length; i++) {
        if (answers[i] === quizQuestions[i].correct_option_index) {
          score++;
        }
      }
      
      setQuizAnswers(answers);
      setQuizScore(score);
      
      // Set result level
      const level = getResultLevel(score);
      setResultLevel(level);
      
      // Move to user info state
      setAppState('userInfo');
    } catch (err) {
      setError('결과 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setAppState('error');
      toast({
        title: "오류 발생",
        description: "결과 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  // Handle user info submission
  const handleUserInfoSubmit = async (name: string, email: string) => {
    setLoading(true);
    
    try {
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
        calculated_age_level: resultLevel.age_level,
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
      
      // Save user data to Supabase
      try {
        // Try to save user data
        const { error: userError } = await supabase
          .from('users')
          .upsert({
            email: email,
            name: name,
            self_assessed_level: selfAssessedLevel,
            last_score: quizScore,
            calculated_age_level: resultLevel.age_level
          });
        
        if (userError) {
          console.error('Error saving user data:', userError);
          // We'll continue even if saving fails
        }
        
        // Increment user count
        const { error: countError } = await supabase
          .from('app_metrics')
          .update({ user_count: userCount + 1 })
          .eq('id', 1);
        
        if (countError) {
          console.error('Error updating user count:', countError);
          // Continue even if update fails
        } else {
          // Only increment the local count if the update succeeded
          setUserCount(prevCount => prevCount + 1);
        }
      } catch (err) {
        console.error('Failed to save data to Supabase:', err);
        // Continue even if saving fails completely
      }
      
      // Move to result state
      setAppState('result');
    } catch (err) {
      setError('사용자 정보 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setAppState('error');
      toast({
        title: "오류 발생",
        description: "사용자 정보 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle retry
  const handleRetry = () => {
    setAppState('start');
    setQuizQuestions([]);
    setCurrentAttempt(null);
    setQuizAnswers([]);
    setQuizScore(0);
    setResultLevel(null);
    setError(null);
  };

  // Render based on app state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="animate-pulse-gentle">
              <div className="h-32 w-32 bg-blue-100 rounded-full mx-auto mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="mt-6 text-gray-600">잠시만 기다려주세요...</p>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-red-500 text-5xl mb-4">😢</div>
            <h2 className="text-2xl font-bold mb-4">오류가 발생했습니다</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              onClick={handleRetry} 
              className="btn-primary"
            >
              다시 시도하기
            </Button>
          </div>
        </div>
      );
    }
    
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
                resultLevel={resultLevel}
              />;
      case 'result':
        if (!currentAttempt) return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
              <p className="text-lg">결과 로딩 중...</p>
            </div>
          </div>
        );
        
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
    <div className="transition-all duration-300 ease-in-out">
      {renderContent()}
    </div>
  );
};

export default Index;

// Add Button import to fix error
import { Button } from '../components/ui/button';
