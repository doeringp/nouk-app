import { Component, OnInit } from '@angular/core';
import { FirstName, Gender } from '../models';
import { FirstNamesService } from '../firstnames.service';

@Component({
  selector: 'app-names-page',
  templateUrl: './names-page.component.html',
  styleUrls: ['./names-page.component.scss']
})
export class NamesPageComponent implements OnInit {
  Gender = Gender;
  girls: FirstName[] = [];
  boys: FirstName[] = [];

  constructor(
    private firstNameService: FirstNamesService) {}

  ngOnInit() {
    this.reloadData([Gender.Female, Gender.Male]);
  }

  async reloadData(genders: Gender[]) {
    if (genders.indexOf(Gender.Female) > -1) {
      this.girls = await this.firstNameService.list(Gender.Female);
    }
    if (genders.indexOf(Gender.Male) > -1) {
      this.boys = await this.firstNameService.list(Gender.Male);
    }
  }
}
