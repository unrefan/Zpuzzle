import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {GameComponent} from './components/game/game.component';
import {AuthGuard} from './guards/auth.guard';
import {SignupComponent} from './components/signup/signup.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: SignupComponent},
  {path: 'game', component: GameComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
