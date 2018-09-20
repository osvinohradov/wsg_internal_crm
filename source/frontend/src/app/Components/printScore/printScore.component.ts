import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'avia-print-score-popup',
  templateUrl: './printScore.component.html',
  styleUrls: ['./printScore.component.css' ]
})
export class AviaPrintScorePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AviaPrintScorePopupComponent>
  ) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
