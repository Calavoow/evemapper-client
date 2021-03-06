import { Component, OnInit } from '@angular/core';
import {FeathersService} from '../feathers.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  user_name: string;

  constructor(private feathers: FeathersService) { }

  async ngOnInit() {
    const user = this.feathers.user;
    if (user == null) {
      console.error('The user is not logged in.');
      this.feathers.logout();
    }
    this.user_name = user.name;
  }

}
