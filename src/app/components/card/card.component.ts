import { Component, Input} from '@angular/core';
import { Character } from '../../models/character';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // This inputs the character
  @Input() character!: Character;

}
