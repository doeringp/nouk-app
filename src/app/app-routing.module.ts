import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NamesPageComponent } from './firstnames/names-page/names-page.component';
import { SearchPageComponent } from './firstnames/search-page/search-page.component';


const routes: Routes = [
  { path: '', component: NamesPageComponent, pathMatch: 'full'},
  { path: 'search', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
