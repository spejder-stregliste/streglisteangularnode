import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalService, Status } from '../services/global.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'lines', 'amount', 'edit'];
  value = 'Clear me';
  usersSorted: User[] = [];
  users: User[] = [];
  status: Status | undefined = { status: "loading" };
  creating: boolean = false;
  newUser: string = "";
  private sort: Sort | undefined;
  private $dataSource: Subscription | undefined;
  private $statusSource: Subscription | undefined;

  constructor(private userService: UserService, public dialog: MatDialog, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.$dataSource = this.userService.users.subscribe({
      next: (r) => {
        if (r) {
          this.users = r;
          this.sortData();
        } else {
          this.users = [];
          this.sortData();
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
        this.sortData();
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
        this.sortData();
      }
    }, () => {
      window.Error("Kan ikke oprette bruger");
      this.users = [];
      this.sortData();
    })
    this.newUser = ""
  }

  sortData() {
    const data = [...this.users];
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      this.usersSorted = data;
      return;
    }

    this.usersSorted = data.sort((a, b) => {
      const isAsc = this.sort!.direction === 'asc';
      switch (this.sort!.active) {
        case 'name':
          return compare({first: a.name ?? "", second: a.lines ?? 0}, {first: b.name ?? "", second: b.lines ?? 0}, isAsc);
        case 'lines':
          return compare({first: a.lines ?? 0, second: a.name ?? ""}, {first: b.lines ?? 0, second: b.name ?? ""}, isAsc);
        default:
          return 0;
      }
    });
  }

  setSort(sort: Sort) {
    this.sort = sort;
    this.sortData();
  }
}



function compare(a: { first: number | string, second: number | string }, b: { first: number | string, second: number | string }, isAsc: boolean) {
  if (a.first === b.first) {
    return (a.second < b.second ? -1 : 1);
  }
  return (a.first < b.first ? -1 : 1) * (isAsc ? 1 : -1);
}