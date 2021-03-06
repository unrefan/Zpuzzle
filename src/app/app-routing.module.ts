import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './components/game/game.component';
import {AuthGuard} from './guards/auth.guard';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'game', component: GameComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
