import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatButton } from "@angular/material/button";

export interface DialogData {
    name: string;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    imports: [CdkScrollable, MatDialogContent, MatDialogActions, MatButton]
})
export class DialogComponent {
    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onClick(): void {
        this.dialogRef.close();
    }
}