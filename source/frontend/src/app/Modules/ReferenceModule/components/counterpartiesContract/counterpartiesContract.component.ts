import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CounterpartiesContractPopupReferencesComponent } from './../counterpartiesContractPopup/counterpartiesContractPopup.component';


@Component({
  selector: 'counterparties-contract-ref',
  templateUrl: './counterpartiesContract.component.html',
  styleUrls: ['./counterpartiesContract.component.css']
})
export class CounterpartiesContractReferencesComponent implements OnInit {

  public contractDate:string = '2016/03/28';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CounterpartiesContractPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: 'auto'
    });

  }
}
