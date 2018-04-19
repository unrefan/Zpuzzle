import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {NotifyService} from './services/notify.service';
import {Auth0Service} from './services/auth0.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GameComponent } from './components/game/game.component';
import {AuthGuard} from './guards/auth.guard';
import { NotificationComponent } from './components/notification/notification.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {AngularDraggableModule} from 'angular2-draggable';
import { ScoresComponent } from './components/scores/scores.component';
import {ScoreService} from './services/score.service';
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GameComponent,
    NotificationComponent,
    NavigationComponent,
    ScoresComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [NotifyService, Auth0Service, AuthGuard, ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
