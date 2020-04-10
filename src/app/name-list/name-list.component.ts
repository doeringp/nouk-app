import { Component, OnInit, Input } from '@angular/core';
import { FirstName, Gender } from '../models';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {

  @Input() names: FirstName[] = [];
  @Input() showIcon: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getGenderIconCssClass(name: FirstName) {
    if (!this.showIcon) {
      return {};
    }
    return {
      circular: true,
      icon: true,
      male: name.gender === Gender.Male,
      female: name.gender === Gender.Female
    }
  }

}
