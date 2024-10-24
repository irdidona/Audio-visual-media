import { Injectable } from "@angular/core";
import { Chapter } from "../../course-list/course.model";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })

  export class ChapterService {
    private apiUrl = 'http://localhost:3000/api/chapters'; 
     constructor(private http: HttpClient) { }

     // Create a new chapter
     createChapter(chapter: any): Observable<Chapter> {
        return this.http.post<Chapter>(`${this.apiUrl}/add-chapter`, chapter);
     }

     getChapterByCourseId(courseId: string): Observable<Chapter[]> {
        return this.http.get<Chapter[]>(`${this.apiUrl}/${courseId}`);
     }
      
     deleteChapter(id: string): Observable<void> {
         return this.http.delete<void>(`${this.apiUrl}/delete-chapter/${id}`);
       }

  }