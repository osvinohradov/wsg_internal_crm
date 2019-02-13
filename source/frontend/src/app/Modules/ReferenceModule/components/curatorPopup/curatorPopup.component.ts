import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl } from '@angular/forms';

import { CuratorReference } from "../../models";
import { RefCuratorService, RefCounterpartyService } from "../../services";


@Component({
  selector: 'curator-popup-ref',
  templateUrl: './curatorPopup.component.html',
  styleUrls: ['./curatorPopup.component.css', './../curator/curator.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CuratorPopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;
  //
  // public counterparty_names: any[] = [];
  // public counterparty_names_control = new FormControl();

  // constructor(
  //   public dialogRef: MatDialogRef<CuratorPopupReferencesComponent>,
  //   @Inject(MAT_DIALOG_DATA) public curator: CuratorReference,
  //   public RefCuratorService: RefCuratorService, private RefCounterpartyService: RefCounterpartyService
  // ) {
  //   if (!this.curator) {
  //     this.curator = new CuratorReference();
  //   }

  //   this.counterparty_names = [
  //     { _id: 0, Name: "First" },
  //     { _id: 1, Name: "Second" },
  //     { _id: 2, Name: "Third" },
  //     { _id: 3, Name: "Fourth" },
  //     { _id: 4, Name: "Fifth" }
  //   ]


  // }

  ngOnInit() {}

  // update_airport(curator: CuratorReference) {
  //   this.RefCuratorService.update_curator(curator).subscribe(data => {
  //     this.curator = data as CuratorReference;
  //   });
  // }

  // save_airport(curator: CuratorReference) {
  //   this.RefCuratorService.save_curator(curator).subscribe(data => {
  //     let tmp = data as CuratorReference;
  //     if (!tmp._id) {
  //       this.is_saved = false;
  //     } else {
  //       this.curator = tmp;
  //       this.is_saved = true;
  //     }
  //   });
  // }

  // remove_airport(curator_id: string) {
  //   if (!curator_id) {
  //     console.log(`curator_id не передано.`);
  //     // Show error dialog
  //     return;
  //   }

  //   this.RefCuratorService.remove_curator(curator_id).subscribe(() => {
  //     this.dialogRef.close({ action: "remove", id: curator_id, element: null });
  //   });
  // }

  // save_and_close(curator: CuratorReference) {
  //   // Save ticket
  //   this.save_update_curator(curator);
  //   this.close_dialog(curator);
  // }

  // save_update_curator(curator: CuratorReference) {
  //   if (!curator._id) {
  //     this.save_airport(curator);
  //   } else {
  //     this.update_airport(curator);
  //     this.is_saved = true;
  //   }
  // }

  // load_couterparty_names(pattern){
  //   console.log('Curator id', pattern);
  //   if(pattern == 'b'){
  //     this.counterparty_names = [
  //       { _id: 10, Name: "bogdan"},
  //       { _id: 10, Name: "boris"}
  //     ]
  //   }
  //   else if(pattern == 'a'){
  //     this.counterparty_names = [
  //       { _id: 10, Name: "arkadiy"},
  //       { _id: 10, Name: "andrew"}
  //     ]
  //   }
  //   this.RefCounterpartyService.get_counterparties_names_ids(pattern).subscribe((data) => {
  //     this.counterparty_names = data;
  //   });
  // }

  // /**
  //  *
  //  * data = {
  //  * action: "" (create, update, remove),
  //  * id: "",
  //  * element: Object
  //  * }
  //  *
  //  * @param data
  //  */
  // close_dialog(data): void {
  //   console.log("Close dialog:", data);
  //   if (!this.is_saved) {
  //     this.dialogRef.close(null);
  //   } else {
  //     this.dialogRef.close(data);
  //   }
  // }

}
