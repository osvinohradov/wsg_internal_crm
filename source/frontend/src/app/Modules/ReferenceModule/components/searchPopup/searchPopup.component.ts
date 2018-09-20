import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'search-popup-ref',
  templateUrl: './searchPopup.component.html',
  styleUrls: ['./searchPopup.component.css']

})
export class SearchPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SearchPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
