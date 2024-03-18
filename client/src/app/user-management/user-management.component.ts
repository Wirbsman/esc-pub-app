import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = {id: 0, name: '', icon: '', admin: false};
  selectedUserId: number | null = null;


  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(values => this.users = values)

  }

  toVote(): void {
    this.router.navigateByUrl("/vote");
  }

  // Methode zum Auswählen eines Benutzers
  selectUser(user: User): void {
    this.selectedUser = user; // Setzen des ausgewählten Benutzers
    this.selectedUserId = user.id; // Speichern der ausgewählten Benutzer-ID
  }

  isSelected(user: User): boolean {
    return this.selectedUserId === user.id;
  }


  removeUser(): void {
    if (!this.selectedUser || !this.selectedUser.id) {
      // Wenn kein Benutzer ausgewählt wurde, brechen Sie die Methode ab
      return;
    }

    this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
      this.getUsers();
    })
    this.selectedUser = {id: 0, name: '', icon: '', admin: false}; // Zurücksetzen des ausgewählten Benutzers
  }

  addUser() {
    if (!this.selectedUser || !this.selectedUser.id) {
      // Wenn kein Benutzer ausgewählt wurde, brechen Sie die Methode ab
      return;
    }
    this.selectedUser.id = 0;

    this.userService.addUser(this.selectedUser).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(): void {
    if (!this.selectedUser || !this.selectedUser.id) {
      // Wenn kein Benutzer ausgewählt wurde, brechen Sie die Methode ab
      return;
    }

    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
      this.getUsers();
    });

  }

}
