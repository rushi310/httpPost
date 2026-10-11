import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent {
  message: string;

  constructor(private dialogRef: MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) dialogMessage: string
  ) {
    this.message = dialogMessage;
  }

  closeDialog(isConfirmed: boolean) {
    this.dialogRef.close(isConfirmed);
  }
}
