import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  // private apiUrl = 'http://54.89.213.90:3000/api/favourites';

  private apiUrl = 'http://localhost:3000/api/favourites';

  constructor(private http: HttpClient) { }

  // Method used to retrieve favourites from database (Get Request)
  getFavourites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // Adds a persons favourite to database (Post Request)
  addFavourite(favourite: any): Observable<any> {
    return this.http.post(this.apiUrl, favourite);
  }
  
  // Uses characterid to remove from database
  removeFavourite(characterId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${characterId}`);
  }
  
}
