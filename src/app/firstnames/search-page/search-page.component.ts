import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FirstName } from '../models';
import { FirstNamesService } from '../firstnames.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterContentInit  {
  term: string;
  names$: Observable<FirstName[]>;
  @ViewChild("searchBox") searchBox: ElementRef;
  private searchTerms = new Subject<string>();

  constructor(private firstNamesService: FirstNamesService) { }

  ngOnInit(): void {
    this.names$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.firstNamesService.searchNames(term)),
    );
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.searchBox.nativeElement.focus();
    }, 100);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
