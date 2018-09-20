import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CounterpartyPopupReferencesComponent } from './../counterpartyPopup/counterpartyPopup.component';

@Component({
  selector: 'counterparty-ref',
  templateUrl: './counterparty.component.html',
  styleUrls: ['./counterparty.component.css']
})
export class CounterpartyReferencesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  public groupTypeNomenclature:string = 'Інші';

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CounterpartyPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '98%',
      height: '90vh'
    });

  }
}
