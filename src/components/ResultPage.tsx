
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge, ResultLevel, QuizAttempt } from '../data/types';
import { useToast } from '../hooks/use-toast';

interface ResultPageProps {
  result: QuizAttempt;
  resultLevel: ResultLevel;
  previousAge?: number;
  badges: Badge[];
  onRetry: () => void;
  analysisResult: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ 
  result, 
  resultLevel, 
  previousAge, 
  badges, 
  onRetry,
  analysisResult
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(true);
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '영어 나이 테스트 결과',
          text: `내 영어 나이는 ${resultLevel.age_level}살! 당신의 영어 나이도 확인해보세요!`,
          url: window.location.href,
        });
        toast({
          title: "공유하기",
          description: "결과가 공유되었습니다!",
        });
      } catch (error) {
        console.error('공유하기 실패:', error);
        toast({
          title: "공유하기",
          description: "공유에 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      }
    } else {
      // 모바일이 아니거나 공유 API가 지원되지 않는 경우
      toast({
        title: "공유하기",
        description: "이 기기에서는 공유가 지원되지 않습니다.",
      });
    }
  };

  const handleFeedback = (isPositive: boolean) => {
    setFeedbackGiven(isPositive);
    setShowFeedback(false);
    toast({
      title: "피드백 감사합니다!",
      description: isPositive ? "소중한 의견 감사합니다!" : "더 나은 서비스로 발전하겠습니다.",
    });
  };

  const handleCTA = () => {
    // In a real implementation, this would redirect to the service landing page
    toast({
      title: "카톡영어 무료체험",
      description: "카톡영어 서비스로 이동합니다!",
    });
    window.open("https://example.com/kakao-english", "_blank");
  };

  return (
    <div className="min-h-screen bg-bgLight py-8 animate-fade-in">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header section with result */}
        <div className="bg-primary text-white px-6 py-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            {resultLevel.title.replace('{}', String(resultLevel.age_level))}
          </h1>
          <p className="text-xl font-semibold mb-4">{resultLevel.level_name}</p>
          
          {previousAge && (
            <div className="bg-white/20 rounded-lg py-2 px-4 inline-block">
              {previousAge < resultLevel.age_level ? (
                <p>🎉 지난번보다 {resultLevel.age_level - previousAge}살 성장했어요!</p>
              ) : previousAge === resultLevel.age_level ? (
                <p>이번에도 {resultLevel.age_level}세! 꾸준함이 비결이에요!</p>
              ) : (
                <p>지난번보다 {previousAge - resultLevel.age_level}살 낮아졌어요. 다시 도전해봐요!</p>
              )}
            </div>
          )}
        </div>
        
        {/* Character image */}
        <div className="flex justify-center -mt-16">
          <div className="rounded-full border-4 border-white bg-blue-100 h-32 w-32 flex items-center justify-center overflow-hidden shadow-md">
            <img 
              src="https://placehold.co/300x300/FFA726/FFFFFF?text=Level+Character" 
              alt={resultLevel.level_name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        {/* Score summary */}
        <div className="text-center px-6 pt-4">
          <p className="text-lg font-medium">
            7문제 중 <span className="text-primary font-bold">{result.score}개</span> 정답!
          </p>
        </div>
        
        {/* Main content */}
        <div className="px-6 py-6">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3">레벨 상세 설명</h2>
            <p className="mb-4 text-gray-700">{resultLevel.description}</p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-2">영역별 분석</h3>
              <p className="text-gray-700">{analysisResult}</p>
            </div>
            
            <h3 className="font-bold mb-2">약점 요약</h3>
            <p className="text-gray-700 mb-4">{resultLevel.weakness_summary}</p>
            
            <h3 className="font-bold mb-2">성장을 위한 팁</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              {resultLevel.tips.map((tip, index) => (
                <li key={index} className="mb-1">{tip}</li>
              ))}
            </ul>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">다음 단계에서는...</h3>
              <p className="text-gray-700">{resultLevel.dream_outcome_next_level}</p>
            </div>
          </div>
          
          {/* Statistics and testimonials */}
          <div className="mb-8">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">통계:</span> 당신과 같은 {resultLevel.age_level}세 사용자의 평균 정답 개수는 {Math.min(result.score + 1, 7)}개 입니다.
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">성공 사례:</span> {resultLevel.age_level}세 사용자 중 78%가 카톡영어 무료 체험 후 레벨 업!
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 italic text-sm text-gray-600">
              "카톡영어로 2주 만에 영어 나이가 9세에서 13세로 올랐어요! 실생활에 필요한 표현들을 효과적으로 배울 수 있었습니다." - 김OO님
            </div>
          </div>
          
          {/* Badges */}
          <div className="mb-8">
            <h3 className="font-bold mb-3">획득한 배지</h3>
            <div className="flex gap-3 justify-center">
              {badges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-1">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <span className="text-xs text-center">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-2">다음 단계로 나아가세요!</h3>
            <p className="text-gray-700 mb-4">{resultLevel.cta_recommendation_text}</p>
            
            <div className="mb-4">
              <Button 
                onClick={handleCTA} 
                className="w-full btn-secondary text-lg py-4 mb-2"
              >
                2주 만에 영어 나이 +3살 올리기 (무료체험 시작!)
              </Button>
              <p className="text-xs text-center text-orange-600 font-medium">
                지금 무료 체험 신청 시, 첫 달 10% 추가 할인! (오늘 자정까지)
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "PDF 다운로드",
                  description: "PDF가 이메일로 발송되었습니다.",
                });
              }}
            >
              나만을 위한 {resultLevel.age_level}세 맞춤 학습 플랜 PDF 받기
            </Button>
          </div>
          
          {/* Feedback and share */}
          <div className="space-y-4">
            {showFeedback ? (
              <div className="text-center mb-2">
                <p className="mb-2 font-medium">진단 결과, 도움이 되셨나요?</p>
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => handleFeedback(true)}
                    className="px-6"
                  >
                    👍 네!
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleFeedback(false)}
                    className="px-6"
                  >
                    👎 아니요
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center mb-2 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700">피드백 감사합니다! 더 나은 서비스로 보답하겠습니다.</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex items-center justify-center"
              >
                결과 공유하기
              </Button>
              <Button 
                variant="outline" 
                onClick={onRetry}
                className="flex items-center justify-center"
              >
                다시 테스트하기
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 text-xs text-center text-gray-500">
          <p>© 2025 스피커블 | <a href="#" className="underline">개인정보처리방침</a></p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
