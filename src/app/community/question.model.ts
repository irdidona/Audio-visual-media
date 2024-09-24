export interface Answer {
    text: string;
    date: Date;
  }
  
  export interface Question {
    id: number;
    text: string;
    date: Date;
    answers: Answer[];
  }
  