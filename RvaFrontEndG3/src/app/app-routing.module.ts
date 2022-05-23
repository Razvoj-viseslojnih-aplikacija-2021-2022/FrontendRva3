import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { PorudzbinaComponent } from './components/model/porudzbina/porudzbina.component';
import { DobavljacComponent } from './components/model/dobavljac/dobavljac.component';
import { ArtiklComponent } from './components/model/artikl/artikl.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'artikl', component: ArtiklComponent},
  {path: 'dobavljac', component: DobavljacComponent},
  {path: 'porudzbina', component: PorudzbinaComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'about', component: AuthorComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
