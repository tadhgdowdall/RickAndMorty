import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, HeroSectionComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
