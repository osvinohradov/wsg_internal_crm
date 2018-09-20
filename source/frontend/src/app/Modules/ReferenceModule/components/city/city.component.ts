import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityPopupReferencesComponent } from './../cityPopup/cityPopup.component';
import { SearchPopupReferencesComponent } from './../searchPopup/searchPopup.component';

@Component({
  selector: 'city-ref',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityReferencesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CityPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
    });
  }

  openSearchDialog(): void {
    let dialogRef = this.dialog.open(SearchPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '90vh'
    });
  }
}
