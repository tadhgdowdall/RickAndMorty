import { Component, Input} from '@angular/core';
import { Character } from '../../models/character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // This inputs the character
  @Input() character!: Character;

  showEpisodesModal = false;


 
openEpisodesModal(): void {
  this.showEpisodesModal = true;
}

closeEpisodesModal(): void {
  this.showEpisodesModal = false;
}
  
}
