import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './map/map.component';
import { HeroComponent } from './hero/hero.component';
import { HighwaysComponent } from './highways/highways.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    NavigationComponent,
    MapComponent,
    HeroComponent,
    HighwaysComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
