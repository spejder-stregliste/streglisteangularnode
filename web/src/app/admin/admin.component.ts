import { Component, OnDestroy, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { Subscription } from "rxjs";
import { GlobalService, Status } from "../services/global.service";

import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    imports: [MatFormField, MatLabel, MatInput, FormsModule, MatButton, MatIcon, MatSelect, MatOption]
})
export class AdminComponent implements OnInit, OnDestroy {
    public autherized: boolean = false;
    public password: string = "";
    public selected: "up" | "unavailable" = 'up';

    private $authSource: Subscription | undefined;

    constructor(private adminService: AdminService, private globalService: GlobalService) { }

    ngOnInit(): void {
        this.$authSource = this.adminService.autherized.subscribe({
            next: (r: boolean) => {
                this.autherized = r;
            }
        })
    }
    ngOnDestroy(): void {
        if (this.$authSource != null) {
            this.$authSource.unsubscribe();
        }
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