import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, RouterModule, CardComponent, RouterLink, RouterLinkActive],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {

// Do api card logic 

characters: Character[] = []; // Initiliase array of characters
loading = true;
error: string | null = null;

 constructor(public characterService: CharacterService){}

// On page load it will do loadCharacters Method
ngOnInit(): void {
  this.loadCharacters();

}

loadCharacters(): void {
  this.loading = true;
  this.error = null;
  
  this.characterService.getCharacters().subscribe({
    next: (response) => {
      this.characters = response.results;  
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load characters';
      this.loading = false;
      console.error('Error loading characters:', err);
    }
  });
}

}
