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
     createChapter(chapter: Chapter): Observable<Chapter> {
        return this.http.post<Chapter>(`${this.apiUrl}/add-chapter`, chapter);
     }
      

  }