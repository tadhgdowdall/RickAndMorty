import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

// URL For retrieving all characters 
url = 'https://rickandmortyapi.com/api/character';

  constructor() { }
}
