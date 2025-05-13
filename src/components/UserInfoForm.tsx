
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { ResultLevel } from '../data/types';

interface UserInfoFormProps {
  onSubmit: (name: string, email: string) => void;
  score: number;
  totalQuestions: number;
  resultLevel: ResultLevel;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, score, totalQuestions, resultLevel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();
  
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('이름을 입력해주세요.');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('유효한 이메일을 입력해주세요.');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (isValid) {
      toast({
        title: "상세 분석 보고서를 준비 중입니다!",
        description: "잠시만 기다려주세요.",
      });
      onSubmit(name, email);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="bg-primary text-white px-6 py-8 text-center rounded-lg mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {resultLevel.title.replace('{}', String(resultLevel.age_level))}
            </h1>
            <p className="text-xl font-semibold">{resultLevel.level_name}</p>
          </div>
          
          <div className="flex justify-center -mt-16 mb-6">
            <div className="rounded-full border-4 border-white bg-blue-100 h-24 w-24 flex items-center justify-center overflow-hidden shadow-md">
              <img 
                src={resultLevel.character_image_url} 
                alt={resultLevel.level_name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">
            총 {totalQuestions}문제 중 {score}개를 맞히셨습니다!
          </p>
          
          <h2 className="text-2xl font-bold mb-2">상세 분석 리포트를 받아보세요!</h2>
          <p className="text-gray-600 mb-4">이름과 이메일을 입력하시면 <span className="font-bold text-primary">맞춤형 학습 플랜</span>과 <span className="font-bold text-primary">영역별 상세 분석</span>이 포함된 리포트를 보내드립니다.</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            이름
          </label>
          <Input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            className={nameError ? "border-red-500" : ""}
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            이메일
          </label>
          <Input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          <p className="text-xs text-gray-500 mt-1">
            입력하신 이메일로 맞춤형 학습 플랜과 추가 분석 결과를 보내드립니다.
          </p>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full btn-primary text-lg py-4"
        >
          상세 분석 리포트 확인하기!
        </Button>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>© 2025 스피커블 | <a href="#" className="underline">개인정보처리방침</a></p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
