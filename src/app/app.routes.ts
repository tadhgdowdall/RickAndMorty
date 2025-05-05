import { Routes } from '@angular/router';
import { RouterModule} from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },          // Default route
    { path: 'characters', component: CharactersComponent },
    { path: 'episodes', component: EpisodesComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirect empty path to /home
    { path: '**', redirectTo: 'home' }                 // Fallback to home
  ];
