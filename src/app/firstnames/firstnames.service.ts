import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { firstNames } from './firstnames';
import { FirstName } from './models';

@Injectable({ providedIn: 'root' })
export class FirstNamesService {

  searchNames(term: string): Observable<FirstName[]> {
    if (!term) {
      return of([]);
    }
    let result = firstNames.filter(
      n => n.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    return of(result);
  }
}
