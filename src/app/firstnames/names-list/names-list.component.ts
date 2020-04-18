import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirstName, Gender } from '../models';
import { FirstNamesService } from '../firstnames.service';

@Component({
  selector: 'app-names-list',
  templateUrl: './names-list.component.html',
  styleUrls: ['./names-list.component.scss']
})
export class NamesListComponent implements OnInit {

  @Input() names: FirstName[] = [];
  @Input() showIcon: boolean = true;
  @Output() liked: EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private firstNameService: FirstNamesService
  ) { }

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

  async like(name: FirstName, positive: Boolean) {
    if (positive) {
      name.likes += 1;
      name.rating += 1;
    } else {
      name.dislikes += 1;
      name.rating -= 1;
    }
    name.lastRatedAt = new Date();
    await this.firstNameService.update(name);
    this.liked.emit(true);
  }
}
