import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NomenclaturePopupReferencesComponent } from './../nomenclaturePopup/nomenclaturePopup.component';

@Component({
  selector: 'nomenclature-ref',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.css']
})
export class NomenclatureReferencesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(NomenclaturePopupReferencesComponent, {
      height: '98%',
      width: '90vh',
    });
  }
}
