import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';
import { ServicePopupReferencesComponent } from './../servicePopup/servicePopup.component';


@Component({
  selector: 'service-ref',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceReferencesComponent implements OnInit {

  public nomenclatureServices:string = 'Air Tickets';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ServicePopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '90vh'
    });
  }
}
