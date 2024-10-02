import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private questions: Question[] = [
    {
      id: 1,
      text: 'How do I upload videos?',
      date: new Date(),
      answers: [
        {
          text: 'Click on the upload button in the dashboard.',
          date: new Date(),
        },
      ],
    },
    {
      id: 2,
      text: 'What is the best way to learn Angular?',
      date: new Date(),
      answers: [
        { text: 'Start with the official documentation.', date: new Date() },
      ],
    },
  ];

  getQuestions(): Observable<Question[]> {
    return of(this.questions);
  }

  addQuestion(text: string): Observable<Question> {
    const newQuestion: Question = {
      id: this.questions.length + 1,
      text,
      date: new Date(),
      answers: [],
    };
    // this.questions.push(newQuestion);
    return of(newQuestion);
  }

  addAnswer(questionId: number, answerText: string): Observable<void> {
    const question = this.questions.find((q) => q.id === questionId);
    if (question) {
      question.answers.push({ text: answerText, date: new Date() });
    }
    return of();
  }
}
