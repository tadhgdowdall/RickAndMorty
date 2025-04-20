import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EpisodeResponse } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {


  private http = inject(HttpClient);
  private apiURL = 'https://rickandmortyapi.com/api/episode';

  constructor() { }

 // https://rickandmortyapi.com/api/episode

  getEpisodes(page=1): Observable<EpisodeResponse>{

    return this.http.get<EpisodeResponse>(
      `${this.apiURL}?page=${page}`
    ).pipe(
      catchError(error => {
        console.error('Error fetching characters:', error);
        return throwError(() => new Error('Failed to load characters'));
      })
    );
  }
}

