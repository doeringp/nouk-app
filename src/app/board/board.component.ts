import { Component, OnInit } from '@angular/core';
import { firstNames } from '../firstnames';
import { FirstName, Gender } from '../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  girls: FirstName[] = firstNames.filter(x => x.gender == Gender.Female);
  boys: FirstName[] = firstNames.filter(x => x.gender == Gender.Male);

  constructor() { }

  ngOnInit(): void {
  }

}
