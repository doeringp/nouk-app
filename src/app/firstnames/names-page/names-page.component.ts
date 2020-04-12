import { Component, OnInit } from '@angular/core';
import { firstNames } from '../firstnames';
import { FirstName, Gender } from '../models';

@Component({
  selector: 'app-names-page',
  templateUrl: './names-page.component.html',
  styleUrls: ['./names-page.component.scss']
})
export class NamesPageComponent implements OnInit {
  girls: FirstName[] = firstNames.filter(x => x.gender == Gender.Female);
  boys: FirstName[] = firstNames.filter(x => x.gender == Gender.Male);

  constructor() { }

  ngOnInit(): void {
  }

}
