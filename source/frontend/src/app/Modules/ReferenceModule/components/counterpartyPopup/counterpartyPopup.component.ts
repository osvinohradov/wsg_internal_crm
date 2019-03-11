import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CounterpartyModel } from "../../models";
//import { CounterpartyService } from "../../services";

@Component({
  selector: 'counterparty-popup-ref',
  templateUrl: './counterpartyPopup.component.html',
  styleUrls: ['./counterpartyPopup.component.css', './../counterparty/counterparty.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CounterpartyPopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  // constructor(
  //   public dialogRef: MatDialogRef<CounterpartyReference>,
  //   @Inject(MAT_DIALOG_DATA) public counterparty: CounterpartyReference,
  //   public CounterpartyService: CounterpartyService
  // ) {
  //   if (!this.counterparty) {
  //     this.counterparty = new CounterpartyReference();
  //   }
  // }

  ngOnInit() {}

  // update_counterparty(counterparty: CounterpartyReference) {
  //   this.CounterpartyService.update_counterparty(counterparty).subscribe(data => {
  //     this.counterparty = data as CounterpartyReference;
  //   });
  // }

  // save_counterparty(counterparty: CounterpartyReference) {
  //   this.CounterpartyService.save_counterparty(counterparty).subscribe(data => {
  //     let tmp = data as CounterpartyReference;
  //     if (!tmp._id) {
  //       this.is_saved = false;
  //     } else {
  //       console.log('counterparty:', counterparty)
  //       this.counterparty = tmp;
  //       this.is_saved = true;
  //     }
  //   });
  // }

  // remove_counterparty(counterparty_id: string) {
  //   if (!counterparty_id) {
  //     console.log(`counterparty_id не передано.`);
  //     // Show error dialog
  //     return;
  //   }

  //   this.CounterpartyService.remove_counterparty(counterparty_id).subscribe(() => {
  //     this.dialogRef.close({ action: "remove", id: counterparty_id, element: null });
  //   });
  // }

  // save_and_close(counterparty: CounterpartyReference) {
  //   // Save ticket
  //   this.save_update_counterparty(counterparty);
  //   this.close_dialog(counterparty);
  // }

  // save_update_counterparty(counterparty: CounterpartyReference) {
  //   if (!counterparty._id) {
  //     this.save_counterparty(counterparty);
  //   } else {
  //     this.update_counterparty(counterparty);
  //     this.is_saved = true;
  //   }
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
