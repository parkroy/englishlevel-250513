
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

interface StartPageProps {
  onStart: (selfAssessedLevel: string | null) => void;
  userCount: number;
}

const StartPage: React.FC<StartPageProps> = ({ onStart, userCount }) => {
  const [selfAssessedLevel, setSelfAssessedLevel] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStart = () => {
    toast({
      title: "테스트를 시작합니다!",
      description: "7개의 질문에 답해주세요.",
    });
    onStart(selfAssessedLevel);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
        <div className="mb-8">
          <img 
            src="https://placehold.co/600x300/4D9DFF/FFFFFF?text=English+Age+Test" 
            alt="다양한 연령대 사람들이 대화하는 일러스트" 
            className="w-full rounded-lg mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-textColor mb-3">
            당신의 영어, 미국인들은 몇 살 수준으로 느낄까?
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            7개 핵심 질문으로 알아보는 나의 진짜 영어 나이! 지금 바로 확인해보세요!
          </p>
          <div className="bg-blue-50 rounded-lg p-3 mb-6 text-center">
            <p className="text-blue-700">지금까지 <span className="font-bold">{userCount}명</span>이 참여했어요!</p>
            <p className="text-sm text-blue-600">(약 2-3분 소요)</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-medium mb-2">테스트 시작 전, 스스로 생각하는 영어 레벨을 알려주세요!</p>
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={() => setSelfAssessedLevel('왕초보')}
              variant={selfAssessedLevel === '왕초보' ? 'default' : 'outline'}
              className="flex-1"
            >
              왕초보
            </Button>
            <Button 
              onClick={() => setSelfAssessedLevel('초급')}
              variant={selfAssessedLevel === '초급' ? 'default' : 'outline'}
              className="flex-1"
            >
              초급
            </Button>
            <Button 
              onClick={() => setSelfAssessedLevel('중급')}
              variant={selfAssessedLevel === '중급' ? 'default' : 'outline'}
              className="flex-1"
            >
              중급
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleStart} 
          className="w-full btn-primary text-lg py-4"
        >
          내 영어 나이 확인하기!
        </Button>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>© 2025 스피커블 | <a href="#" className="underline">개인정보처리방침</a></p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
