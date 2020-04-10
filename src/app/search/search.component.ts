import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FirstName } from '../models';
import { firstNames } from '../firstnames';
import { FirstNameService } from '../firstname.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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
