import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { Episode } from '../../models/episode';
import { EpisodesService } from '../../services/episodes.service';
import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-episodes',
  imports: [CommonModule, EpisodeCardComponent, ScrollingModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

episodes: Episode [] = []
episodeRows: Episode[][] = []; // 2  eps per row 
loading = true;
error: string | null = null;
errorMessage:string ='';
currentPage = 1;
totalPages = 0;

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
      this.groupEpisodesIntoRows(); 
      this.loading = false;
      this.totalPages = response.info.pages;
      console.log(this.episodes);
    },
    error: (err) => {
      this.error = 'Failed to load episodes';
      this.loading = false;
      console.error('Error loading episodes:', err);
    }
  })
}

groupEpisodesIntoRows(): void {
  this.episodeRows = [];
  for (let i = 0; i < this.episodes.length; i += 3) { 
    this.episodeRows.push(this.episodes.slice(i, i + 3));
  }
}


filterBySeason(){
  
}

onScrolledIndexChange(index: number): void {
  const buffer = 5; 

  if (index >= this.episodeRows.length - buffer && !this.loading && this.currentPage < this.totalPages) {
    this.currentPage++;
    this.loadEpisodes();
  }
}



}
