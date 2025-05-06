import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { Episode } from '../../models/episode';
import { EpisodesService } from '../../services/episodes.service';
import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episodes',
  imports: [CommonModule, EpisodeCardComponent, ScrollingModule, FormsModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

  allEpisodes: Episode[] = [];
  episodes: Episode[] = [];
  episodeRows: Episode[][] = [];
  loading = true;
  error: string | null = null;
  currentPage = 1;
  totalPages = 0;
  selectedSeason: string = '';

  constructor(public episodeService: EpisodesService) {}

  // On load, load the episodes
  ngOnInit(): void {
    this.loadEpisodes();
    console.log(this.selectedSeason);
    
  }


  loadEpisodes(): void {
    this.loading = true;
    this.error = null;
  
    this.episodeService.getEpisodes(this.currentPage).subscribe({
      next: (response) => {
        this.allEpisodes = [...this.allEpisodes, ...response.results]; // Gets Every page results
        this.episodes    = [...this.allEpisodes];                  // creates seperate array of episodes for filtering
        this.groupEpisodesIntoRows();                              // group episodes again 
        this.totalPages  = response.info.pages;                    // count total number of pages
        this.loading     = false;                                  //turn off your loading spinner
      },
      error: (err) => {
        this.error   = 'Failed to load episodes';                 
        this.loading = false;                                     
      }
    });
  }

  // Sorts the episodes by newest to oldest
  sortEpisodes(order: string): void {
    // Sorts in order of oldest to newest
    this.episodes.sort(
      (a, b) => +new Date(a.air_date) - +new Date(b.air_date)
    );
  
    // If user wants newest reverse array
    if (order === 'newest') {
      this.episodes.reverse();
    }
    this.groupEpisodesIntoRows();
  }
  
  

  groupEpisodesIntoRows(): void {
    this.episodeRows = [];
  
    for (let i = 0; i < this.episodes.length; i += 3) {
      const row = this.episodes.slice(i, i + 3);
  
      // Pad the last row so it always has 3 items
      while (row.length < 3) {
        row.push(null as any);
      }
  
      this.episodeRows.push(row);
    }
  }
  

// Filtering Data by season
  filterBySeason(season: string): void {
    this.selectedSeason = season;
    // If !season, show all episodes
    if (!season) {
      this.episodes = [...this.allEpisodes];
      this.groupEpisodesIntoRows();
    } else {
      this.loading = true;
      this.error   = null;
      // Requests episodes for the season selected
      this.episodeService.getEpisodesBySeason(season).subscribe({
        next: response => {
          this.episodes   = response.results;    // only filtered results
          this.groupEpisodesIntoRows();       
          this.loading    = false;
        },
        error: () => {
          this.error   = 'Failed to load season ' + season;
          this.loading = false;
        }
      });
    }
  }
  
  //Resets the filters and displays all episodes
  resetFilters(): void {
    this.selectedSeason = '';
    this.episodes = [...this.allEpisodes];
    this.groupEpisodesIntoRows();
  }

  onScrolledIndexChange(index: number): void {
    const buffer = 5;
    if (index >= this.episodeRows.length - buffer && !this.loading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEpisodes();
    }
  }
}
