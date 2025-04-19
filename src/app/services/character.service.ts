import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Character, CharacterResponse } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiURL = 'https://rickandmortyapi.com/api';

  getCharacters(page = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(
      `${this.apiURL}/character?page=${page}`
    ).pipe(
      catchError(error => {
        console.error('Error fetching characters:', error);
        return throwError(() => new Error('Failed to load characters'));
      })
    );
  }

  getCharacterByName(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(
      `${this.apiURL}/character/?name=${name}`
    ).pipe(
      catchError(error => {
        console.error('Error searching characters:', error);
        return throwError(() => new Error('Character search failed'));
      })
    );
  }
}