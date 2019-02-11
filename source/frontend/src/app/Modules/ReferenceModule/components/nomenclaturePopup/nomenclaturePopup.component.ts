import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { NomenclatureReference } from "../../models";
import { RefNomenclatureService } from "../../services";

@Component({
  selector: 'nomenclature-popup-ref',
  templateUrl: './nomenclaturePopup.component.html',
  styleUrls: ['./nomenclaturePopup.component.css', './../nomenclature/nomenclature.component.css']

})
export class NomenclaturePopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NomenclaturePopupReferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public nomenclature: NomenclatureReference,
    public NomenclatureService: RefNomenclatureService
  ) {
    if (!this.nomenclature) {
      this.nomenclature = new NomenclatureReference();
    }
  }

  ngOnInit() {}

  update_nomenclature(nomenclature: NomenclatureReference) {
    // this.NomenclatureService.update_nomenclature(nomenclature).subscribe(data => {
    //   this.nomenclature = data as NomenclatureReference;
    // });
  }

  save_nomenclature(nomenclature: NomenclatureReference) {
    // this.NomenclatureService.save_nomenclature(nomenclature).subscribe(data => {
    //   let tmp = data as NomenclatureReference;
    //   if (!tmp._id) {
    //     this.is_saved = false;
    //   } else {
    //     this.nomenclature = tmp;
    //     this.is_saved = true;
    //   }
    // });
  }

  remove_nomenclature(nomenclature_id: string) {
    // if (!nomenclature_id) {
    //   console.log(`nomenclature_id не передано.`);
    //   // Show error dialog
    //   return;
    // }

    // this.NomenclatureService.remove_nomenclature(nomenclature_id).subscribe(() => {
    //   this.dialogRef.close({ action: "remove", id: nomenclature_id, element: null });
    // });
  }

  save_and_close(nomenclature: NomenclatureReference) {
    // Save ticket
    this.save_update_nomenclature(nomenclature);
    this.close_dialog(nomenclature);
  }

  save_update_nomenclature(nomenclature: NomenclatureReference) {
    // if (!nomenclature._id) {
    //   this.save_nomenclature(nomenclature);
    // } else {
    //   this.update_nomenclature(nomenclature);
    //   this.is_saved = true;
    // }
  }

  /**
   *
   * data = {
   * action: "" (create, update, remove),
   * id: "",
   * element: Object
   * }
   *
   * @param data
   */
  close_dialog(data): void {
    console.log("Close dialog:", data);
    if (!this.is_saved) {
      this.dialogRef.close(null);
    } else {
      this.dialogRef.close(data);
    }
  }
}
