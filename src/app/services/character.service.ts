import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, retry, tap } from 'rxjs';
import { Character, CharacterResponse } from '../models/character';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

// URL For retrieving all characters 
private apiURL = 'https://rickandmortyapi.com/api/character';

 constructor(private http: HttpClient) { }


 name='rick';

 getCharacters(page = 1): Observable<CharacterResponse> {
  return this.http.get<CharacterResponse>(
    `${this.apiURL}/character?page=${page}`
  );
}

 getCharacterByName(name:string): Observable<Character>{
 return this.http.get<Character>(
  `${this.apiURL}/character/?name=${name}`
 )


 }
}
