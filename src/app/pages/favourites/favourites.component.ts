import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../../services/favourites.service';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  imports: [CardComponent, CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit{


  favourites: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private favouritesService: FavouritesService) {}

  // On load it gets all the favourites using favourite service
  ngOnInit(): void {
    this.favouritesService.getFavourites().subscribe({
      next: (data) => {
        this.favourites = data; // adds favourites to the array of favourites
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load your favourites';
        this.loading = false;
      }
    });
  }
}