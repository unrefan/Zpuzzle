import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {NotifyService} from './services/notify.service';
import {Auth0Service} from './services/auth0.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GameComponent } from './components/game/game.component';
import {AuthGuard} from './guards/auth.guard';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GameComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [NotifyService, Auth0Service, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
