import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FirstName } from '../models';
import { firstNames } from '../firstnames';
import { FirstNameService } from '../firstnames.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  names$: Observable<FirstName[]>;
  private searchTerms = new Subject<string>();

  constructor(private firstNameService: FirstNameService) { }

  ngOnInit(): void {
    this.names$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.firstNameService.searchNames(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
