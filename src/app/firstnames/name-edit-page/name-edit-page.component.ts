import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstName, Gender } from '../models';
import { FirstNamesService } from '../firstnames.service';

@Component({
  selector: 'app-name-edit-page',
  templateUrl: './name-edit-page.component.html',
  styleUrls: ['./name-edit-page.component.scss']
})
export class NameEditPageComponent implements OnInit {
  model: FirstName = new FirstName();
  Gender = Gender;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firstNameService: FirstNamesService) { }

  ngOnInit(): void {
    this.model.name = this.route.snapshot.paramMap.get("value");
  }

  onSubmit(): void {
    this.firstNameService.add(this.model);
    this.router.navigateByUrl('');
  }
}
