import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { MapComponent } from './map/map.component';
import { HeroComponent } from './hero/hero.component';
import { HighwaysComponent } from './highways/highways.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'map' },
  { path: 'signin-oidc', pathMatch: 'full', redirectTo: 'map' },
  { path: 'signout-callback-oidc', pathMatch: 'full', redirectTo: 'map' },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'highway', component: HighwaysComponent },
  { path: '**', redirectTo: 'map' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
