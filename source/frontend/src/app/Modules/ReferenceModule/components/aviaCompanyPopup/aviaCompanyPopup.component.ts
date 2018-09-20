import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'avia-company-popup-ref',
  templateUrl: './aviaCompanyPopup.component.html',
  styleUrls: ['./aviaCompanyPopup.component.css', './../aviaCompany/aviaCompany.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class AviaCompanyPopupReferencesComponent implements OnInit {

  public nomencaltureAirlinePopup:string = 'ADRIA AIRWAYS';

  constructor(public dialogRef: MatDialogRef<AviaCompanyPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
