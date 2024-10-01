import { Component } from '@angular/core';
import { AdminService } from '../adminService.service';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-add-tutor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-tutor.component.html',
  styleUrl: './add-tutor.component.css'
})
export class AddTutorComponent {
  tutor = { name: '', email: '' };

  constructor(private adminService: AdminService) {}

  addTutor() {
    this.adminService.addTutor(this.tutor).subscribe(response => {
      console.log('Tutor added:', response);
    });
  }
}
