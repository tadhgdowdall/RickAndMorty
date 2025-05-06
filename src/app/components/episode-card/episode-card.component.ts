import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Episode } from '../../models/episode';

@Component({
  selector: 'app-episode-card',
  imports: [CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css'
})
export class EpisodeCardComponent {

  @Input() episode!: Episode;
  @Input() showCharacters: boolean = false;


  getSeasonNumber(): string {
    // Gets the season number 
    return this.episode.episode.substring(1, 3);
  }
  
  getEpisodeNumber(): string {
    // Gets episode number
    return this.episode.episode.substring(4, 6);
  }
  
  getCharacterId(characterUrl: string): string {
    // Gets ID From URL
    return characterUrl.split('/').pop() || '';
  }
}
