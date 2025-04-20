import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { Episode } from '../../models/episode';
import { EpisodesService } from '../../services/episodes.service';

@Component({
  selector: 'app-episodes',
  imports: [CommonModule, EpisodeCardComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

episodes: Episode [] = []
loading = true;
error: string | null = null;
errorMessage:string ='';
currentPage = 1;

 constructor(public episodeService: EpisodesService){}

 ngOnInit(): void {
  this.loadEpisodes();

}


loadEpisodes(): void{

  this.loading = true;
  this.error = null;

  this.episodeService.getEpisodes(this.currentPage).subscribe({
    next: (response) => {
      // Append new characters to the existing list
      this.episodes = [...this.episodes, ...response.results];
      this.loading = false;
      console.log(this.episodes);
    },
    error: (err) => {
      this.error = 'Failed to load episodes';
      this.loading = false;
      console.error('Error loading episodes:', err);
    }
  })
}
}
