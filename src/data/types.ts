
export interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  difficulty: number;
  category: string;
  explanation?: string;
}

export interface ResultLevel {
  age_level: number;
  level_name: string;
  title: string;
  description: string;
  weakness_summary: string;
  tips: string[];
  dream_outcome_next_level: string;
  character_image_url: string;
  cta_recommendation_text: string;
  lead_magnet_pdf_url?: string;
}

export interface User {
  email: string;
  self_assessed_level?: string;
  latest_result?: QuizAttempt;
  result_history: QuizAttempt[];
  badges_earned: string[];
  email_consent: boolean;
}

export interface QuizAttempt {
  user_email: string;
  questions_presented: Question[];
  user_answers: number[];
  score: number;
  calculated_age_level: number;
  completion_timestamp: Date;
  feedback_rating?: boolean;
  gemini_analysis_result?: string;
}

export interface Badge {
  name: string;
  icon_url: string;
  description: string;
}
