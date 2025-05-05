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

  ngOnInit(): void {
    this.loadEpisodes();
    console.log(this.selectedSeason);
    
  }

  loadEpisodes(): void {
    this.loading = true;
    this.error = null;

    this.episodeService.getEpisodes(this.currentPage).subscribe({
      next: (response) => {
        this.allEpisodes = [...this.allEpisodes, ...response.results]; // <--- all episodes stored
        this.episodes = [...this.allEpisodes];  // <--- copy for display
        this.groupEpisodesIntoRows();
        this.totalPages = response.info.pages;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load episodes';
        this.loading = false;
      }
    });
  }

  groupEpisodesIntoRows(): void {
    this.episodeRows = [];
    for (let i = 0; i < this.episodes.length; i += 3) { 
      this.episodeRows.push(this.episodes.slice(i, i + 3));
    }
  }

  filterBySeason(selectedSeason: string): void {


    this.selectedSeason = selectedSeason;

    if (!this.selectedSeason) {
      this.episodes = [...this.allEpisodes];  
    } else {
      const seasonNumber = parseInt(this.selectedSeason, 10);
      this.episodes = this.allEpisodes.filter(episode => {
        const seasonString = episode.episode?.substring(1, 3);
        const season = seasonString ? parseInt(seasonString, 10) : NaN;
        return season === seasonNumber;
      });
    }

    this.groupEpisodesIntoRows();  // Regroup after filter
  }

  onScrolledIndexChange(index: number): void {
    const buffer = 5;
    if (index >= this.episodeRows.length - buffer && !this.loading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEpisodes();
    }
  }
}
