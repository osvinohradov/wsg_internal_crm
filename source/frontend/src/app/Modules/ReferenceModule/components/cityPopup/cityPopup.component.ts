import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'city-popup-ref',
  templateUrl: './cityPopup.component.html',
  styleUrls: ['./cityPopup.component.css', './../city/city.component.css']

})
export class CityPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CityPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
