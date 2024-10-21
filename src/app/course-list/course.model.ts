export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  title: string;
  videoUrl: Buffer | string;
  description: string;
  explanation: string;
  quiz: QuizQuestion[];
}

export interface Course {
  id?: any;
  img?: Buffer | string;
  title: string;
  description: string;
  teacher: string;
  createdAt: Date;
  updatedAt: Date;
  chapters: Chapter[];
}
