import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatButton } from "@angular/material/button";

export interface DialogData {
    name: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [CdkScrollable, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onClick(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
