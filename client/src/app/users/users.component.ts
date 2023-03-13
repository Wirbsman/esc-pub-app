import { Component } from '@angular/core';
import {User} from "../user";
import {EscService} from "../esc.service";
import {TEST_USERS} from "../test-users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = [];

  users1 = TEST_USERS;

  imagePath = "assets/images/flags20/";

  constructor(private escService: EscService) {}

  getUsers(): void {
    this.escService.getUsers().subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }


  save() {

  }

  undo() {

  }
}
