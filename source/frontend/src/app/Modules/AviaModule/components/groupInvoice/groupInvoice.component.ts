import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AviaGroupInvoicePopupComponent } from '../groupInvoicePopup/groupInvoicePopup.component';
import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';


@Component({
  selector: 'avia-group-invoice',
  templateUrl: './groupInvoice.component.html',
  styleUrls: ['./groupInvoice.component.css']
})
export class AviaGroupInvoiceComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(AviaGroupInvoicePopupComponent, {
      width: '98%',
      height: '90vh'
    });

  }
  openPrintInvoice(): void {
    let dialogRef = this.dialog.open(AviaPrintInvoicePopupComponent, {
      width: '98%',
      height: '90vh'
    });

  }
  openPrintAct(): void {
    let dialogRef = this.dialog.open(AviaPrintActPopupComponent, {
      width: '98%',
      height: '90vh'
    });

  }
  openPrintScore(): void {
    let dialogRef = this.dialog.open(AviaPrintScorePopupComponent, {
      width: '98%',
      height: '90vh'
    });

  }
  openPrintScoreWithStamp(): void {
    let dialogRef = this.dialog.open(AviaPrintScoreWithStampPopupComponent, {
      width: '98%',
      height: '90vh'
    });

  }
  
  ngOnInit() {
  }
}
