import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling'; // installed for virtualisation

@Component({
  selector: 'app-characters',
  imports: [CommonModule, RouterModule, CardComponent, ScrollingModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {

// Do api card logic 



characters: Character[] = []; // Array of characters
searchResults: Character[] = []; // Array for storing the searched characters 
charactersRows: Character[][] = [];
loading = true;
error: string | null = null;
errorMessage:string ='';
currentPage = 1;  // 

 constructor(public characterService: CharacterService){}

// When page loads it loads all characters 
ngOnInit(): void {
  this.loadCharacters();

}

searchCharacterName(characterName: string) {
  if (!characterName.trim()) return;
  
  this.loading = true;
  this.error = null;
  
  this.characterService.getCharacterByName(characterName).subscribe({
    next: (response) => {
      this.searchResults = response.results; // Store search results separately
      this.errorMessage='';
    },
    error: (err) => {
      this.searchResults = []; 
      console.error('Search error:', err);
      this.errorMessage = 'Character Can not be found';
    }
  });
}

loadCharacters(): void {
  this.loading = true;
  this.error = null;

  this.characterService.getCharacters(this.currentPage).subscribe({
    next: (response) => {
      // Append new characters to the existing list
      this.characters = [...this.characters, ...response.results];
      this.loading = false;
       this.groupCharactersIntoRows();
        this.currentPage++;
        console.log(this.characters)
        console.log(this.characters.length)
    },
    error: (err) => {
      this.error = 'Failed to load characters';
      this.loading = false;
      console.error('Error loading characters:', err);
    }
  });
}

/* I needed to group characters in rows of 2 as when trying to use virtual scrolling it would leave a lot of white space,
  this was because when scrolling it only loads the next item. but i needed the next 2 items to display
*/
groupCharactersIntoRows(): void {
  this.charactersRows = [];
  for (let i = 0; i < this.characters.length; i += 2) {
    this.charactersRows.push(this.characters.slice(i, i + 2));
  }
}



onScrolledIndexChange(index: number) {
  if (index >= this.charactersRows.length - 5 && !this.loading) {
    this.loadCharacters();
  }
}



}
