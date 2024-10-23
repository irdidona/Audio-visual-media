import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../course-list/course.service';
import { Course, Chapter } from '../course-list/course.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode: boolean = false;
  courseId?: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      teacher: [{ value: '', disabled: true }, Validators.required], // Set dynamically
      createdAt: [''],
      updatedAt: [''],
      chapters: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.courseForm.patchValue({ teacher: 'Logged-in Teacher Name' }); // Replace with actual logged-in teacher

    // if (this.courseId) {
    //   this.isEditMode = true;
    //   this.courseService.getCourseById(this.courseId).subscribe((course: any) => {
    //     this.courseForm.patchValue(course);
    //     this.setChapters(course.chapters);
    //   });
    // }
  }

  get chapters(): FormArray {
    return this.courseForm.get('chapters') as FormArray;
  }

  addChapter(): void {
    this.chapters.push(this.fb.group({
      title: ['', Validators.required],
      videoUrl: ['', Validators.required],
      description: ['', Validators.required],
      explanation: ['', Validators.required],
      quiz: this.fb.array([])
    }));
  }

  removeChapter(index: number): void {
    this.chapters.removeAt(index);
  }

  addQuizQuestion(chapterIndex: number): void {
    const quizArray = (this.chapters.at(chapterIndex).get('quiz') as FormArray);
    quizArray.push(this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([this.fb.control(''), this.fb.control(''), this.fb.control(''), this.fb.control('')]),
      correctAnswer: ['', Validators.required]
    }));
  }

  removeQuizQuestion(chapterIndex: number, questionIndex: number): void {
    const quizArray = (this.chapters.at(chapterIndex).get('quiz') as FormArray);
    quizArray.removeAt(questionIndex);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData: Course = {
        ...this.courseForm.value,
        createdAt: this.isEditMode ? this.courseForm.value.createdAt : new Date(),
        updatedAt: new Date(),
        teacher: 'Logged-in Teacher Name' // Replace with actual logged-in teacher
      };

      // if (this.isEditMode) {
      //   this.courseService.updateCourse(this.courseId!, courseData).subscribe(() => {
      //     this.router.navigate(['/courses']);
      //   });
      // } else {
      //   this.courseService.addCourse(courseData).subscribe(() => {
      //     this.router.navigate(['/courses']);
      //   });
      // }
    }
  }

  private setChapters(chapters: Chapter[]): void {
    const chapterFGs = chapters.map(chapter => this.fb.group({
      title: [chapter.title, Validators.required],
      videoUrl: [chapter.videoUrl, Validators.required],
      description: [chapter.description, Validators.required],
      explanation: [chapter.explanation, Validators.required],
      quiz: this.fb.array(chapter.quiz ? chapter.quiz.map(q => this.fb.group({
        question: [q.question, Validators.required],
        options: this.fb.array(q.options.map(option => this.fb.control(option))),
        correctAnswer: [q.correctAnswer, Validators.required]
      })) : [])
    }));
    const chapterFormArray = this.fb.array(chapterFGs);
    this.courseForm.setControl('chapters', chapterFormArray);
  }
}
