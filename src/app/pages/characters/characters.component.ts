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
      this.characters = [...this.characters, ...response.results]; // This uses the spread operator which spreads out (copies) all current characters into the new array.
      this.loading = false;
       this.groupCharactersIntoRows();
        this.currentPage++;
        console.log(this.characters)
        console.log(this.characters.length)
    },
    error: (err) => {
      this.error = 'Failed to load';
      this.loading = false;
      console.error('error loading the characters:', err);
    }
  });
}

/* To fix virtualisation scrolling being super jumpy as it only loaded 1 at a time, i had to put it into groupsOfRows so we show
each row together 
*/
groupCharactersIntoRows(): void {
  this.charactersRows = [];
  for (let i = 0; i < this.characters.length; i += 2) { // Loops through array in steps of 2 
    this.charactersRows.push(this.characters.slice(i, i + 2)); // gets the characters starting at index i and puts in characterRows array
  }
}



// checks to see if user has scrolled within 3 rows from bottom
onScrolledIndexChange(index: number) {

  // This pre loads next rows before we reach them
  if (index >= this.charactersRows.length - 5 && !this.loading) {
    this.loadCharacters();
  }
}



}
