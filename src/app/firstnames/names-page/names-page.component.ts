import { Component, OnInit } from '@angular/core';
import { FirstName, Gender } from '../models';
import { FirstNamesService } from '../firstnames.service';

@Component({
  selector: 'app-names-page',
  templateUrl: './names-page.component.html',
  styleUrls: ['./names-page.component.scss']
})
export class NamesPageComponent implements OnInit {
  girls: FirstName[] = [];
  boys: FirstName[] = [];

  constructor(
    private firstNameService: FirstNamesService) {}

  async ngOnInit() {
    this.girls = await this.firstNameService.list(Gender.Female);
    this.boys = await this.firstNameService.list(Gender.Male);
  }
}
