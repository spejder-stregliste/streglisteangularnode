import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalService, Status } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'lines', 'amount', 'edit'];
  value = 'Clear me';
  users: User[] = []
  status: Status | undefined = {status: "loading"};
  creating: boolean = false;
  newUser: string = "";
  private $dataSource: Subscription | undefined;
  private $statusSource: Subscription | undefined;

  constructor(private userService: UserService, public dialog: MatDialog, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.$dataSource = this.userService.users.subscribe({
      next: (r) => {
        if (r) {
          this.users = r;
        } else {
          this.users = [];
          window.alert("Kan ikke hente brugere");
        }
      }, error: () => {
        window.alert("Kan ikke hente brugere");
      }
    });
    this.$statusSource = this.globalService.status.subscribe({
      next: (r) => {
        if (r) {
          this.status = r;
        }
        else {
          this.status = undefined;
          window.alert("Kan ikke hente status på applikation");
        }
      },
      error: () => {
        window.alert("Kan ikke hente status på applikation");
      }
    })
  }

  ngOnDestroy(): void {
    if (this.$dataSource != null) {
      this.$dataSource.unsubscribe();
    }
    if (this.$statusSource != null) {
      this.$statusSource.unsubscribe();
    }
  }

  toggleEdit(user: User) {
    user.editing = true;
  }

  update(user: User) {
    this.userService.updateUser(user).then(res => {
      if (res.status && res?.lines !== undefined && res?.lines >= 40) {
        this.dialog.open(DialogComponent, {
          data: { name: user.name },
        });
      }
      if (!res.status) {
        window.alert("Kan ikke gemme");
      }
      else {
        user.editing = false;
      }
    }, () => {
      window.alert("Kan ikke gemme");
      this.userService.updateAll().then(() => {
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
    this.userService.addUser(new User(this.newUser, 0)).then(res => {
      if (!res) {
        window.Error("Kan ikke oprette bruger");
        this.users = [];
      }
    }, () => {
      window.Error("Kan ikke oprette bruger");
      this.users = [];
    })
    this.newUser = ""
  }
}
