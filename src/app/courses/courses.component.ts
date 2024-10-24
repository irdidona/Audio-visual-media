import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../admin/manage-courses/course.service';
import { Course, Chapter } from '../course-list/course.model';
import { ChapterService } from '../admin/chapter-dialog/chapter.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  course!: Course;
  selectedChapter?: Chapter;
  chapters: Chapter[] = [];
  videoUrl: string | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private chapterService: ChapterService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourseAndChapters(courseId);
  }

  loadCourseAndChapters(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe((course: any) => {
      this.course = course;
      console.log('Course:', course);
      this.chapterService.getChapterByCourseId(courseId).subscribe((chapters: Chapter[]) => {
        console.log('Chapters:', chapters);
        this.chapters = chapters;
        this.selectedChapter = chapters[0]; // Select the first chapter by default
        if (this.selectedChapter.videoUrl && this.selectedChapter.videoUrl.data) {
          this.convertToVideoUrl(this.selectedChapter.videoUrl.data, this.selectedChapter.videoUrl.contentType);
        }
        this.isLoading = false;
      }, (error: any) => {
        console.error('Error loading chapters:', error);
        this.isLoading = false;
      }
      );
    }, (error: any) => {
      console.error('Error loading course:', error);
      this.isLoading = false;
    });
  }

  convertToVideoUrl(bufferData: any, contentType: string): void {
    // Convert buffer data to Uint8Array
    const byteArray = new Uint8Array(bufferData.data);
    // Create a Blob from the byteArray
    const blob = new Blob([byteArray], { type: contentType });
    // Create a URL for the Blob
    this.videoUrl = URL.createObjectURL(blob);
  }

  selectChapter(chapter: Chapter): void {
    this.selectedChapter = chapter;
    if (this.selectedChapter.videoUrl && this.selectedChapter.videoUrl.data) {
      this.convertToVideoUrl(this.selectedChapter.videoUrl.data, this.selectedChapter.videoUrl.contentType);
    }
  }
}
