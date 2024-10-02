import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [InputTextModule],
})
export class FooterComponent {
  subscribeNewsletter(event: Event) {
    event.preventDefault();
    // Add your subscription logic here
    console.log('Newsletter subscription submitted');
  }
}
