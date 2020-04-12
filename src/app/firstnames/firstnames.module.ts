import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FirstNamesService } from './firstnames.service';
import { NamesPageComponent } from './names-page/names-page.component';
import { NamesListComponent } from './names-list/names-list.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NameEditPageComponent } from './name-edit-page/name-edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NamesPageComponent,
    NamesListComponent,
    NameEditPageComponent,
    SearchPageComponent
  ],
  exports: [
    NamesPageComponent,
    SearchPageComponent,
    NameEditPageComponent
  ],
  providers: [
    FirstNamesService
  ]
})
export class FirstNamesModule { }
