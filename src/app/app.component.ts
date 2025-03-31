import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CardComponent, HeroSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RickAndMorty';
}
