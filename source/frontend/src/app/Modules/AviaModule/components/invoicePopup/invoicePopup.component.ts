import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AviaInvoice } from "../../models";
import { AviaService } from "../../services/avia.service";

@Component({
  selector: "app-invoice-popup",
  templateUrl: "./invoicePopup.component.html",
  styleUrls: [
    "./invoicePopup.component.css",
    "./../invoice/invoice.component.css"
  ]
})
export class AviaInvoicePopupComponent implements OnInit {
  public is_saved: Boolean = false;

  public test_date = "12.09.2018 17:45:00"

  // Вынести в БД и получать формы оплаты по запросу
  public selected_payment_form: string;
  public payment_forms:any[] = ["Банківська картка", "Безготівковий розрахунок"];

  public mock_currency_exchange = [
    { _id: "0", Name: "$" },
    { _id: "1", Name: "Evro" },
    { _id: "1", Name: "грн" }
  ]

  public currency_exchanges = this.mock_currency_exchange;



  constructor(
    public dialogRef: MatDialogRef<AviaInvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public avia_invoice: AviaInvoice,
    public AviaService: AviaService
  ) {
    if (!this.avia_invoice) {
      this.avia_invoice = new AviaInvoice();
    }
  }
  ngOnInit() {}

  update_airport(avia_invoice: AviaInvoice) {
    this.AviaService.update_avia_invoice(avia_invoice).subscribe(data => {
      this.avia_invoice = data as AviaInvoice;
    });
  }

  save_airport(airport: AviaInvoice) {
    console.log('Save avia invoice:', airport)
    // this.AviaService.save_avia_invoice(airport).subscribe(data => {
    //   let tmp = data as AviaInvoice;
    //   if (!tmp._id) {
    //     this.is_saved = false;
    //   } else {
    //     this.avia_invoice = tmp;
    //     this.is_saved = true;
    //   }
    // });
  }

  remove_airport(avia_invoice_id: string) {
    if (!avia_invoice_id) {
      console.log(`avia_invoice_id не передано.`);
      // Show error dialog
      return;
    }

    this.AviaService.remove_avia_invoice(avia_invoice_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: avia_invoice_id, element: null });
    });
  }

  save_and_close(avia_invoice: AviaInvoice) {
    // Save ticket
    this.save_update_airport(avia_invoice);
    this.close_dialog(avia_invoice);
  }

  save_update_airport(avia_invoice: AviaInvoice) {
    if (!avia_invoice._id) {
      this.save_airport(avia_invoice);
    } else {
      this.update_airport(avia_invoice);
      this.is_saved = true;
    }
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
