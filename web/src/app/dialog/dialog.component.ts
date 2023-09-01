import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
    name: string;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
})
export class DialogComponent {
    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onClick(): void {
        this.dialogRef.close();
    }
}