import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';
import { AviaCompanyPopupReferencesComponent } from './../aviaCompanyPopup/aviaCompanyPopup.component';

@Component({
  selector: 'aviaCompany-ref',
  templateUrl: './aviaCompany.component.html',
  styleUrls: ['./aviaCompany.component.css']
})
export class AviaCompanyReferencesComponent implements OnInit {

  public nomencaltureAirline:string = 'ADRIA AIRWAYS';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AviaCompanyPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '40%',
      height: '48%'
    });
  }
}
