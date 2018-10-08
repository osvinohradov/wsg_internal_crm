import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { AviaGroupInvoiceService } from "../../services";
import { AviaGroupInvoice } from "../../models";

@Component({
  selector: 'avia-group-invoice-popup',
  templateUrl: './groupInvoicePopup.component.html',
  styleUrls: ['./../groupInvoice/groupInvoice.component.css', './groupInvoicePopup.component.css']
})
export class AviaGroupInvoicePopupComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AviaGroupInvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public avia_group_invoice: AviaGroupInvoice,
    public AviaGroupInvoiceService: AviaGroupInvoiceService
  ) {
    if (!this.avia_group_invoice) {
      this.avia_group_invoice = new AviaGroupInvoice();
    }
  }

  ngOnInit() {}

  update_avia_group_invoice(avia_group_invoice: AviaGroupInvoice) {
    this.AviaGroupInvoiceService.update_avia_group_invoice(avia_group_invoice).subscribe(data => {
      this.avia_group_invoice = data as AviaGroupInvoice;
    });
  }

  save_avia_group_invoice(avia_group_invoice: AviaGroupInvoice) {
    this.AviaGroupInvoiceService.save_avia_group_invoice(avia_group_invoice).subscribe(data => {
      let tmp = data as AviaGroupInvoice;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        this.avia_group_invoice = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_avia_group_invoice(avia_group_invoice_id: string) {
    if (!avia_group_invoice_id) {
      console.log(`avia_group_invoice_id не передано.`);
      // Show error dialog
      return;
    }

    this.AviaGroupInvoiceService.remove_avia_group_invoice(avia_group_invoice_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: avia_group_invoice_id, element: null });
    });
  }

  save_and_close(avia_group_invoice: AviaGroupInvoice) {
    // Save ticket
    this.save_update_avia_group_invoice(avia_group_invoice);
    this.close_dialog(avia_group_invoice);
  }

  save_update_avia_group_invoice(avia_group_invoice: AviaGroupInvoice) {
    if (!avia_group_invoice._id) {
      this.save_avia_group_invoice(avia_group_invoice);
    } else {
      this.update_avia_group_invoice(avia_group_invoice);
      this.is_saved = true;
    }
  }

  _get_avia_invoice_content(avia_invoice){
    let info = `Авіаційний квиток № ${avia_invoice.TicketInfo.TicketNumber} для ${
      avia_invoice.TicketInfo.Name //.LastNameNative
    }, за маршрутом: `;
    let additional = "";
    for (let i = 0; i < avia_invoice.FlightInfo.length; i++) {
      additional += `виліт із ${avia_invoice.FlightInfo[i].DeparturePlace} ${
        avia_invoice.FlightInfo[i].DepartureTime
      }, приліт в ${avia_invoice.FlightInfo[i].ArrivalPlace} ${
        avia_invoice.FlightInfo[i].ArrivalTime
      }; `;
    }
    info += additional;
    return info;
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
