import { Component, effect, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalService, Status } from '../services/global.service';
import { Sort, MatSort, MatSortHeader } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatIcon, MatCellDef, MatCell, MatInput, FormsModule, NgStyle, MatMiniFabButton, MatButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFormField, MatLabel]
})
export class HomeComponent {
  readonly displayedColumns: string[] = ['name', 'lines', 'amount', 'edit'];
  readonly datasource: MatTableDataSource<User> = new MatTableDataSource();
  readonly users: WritableSignal<User[]>;
  readonly status: WritableSignal<Status> = signal({ status: "loading" });
  readonly creating: WritableSignal<boolean> = signal(false);
  readonly editingRows: WritableSignal<Set<string>> = signal(new Set())
  newUser: string = "";
  private sort: WritableSignal<Sort | undefined> = signal(undefined);

  constructor(private userService: UserService, public dialog: MatDialog, private globalService: GlobalService) {
    this.users = userService.users;
    effect(() => this.users.update(users => this.sortData(users, this.sort())));
    this.status = this.globalService.status
    effect(() => this.datasource.data = this.users());
  }

  setEditing(user: User, editing: boolean) {
    this.editingRows.update(s => {
      const set = new Set(s)
      editing ? set.add(user.name!) : set.delete(user.name!);
      return set
    })
  }

  update(user: User) {
    this.userService.updateUser(user).then(res => {
      if (res.status) {
        this.setEditing(user, false);
        if (res?.lines !== undefined && res?.lines >= 40) {
          this.dialog.open(DialogComponent, {
            data: { name: user.name },
          });
        }
      }
      else {
        window.alert("Kan ikke gemme");
      }
    }, () => {
      window.alert("Kan ikke gemme");
      this.userService.updateAll().then(() => {
      }, () => {
        this.users.set([]);
      });
    })
  }

  increment(user: User) {
    this.userService.increment(user)
  }

  decrement(user: User) {
    this.userService.decrement(user)
  }

  createUser() {
    this.creating.set(true);
  }

  sendNewUser() {
    if (this.newUser == null || this.newUser.length < 1) {
      return;
    }
    this.creating.set(false);
    this.userService.addUser(new User(this.newUser, 0)).then(res => {
      if (!res) {
        window.Error("Kan ikke oprette bruger");
        this.users.set([]);
      }
    }, () => {
      window.Error("Kan ikke oprette bruger");
      this.users.set([]);
    })
    this.newUser = ""
  }

  sortData(users: User[], sort: Sort | undefined) {
    const data = [...users];
    if (!sort || !sort.active || sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = sort!.direction === 'asc';
      switch (sort!.active) {
        case 'name':
          return compare({ first: a.name ?? "", second: a.lines ?? 0 }, { first: b.name ?? "", second: b.lines ?? 0 }, isAsc);
        case 'lines':
          return compare({ first: a.lines ?? 0, second: a.name ?? "" }, { first: b.lines ?? 0, second: b.name ?? "" }, isAsc);
        default:
          return 0;
      }
    });
  }

  setSort(sort: Sort) {
    this.sort.set(sort);
  }
}

function compare(a: { first: number | string, second: number | string }, b: { first: number | string, second: number | string }, isAsc: boolean) {
  if (a.first === b.first) {
    return (a.second < b.second ? -1 : 1);
  }
  return (a.first < b.first ? -1 : 1) * (isAsc ? 1 : -1);
}