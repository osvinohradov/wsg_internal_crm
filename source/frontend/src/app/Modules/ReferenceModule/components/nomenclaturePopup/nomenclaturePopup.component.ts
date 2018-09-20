import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'nomenclature-popup-ref',
  templateUrl: './nomenclaturePopup.component.html',
  styleUrls: ['./nomenclaturePopup.component.css', './../nomenclature/nomenclature.component.css']

})
export class NomenclaturePopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NomenclaturePopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
