import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from './community.service';
import { Question } from './question.model';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  questions: Question[] = [];
  selectedQuestion?: Question;
  newQuestion: string = '';

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getQuestions().subscribe((data: Question[]) => {
      this.questions = data;
    });
  }

  selectQuestion(question: Question): void {
    this.selectedQuestion = question;
  }

  askQuestion(): void {
    if (this.newQuestion.trim()) {
      this.communityService.addQuestion(this.newQuestion).subscribe((question: Question) => {
        this.questions.push(question);
        this.newQuestion = '';
      });
    }
  }

  addAnswer(answer: string): void {
    if (this.selectedQuestion && answer.trim()) {
      this.communityService.addAnswer(this.selectedQuestion.id, answer).subscribe(() => {
        this.selectedQuestion?.answers.push({ text: answer, date: new Date() });
      });
    }
  }
}
