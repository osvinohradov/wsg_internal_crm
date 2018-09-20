import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'avia-print-score-with-stamp-popup',
  templateUrl: './printScoreWithStamp.component.html',
  styleUrls: ['./printScoreWithStamp.component.css' ]
})
export class AviaPrintScoreWithStampPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AviaPrintScoreWithStampPopupComponent>
  ) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
