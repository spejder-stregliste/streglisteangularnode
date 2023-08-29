import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'lines', 'amount', 'edit'];
  value = 'Clear me';
  users: User[] = []
  creating: boolean = false;
  newUser: string = "";
  private $dataSource: Subscription | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.$dataSource = this.userService.users.subscribe(r => {
      this.users = r;
    }, () => {
      window.alert("Kan ikke hente brugere");
    });
    }

  ngOnDestroy(): void {
    if (this.$dataSource != null) {
      this.$dataSource.unsubscribe();
    }
  }

  toggleEdit(user: User) {
    user.editing = true;
  }

  update(user: User) {
    this.userService.updateUser(user).then(res => {
      user.lines = res?.lines;
      user.editing = false;
      if (res?.lines !== undefined && res?.lines >= 40) {
        window.alert("Betal din regning din bums!")
      }
    }, () => {
      window.alert("Kan ikke gemme");
      this.userService.updateAll().then(r => {
        this.users = r ?? [];
      }, () => {
        this.users = [];
      });
    })
  }

  increment(user: User) {
    user.lines!++;
  }

  decrement(user: User) {
    user.lines!--;
  }

  createUser() {
    this.creating = true;
  }

  sendNewUser() {
    if (this.newUser == null || this.newUser.length < 1) {
      return;
    }
    this.creating = false;
    this.userService.addUser(new User(this.newUser, 0)).then(() => {
      this.userService.updateAll().then(r => {
        this.users = r ?? [];
      }, () => {
        this.users = [];
      });
    }, () => {
      window.Error("Kan ikke oprette bruger");
      this.users = [];
    })
    this.newUser = ""
  }
}
