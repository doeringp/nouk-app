import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstNameService as FirstNamesService } from './firstnames.service';
import { NamesPageComponent } from './names-page/names-page.component';
import { NamesListComponent } from './names-list/names-list.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NamesPageComponent,
    SearchPageComponent,
    NamesListComponent
  ],
  exports: [
    NamesPageComponent,
    SearchPageComponent
  ],
  providers: [
    FirstNamesService
  ]
})
export class FirstNamesModule { }
