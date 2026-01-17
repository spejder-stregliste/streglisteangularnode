import { Component, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { Subscription } from "rxjs";
import { GlobalService } from "../services/global.service";
import { MatFormField } from "@angular/material/form-field";
import { MatInput, MatLabel } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";
import { User, UserService } from "../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { RouterLink } from "@angular/router";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    imports: [RouterLink, MatFormField, MatTable, MatInput, MatColumnDef, FormsModule, MatButton, MatIcon, MatSelect, MatOption, MatLabel, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatCell, MatHeaderCell, MatRow]
})
export class AdminComponent implements OnDestroy {
    public autherized: WritableSignal<boolean> = signal(false);
    public password: string = "";
    public selected: "up" | "unavailable" = 'up';
    public displayedColumns: string[] = ['name', 'edit'];
    public users: WritableSignal<User[]>;

    private $dataSource: Subscription | undefined;


    constructor(private adminService: AdminService, private globalService: GlobalService, private userService: UserService, private dialog: MatDialog) {
        this.users = this.userService.users;
        this.autherized = this.adminService.autherized;
    }

    ngOnDestroy(): void {
        if (this.$dataSource != null) {
            this.$dataSource.unsubscribe();
        }
    }

    delete(user: User) {
        const res = this.dialog.open(ConfirmDialogComponent, {
            data: { name: user.name },
        });
        res.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.userService.deleteUser(user).then(res => {
                    if (!res) {
                        window.Error("Kan ikke slette bruger");
                        this.users.set([]);
                    }
                },
                    () => {
                        window.Error("Kan ikke slette bruger")
                        this.users.set([]);
                    }
                );
            }
        })

    }

    async sendPassword(): Promise<void> {
        this.adminService.autherize({ secret: this.password }).then(res => {
            if (!res) {
                window.Error("Kan ikke logge ind");
            }

        },
            () => {
                window.Error("Kan ikke logge ind")
            }
        );
        this.password = "";
    }

    async updateStatus(): Promise<void> {
        this.globalService.updateStatus({ status: this.selected }).then(res => {
            if (!res) {
                window.Error("Kan ikke ændre status");
            }
        },
            () => {
                window.Error("Kan ikke ændre status")
            }
        );
    }
}