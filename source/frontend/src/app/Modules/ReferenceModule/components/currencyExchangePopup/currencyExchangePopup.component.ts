import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CurrencyExchangeReference } from "../../models";
import { RefCurrencyExchangeService } from "../../services";
import { HttpResponse } from '../../../Common/models/HttpResponseModel';

@Component({
  selector: 'currency-exchange-popup-ref',
  templateUrl: './currencyExchangePopup.component.html',
  styleUrls: ['./currencyExchangePopup.component.css', './../currencyExchange/currencyExchange.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CurrencyExchangePopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CurrencyExchangePopupReferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public currency_exchange: CurrencyExchangeReference,
    public RefCurrencyExchangeService: RefCurrencyExchangeService
  ) {
    if (!this.currency_exchange) {
      this.currency_exchange = new CurrencyExchangeReference();
    }
  }

  ngOnInit() {}

  update_currency_exchange(currency_exchange: CurrencyExchangeReference) {
    this.RefCurrencyExchangeService.update_currency_exchange(currency_exchange).subscribe((response: HttpResponse) => {
      this.currency_exchange = response.data as CurrencyExchangeReference;
    });
  }

  save_currency_exchange(currency_exchange: CurrencyExchangeReference) {
    this.RefCurrencyExchangeService.save_currency_exchange(currency_exchange).subscribe((response: HttpResponse) => {
      let tmp = response.data as CurrencyExchangeReference;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        this.currency_exchange = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_currency_exchange(currency_exchange_id: string) {
    if (!currency_exchange_id) {
      console.log(`currency_exchange_id не передано.`);
      // Show error dialog
      return;
    }

    this.RefCurrencyExchangeService.remove_currency_exchange(currency_exchange_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: currency_exchange_id, element: null });
    });
  }

  save_and_close(currency_exchange: CurrencyExchangeReference) {
    // Save ticket
    this.save_update_currency_exchange(currency_exchange);
    this.close_dialog(currency_exchange);
  }

  save_update_currency_exchange(currency_exchange: CurrencyExchangeReference) {
    if (!currency_exchange._id) {
      this.save_currency_exchange(currency_exchange);
    } else {
      this.update_currency_exchange(currency_exchange);
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
