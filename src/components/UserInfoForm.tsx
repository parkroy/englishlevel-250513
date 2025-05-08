
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';

interface UserInfoFormProps {
  onSubmit: (name: string, email: string) => void;
  score: number;
  totalQuestions: number;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, score, totalQuestions }) => {
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
        title: "결과를 계산 중입니다!",
        description: "잠시만 기다려주세요.",
      });
      onSubmit(name, email);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgLight p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">거의 다 왔어요!</h2>
          <p className="text-gray-600">결과를 확인하기 위해 정보를 입력해주세요.</p>
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <p className="text-blue-700 font-medium">총 {totalQuestions}문제 중 {score}개를 맞히셨습니다!</p>
          </div>
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
            결과 확인 및 맞춤 팁을 받을 이메일을 입력하세요.
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
          내 영어 나이 확인하기!
        </Button>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>© 2023 카톡영어 | <a href="#" className="underline">개인정보처리방침</a></p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
