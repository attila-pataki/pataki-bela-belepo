import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddPageComponent, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pataki-bela-belepo';
}
