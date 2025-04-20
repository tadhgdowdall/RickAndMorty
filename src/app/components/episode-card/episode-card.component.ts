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
    // Extracts season number from episode code (e.g., "S01" from "S01E03")
    return this.episode.episode.substring(1, 3);
  }
  
  getEpisodeNumber(): string {
    // Extracts episode number (e.g., "03" from "S01E03")
    return this.episode.episode.substring(4, 6);
  }
  
  getCharacterId(characterUrl: string): string {
    // Extracts character ID from URL
    return characterUrl.split('/').pop() || '';
  }
}
