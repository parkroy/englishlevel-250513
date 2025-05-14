import { Question, ResultLevel, Badge } from './types';

export const questions: Question[] = [
  {
    id: "q1",
    question_text: "Choose the correct sentence: A) They is happy. B) They are happy. C) They am happy. D) They be happy.",
    options: [
      "A) They is happy.",
      "B) They are happy.",
      "C) They am happy.",
      "D) They be happy."
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "문법-be동사",
    explanation: "They는 복수 주어이므로 be동사는 are를 사용합니다."
  },
  {
    id: "q2",
    question_text: "Which sentence is correct? A) She sing well. B) She sings well. C) She singing well. D) She is sing well.",
    options: [
      "A) She sing well.",
      "B) She sings well.",
      "C) She singing well.",
      "D) She is sing well."
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "문법-일반동사",
    explanation: "3인칭 단수 주어(she)와 함께 일반동사는 -s를 붙입니다."
  },
  {
    id: "q3",
    question_text: "What do you say when you meet someone for the first time? A) Goodbye! B) How are you? C) Nice to meet you! D) See you later!",
    options: [
      "A) Goodbye!",
      "B) How are you?",
      "C) Nice to meet you!",
      "D) See you later!"
    ],
    correct_option_index: 2,
    difficulty: 1,
    category: "어휘-기본표현",
    explanation: "처음 만났을 때는 'Nice to meet you!'라고 합니다."
  },
  {
    id: "q4",
    question_text: "Complete the sentence: ___ is my book. A) This B) That C) These D) Those",
    options: [
      "A) This",
      "B) That",
      "C) These",
      "D) Those"
    ],
    correct_option_index: 0,
    difficulty: 1,
    category: "어휘-지시사",
    explanation: "단수 명사(book)와 가까이 있는 것을 가리킬 때는 'This'를 사용합니다."
  },
  {
    id: "q5",
    question_text: "Which is correct? A) one apple B) a apples C) an apples D) two apple",
    options: [
      "A) one apple",
      "B) a apples",
      "C) an apples",
      "D) two apple"
    ],
    correct_option_index: 0,
    difficulty: 1,
    category: "어휘-개수",
    explanation: "하나의 셀 수 있는 명사는 'one apple'로 표현합니다."
  },
  {
    id: "q6",
    question_text: "다음을 영어로 바르게 표현한 것은? '이것은 나의 책이다.'",
    options: [
      "A) This is I book.",
      "B) This is me book.",
      "C) This is my book.",
      "D) This is mine book."
    ],
    correct_option_index: 2,
    difficulty: 1,
    category: "문법-인칭대명사",
    explanation: "소유격은 'my'를 사용합니다."
  },
  {
    id: "q7",
    question_text: "다음을 영어로 바르게 표현한 것은? '테이블 위에 사과들이 있다.'",
    options: [
      "A) There is apples on the table.",
      "B) There are apples on the table.",
      "C) There are apple on the table.",
      "D) There is apple on the table."
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "문법-복수형",
    explanation: "복수 명사(apples)와 함께 'There are'를 사용합니다."
  },
  {
    id: "q8",
    question_text: "다음을 영어로 바르게 표현한 것은? '나는 매일 아침 커피를 마신다.'",
    options: [
      "A) I drink coffee every morning.",
      "B) I drinking coffee every morning.",
      "C) I am drink coffee every morning.",
      "D) I coffee drink every morning."
    ],
    correct_option_index: 0,
    difficulty: 1,
    category: "문법-일반동사",
    explanation: "현재 습관을 나타낼 때 일반동사 현재형을 사용합니다."
  },
  {
    id: "q9",
    question_text: "다음을 영어로 바르게 표현한 것은? '지금 몇 시입니까?'",
    options: [
      "A) What is time now?",
      "B) What time it is now?",
      "C) What time is it?",
      "D) What time is now?"
    ],
    correct_option_index: 2,
    difficulty: 1,
    category: "어휘-시간",
    explanation: "시간을 물을 때는 'What time is it?'이라고 합니다."
  },
  {
    id: "q10",
    question_text: "다음을 영어로 바르게 표현한 것은? '나는 학교에 간다.'",
    options: [
      "A) I go to school.",
      "B) I go at school.",
      "C) I go in school.",
      "D) I school go."
    ],
    correct_option_index: 0,
    difficulty: 1,
    category: "어휘-장소",
    explanation: "장소를 나타내는 전치사로 'to'를 사용합니다."
  },
  {
    id: "q11",
    question_text: "다음 중 올바른 시제를 고르세요: '그들은 3년 동안 이곳에서 _____.'",
    options: [
      "A) 일하다.",
      "B) 일했다.",
      "C) 일해 왔다.",
      "D) 일할 것이다."
    ],
    correct_option_index: 2,
    difficulty: 2,
    category: "문법-현재완료",
    explanation: "지속을 나타내는 현재완료 시제(have been working)가 적절합니다."
  },
  {
    id: "q12",
    question_text: "다음 중 가정법 과거의 올바른 형태는?",
    options: [
      "A) If I am rich, I will buy a house.",
      "B) If I was rich, I will buy a house.",
      "C) If I were rich, I would buy a house.",
      "D) If I were rich, I will buy a house."
    ],
    correct_option_index: 2,
    difficulty: 2,
    category: "문법-가정법",
    explanation: "가정법 과거는 'If + 과거형태(were), 주절 would + 동사원형' 구조입니다."
  },
  {
    id: "q13",
    question_text: "다음 문장의 밑줄 친 부분을 능동태로 바꾸시오: 'The book was written by Mark Twain.'",
    options: [
      "A) Mark Twain writes the book.",
      "B) Mark Twain wrote the book.",
      "C) Mark Twain was writing the book.",
      "D) Mark Twain has written the book."
    ],
    correct_option_index: 1,
    difficulty: 2,
    category: "문법-수동태",
    explanation: "과거 시제 수동태(was written)는 능동태에서 과거 시제(wrote)로 변환됩니다."
  },
  {
    id: "q14",
    question_text: "다음 대화에서 적절한 응답을 고르세요: 'I'm afraid I've broken your vase.' - '_____'",
    options: [
      "A) Don't worry. It doesn't matter.",
      "B) Yes, you're right.",
      "C) No, I don't think so.",
      "D) I'm afraid too."
    ],
    correct_option_index: 0,
    difficulty: 2,
    category: "어휘-대화표현",
    explanation: "사과에 대한 적절한 응답으로 걱정하지 말라는 표현이 자연스럽습니다."
  },
  {
    id: "q15",
    question_text: "다음 문장에서 'call off'의 의미로 가장 적절한 것은? 'The meeting was called off due to bad weather.'",
    options: [
      "A) 연기하다",
      "B) 취소하다",
      "C) 시작하다",
      "D) 마치다"
    ],
    correct_option_index: 1,
    difficulty: 2,
    category: "어휘-구동사",
    explanation: "'call off'는 '취소하다'를 의미합니다."
  },
  {
    id: "q16",
    question_text: "주어진 문맥에서 빈칸에 가장 적절한 것은? 'Despite _____ very tired, she continued working.'",
    options: [
      "A) being",
      "B) she was",
      "C) to be",
      "D) is"
    ],
    correct_option_index: 0,
    difficulty: 3,
    category: "문법-분사구문",
    explanation: "Despite 다음에는 명사절이 와야 하므로 동명사(being)가 적절합니다."
  },
  {
    id: "q17",
    question_text: "다음 문장의 관계대명사를 찾으시오: 'The woman who spoke at the conference is a renowned scientist.'",
    options: [
      "A) The",
      "B) woman",
      "C) who",
      "D) spoke"
    ],
    correct_option_index: 2,
    difficulty: 2,
    category: "문법-관계절",
    explanation: "관계대명사 'who'는 선행사 'woman'을 수식하는 관계절을 이끕니다."
  },
  {
    id: "q18",
    question_text: "다음 중 비교급과 최상급이 모두 올바른 것은?",
    options: [
      "A) good - better - goodest",
      "B) bad - worse - worst",
      "C) happy - happier - happyest",
      "D) interesting - more interesting - most interestinger"
    ],
    correct_option_index: 1,
    difficulty: 2,
    category: "문법-비교급",
    explanation: "bad의 비교급은 worse, 최상급은 worst입니다."
  },
  {
    id: "q19",
    question_text: "Which of the following contains a gerund? A) I enjoy singing. B) I want to sing. C) I am singing. D) I sang.",
    options: [
      "A) I enjoy singing.",
      "B) I want to sing.",
      "C) I am singing.",
      "D) I sang."
    ],
    correct_option_index: 0,
    difficulty: 3,
    category: "문법-동명사",
    explanation: "'singing'은 동명사로 'enjoy'의 목적어로 사용되었습니다."
  },
  {
    id: "q20",
    question_text: "다음 문장에서 화자의 의도로 가장 적절한 것은? 'You might want to reconsider your decision.'",
    options: [
      "A) 명령",
      "B) 제안",
      "C) 약속",
      "D) 예측"
    ],
    correct_option_index: 1,
    difficulty: 3,
    category: "어휘-화용론",
    explanation: "이 표현은 직접적인 명령이 아닌 공손한 제안을 나타냅니다."
  },
  {
    id: "q21",
    question_text: "다음 문장에서 올바른 강조구문은? 'John met Mary yesterday.'",
    options: [
      "A) It was John who met Mary yesterday.",
      "B) It was John whom met Mary yesterday.",
      "C) It is John who met Mary yesterday.",
      "D) It was John which met Mary yesterday."
    ],
    correct_option_index: 0,
    difficulty: 3,
    category: "문법-강조구문",
    explanation: "주어 강조구문은 'It was [강조할 말] who/that...'의 형태를 취합니다."
  }
];

// Only include the first 20 entries from the questions array for the mockQuestions
export const mockQuestions = questions.slice(0, 20);

export const resultLevels: ResultLevel[] = [
  {
    age_level: 5,
    level_name: "잉글리시 익스플로러",
    title: "당신의 영어는 미국인 {}세 수준!",
    description: "영어의 세계로 첫 발걸음을 떼고 있군요! 기초적인 인사말과 간단한 표현을 알고 있지만, 아직 많은 부분이 낯설게 느껴질 수 있어요. 하지만 걱정하지 마세요! 모든 언어 천재도 처음엔 초보였답니다.",
    weakness_summary: "기본 문법과 일상 대화 표현에 어려움을 겪고 있어요.",
    tips: [
      "매일 10분씩 기본 인사말과 자기소개 연습하기",
      "간단한 영어 동요나 동화 듣기"
    ],
    dream_outcome_next_level: "다음 레벨에선 낯선 환경에서도 간단한 의사소통이 가능해질 거예요!",
    character_image_url: "/images/level-5.png",
    cta_recommendation_text: "왕초보 탈출 2주 코스로 자신감을 키워보세요!"
  },
  {
    age_level: 9,
    level_name: "잉글리시 프렌드",
    title: "당신의 영어는 미국인 {}세 수준!",
    description: "기본적인 영어 구조를 이해하고 간단한 대화가 가능해졌어요! 기초 단어와 표현을 알고 있지만, 아직 복잡한 문장 구성이나 다양한 시제 활용에는 익숙하지 않아요. 꾸준히 나아가고 있는 좋은 모습입니다!",
    weakness_summary: "다양한 시제와 자연스러운 표현 활용에 어려움이 있습니다.",
    tips: [
      "과거/현재/미래 시제를 구분해서 문장 만들기 연습하기",
      "영어로 일기 쓰기 시작하기 (짧게라도 OK!)"
    ],
    dream_outcome_next_level: "다음 레벨에선 영어로 자신의 생각과 감정을 표현하는 재미를 알게 될 거예요!",
    character_image_url: "/images/level-9.png",
    cta_recommendation_text: "초급 탈출 프로그램으로 10대 영어 레벨로 점프하세요!"
  },
  {
    age_level: 13,
    level_name: "잉글리시 어드벤처러",
    title: "당신의 영어는 미국인 {}세 수준!",
    description: "영어로 자신을 표현하는 능력이 크게 향상되었어요! 일상 대화에 필요한 문법과 어휘를 갖추고 있으며, 자신의 의견과 감정을 전달할 수 있습니다. 자연스러운 표���과 관용어 사용이 늘어나면 더욱 발전할 거예요.",
    weakness_summary: "복잡한 문법과 관용적 표현, 비즈니스 영어에 약점이 있습니다.",
    tips: [
      "영어 시트콤이나 영화 자막 없이 도전해보기",
      "관용어구와 슬랭 표현 학습하기"
    ],
    dream_outcome_next_level: "다음 레벨에선 원어민과의 대화에서도 자신감이 크게 향상될 거예요!",
    character_image_url: "/images/level-13.png",
    cta_recommendation_text: "10대 영어 마스터 과정으로 성인 수준의 영어 능력을 키워보세요!"
  },
  {
    age_level: 16,
    level_name: "잉글리시 마스터",
    title: "당신의 영어는 미국인 {}세 수준!",
    description: "대단해요! 이제 다양한 주제에 대한 의견을 영어로 논리적으로 표현할 수 있습니다. 복잡한 문법 구조를 이해하고 활용할 수 있으며, 자연스러운 대화 흐름을 유지할 수 있어요. 비즈니스 상황에서도 자신감 있게 대응 가능합니다.",
    weakness_summary: "미묘한 뉘앙스와 전문 분야 용어, 문화적 차이에 대한 이해가 필요합니다.",
    tips: [
      "영어 토론이나 디베이트에 참여해보기",
      "다양한 억양과 방언에 익숙해지기"
    ],
    dream_outcome_next_level: "다음 레벨에선 외국인 동료들과 함께 일하는 환경에서도 어려움 없이 의사소통할 수 있을 거예요!",
    character_image_url: "/images/level-16.png",
    cta_recommendation_text: "비즈니스 영어 완성 과정으로 프로페셔널한 영어 스킬을 완성하세요!"
  },
  {
    age_level: 20,
    level_name: "잉글리시 프로",
    title: "당신의 영어는 미국인 {}세 수준!",
    description: "축하합니다! 이제 거의 원어민에 가까운 영어 실력을 갖추게 되었어요! 복잡한 주제도 자연스럽게 논의할 수 있고, 비즈니스 및 전문 분야에서도 능숙하게 의사소통할 수 있습니다. 미묘한 뉘앙스와 문화적 맥락도 이해할 수 있는 단계입니다.",
    weakness_summary: "전문적인 상황에서의 정교한 표현과 고급 어휘 활용에 약간의 어려움이 있을 수 있습니다.",
    tips: [
      "영어로 프레젠테이션하고 피드백 받기",
      "다양한 분야의 영어 콘텐츠 창작해보기"
    ],
    dream_outcome_next_level: "이제 여러분은 영어로 인해 기회가 제한되지 않는 세계로 나아갈 수 있습니다!",
    character_image_url: "/images/level-20.png",
    cta_recommendation_text: "고급 비즈니스 영어로 글로벌 커리어의 문을 활짝 열어보세요!"
  }
];

export const badges: Badge[] = [
  {
    name: "첫 진단 완료!",
    icon_url: "/images/badge-first-test.png",
    description: "처음으로 영어 나이 테스트를 완료했어요!"
  },
  {
    name: "결과 공유 완료!",
    icon_url: "/images/badge-share.png",
    description: "테스트 결과를 친구들과 공유했어요!"
  },
  {
    name: "레벨 업 달성!",
    icon_url: "/images/badge-level-up.png",
    description: "이전 테스트보다 레벨이 상승했어요!"
  }
];

// Default placeholder image for now - you can replace these with actual image URLs later
export const placeholderImage = "https://placehold.co/600x400/4D9DFF/FFFFFF?text=English+Age+Test";

// Function to get a result level based on score
export const getResultLevel = (score: number): ResultLevel => {
  if (score <= 1) return resultLevels[0];  // 5 years old
  if (score <= 3) return resultLevels[1];  // 9 years old
  if (score <= 5) return resultLevels[2];  // 13 years old
  if (score <= 6) return resultLevels[3];  // 16 years old
  return resultLevels[4];  // 20 years old
};

// Function to get random questions
export const getRandomQuestions = (count: number = 7): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Mock analysis for demonstration
export const getMockAnalysis = (score: number): string => {
  const analyses = [
    "문법 분석: 기본적인 시제 사용에 어려움이 있어요. 특히 과거 시제와 현재 시제의 구분이 필요합니다.",
    "어휘 분석: 일상적인 기초 단어는 알고 있지만, 다양한 표현과 동의어 활용이 부족합니다.",
    "문법 분석: 시제 활용이 조금 더 자연스러워졌지만, 관사와 전치사 사용에 주의가 필요합니다.",
    "대화 분석: 일상 대화는 잘 이해하지만, 자연스러운 응답과 관용표현 활용이 더 필요합니다.",
    "문법 분석: 기본 문법은 잘 이해하고 있으며, 복잡한 문장 구조에 도전해볼 수 있습니다.",
    "어휘 분석: 다양한 상황에 맞는 적절한 어휘 선택 능력이 향상되고 있습니다."
  ];
  
  return analyses[Math.min(score, analyses.length - 1)];
};
