import { Tutor } from "../admin/add-tutor/Tutor.model";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  title: string;
  videoUrl: any;
  description: string;
  explanation: string;
  quiz: QuizQuestion[];
}

export interface Course {
  _id?: any;
  img?: Buffer | string;
  title: string;
  description: string;
  teacher: Tutor;
  createdAt: Date;
  updatedAt: Date;
  chapters: Chapter[];
}
