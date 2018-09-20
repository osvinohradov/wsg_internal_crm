import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'curator-popup-ref',
  templateUrl: './curatorPopup.component.html',
  styleUrls: ['./curatorPopup.component.css', './../curator/curator.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CuratorPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CuratorPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
