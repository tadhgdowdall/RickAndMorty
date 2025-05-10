import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Character } from '../../models/character';
import { CommonModule } from '@angular/common';
import { FavouritesService } from '../../services/favourites.service';

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

  @Input() isFavourited: boolean = false;

  @Input() hideButtons: boolean = false; // Used to hide buttons on favourites page


 
  constructor(private favouritesService: FavouritesService) {}

  showEpisodesModal = false;
  showfavouritePopup = false;

 // Shows pop for episodes 
openEpisodesModal(): void {
  this.showEpisodesModal = true;
}

closeEpisodesModal(): void {
  this.showEpisodesModal = false;
}
  

// ON load, it gets all the favourites from database and checks if the character is in favourites or not 
ngOnInit(): void {
  // Checks if it is favourited
  if (!this.isFavourited) { 
    this.favouritesService.getFavourites().subscribe(favourites => {
      this.isFavourited = favourites.some(f => f.characterId === this.character.id);
    });
  }
}



// Checks if it is favourited, It will then add / remove from database whether it is or isnt 
toggleFavourite(): void {
  if (this.isFavourited) {
    this.favouritesService.removeFavourite(this.character.id).subscribe(() => {
      this.isFavourited = false;
    });
  } else {
    const favourite = {
      characterId: this.character.id,
      name: this.character.name,
      image: this.character.image
    };
    this.favouritesService.addFavourite(favourite).subscribe(() => {
      this.isFavourited = true;
    });
  }
}



}
