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
  isNew: Boolean = true;
  model: FirstName = new FirstName();
  Gender = Gender;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firstNameService: FirstNamesService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isNew = false;
      this.model = await this.firstNameService.get(id);
    } else {
      this.model.name = this.route.snapshot.paramMap.get("value");
    }
    if (!this.model) {
      console.error("No firstname found with id " + id);
      this.goBack();
    }
  }

  async onSubmit() {
    if (this.isNew) {
      await this.firstNameService.add(this.model);
    } else {
      await this.firstNameService.update(this.model);
    }
    this.goBack();

  }

  async onDelete() {
    if (confirm("Bist du sicher?")) {
      await this.firstNameService.remove(this.model);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigateByUrl('');;
  }
}
