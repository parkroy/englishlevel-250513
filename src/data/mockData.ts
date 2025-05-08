
import { Question, ResultLevel, Badge } from './types';

export const questions: Question[] = [
  {
    id: "q1",
    question_text: "Which sentence sounds most natural?",
    options: [
      "I am go to the store yesterday.",
      "I went to the store yesterday.",
      "I going to the store yesterday.",
      "I did go to the store yesterday."
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "Grammar-Tense",
    explanation: "The simple past tense is used for actions completed in the past."
  },
  {
    id: "q2",
    question_text: "What would you say when meeting someone for the first time?",
    options: [
      "Nice to meet you!",
      "I know you!",
      "What is your purpose?",
      "We meet finally!"
    ],
    correct_option_index: 0,
    difficulty: 1,
    category: "Situational-Greeting",
    explanation: "When meeting someone for the first time, 'Nice to meet you!' is the most natural greeting."
  },
  {
    id: "q3",
    question_text: "Choose the correct sentence:",
    options: [
      "She have three cats.",
      "She has three cat.",
      "She has three cats.",
      "She having three cats."
    ],
    correct_option_index: 2,
    difficulty: 1,
    category: "Grammar-Agreement",
    explanation: "For third-person singular (she), we use 'has' and the plural noun 'cats'."
  },
  {
    id: "q4",
    question_text: "What does the idiom 'break a leg' mean?",
    options: [
      "Actually injure your leg",
      "Run away fast",
      "Good luck",
      "Take a break"
    ],
    correct_option_index: 2,
    difficulty: 2,
    category: "Vocabulary-Idiom",
    explanation: "'Break a leg' is an idiom used to wish someone good luck, especially before a performance."
  },
  {
    id: "q5",
    question_text: "How would you ask for the price?",
    options: [
      "How many money is this?",
      "How much is this?",
      "What costs it?",
      "This is how much?"
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "Situational-Shopping",
    explanation: "When asking about price, 'How much is this?' is the correct phrase."
  },
  {
    id: "q6",
    question_text: "Which sentence uses the preposition correctly?",
    options: [
      "I'm afraid of heights.",
      "I'm afraid from heights.",
      "I'm afraid at heights.",
      "I'm afraid by heights."
    ],
    correct_option_index: 0,
    difficulty: 2,
    category: "Grammar-Preposition",
    explanation: "The correct preposition to use with 'afraid' is 'of'."
  },
  {
    id: "q7",
    question_text: "What would you say if someone asks 'How are you?'",
    options: [
      "I am 30 years old.",
      "I am engineer.",
      "I'm doing well, thank you!",
      "Yes, I am."
    ],
    correct_option_index: 2,
    difficulty: 1,
    category: "Situational-Greeting",
    explanation: "'How are you?' asks about your current state or feelings, not your age or profession."
  },
  {
    id: "q8",
    question_text: "Which word is NOT a synonym for 'happy'?",
    options: [
      "Joyful",
      "Delighted",
      "Miserable",
      "Cheerful"
    ],
    correct_option_index: 2,
    difficulty: 2,
    category: "Vocabulary-Synonyms",
    explanation: "'Miserable' means extremely unhappy or uncomfortable, while the others mean happy."
  },
  {
    id: "q9",
    question_text: "Choose the correct past tense form:",
    options: [
      "I eated the cake.",
      "I ate the cake.",
      "I was eating the cake.",
      "I eat the cake."
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "Grammar-Tense",
    explanation: "The correct irregular past tense form of 'eat' is 'ate'."
  },
  {
    id: "q10",
    question_text: "What's the best response to 'Thank you'?",
    options: [
      "Welcome.",
      "You're welcome.",
      "It's welcoming.",
      "The welcome is yours."
    ],
    correct_option_index: 1,
    difficulty: 1,
    category: "Situational-Politeness",
    explanation: "The natural response to 'Thank you' is 'You're welcome.'"
  }
];

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
    description: "영어로 자신을 표현하는 능력이 크게 향상되었어요! 일상 대화에 필요한 문법과 어휘를 갖추고 있으며, 자신의 의견과 감정을 전달할 수 있습니다. 자연스러운 표현과 관용어 사용이 늘어나면 더욱 발전할 거예요.",
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
