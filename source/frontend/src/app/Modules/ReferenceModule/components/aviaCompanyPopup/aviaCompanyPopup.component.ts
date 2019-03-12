import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AviaCompanyReference } from "../../models";
import { AviaCompanyService } from "../../services";
import { HttpResponse } from '../../../Common/models/HttpResponseModel';

@Component({
  selector: 'avia-company-popup-ref',
  templateUrl: './aviaCompanyPopup.component.html',
  styleUrls: ['./aviaCompanyPopup.component.css', './../aviaCompany/aviaCompany.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class AviaCompanyPopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AviaCompanyReference>,
    @Inject(MAT_DIALOG_DATA) public avia_company: AviaCompanyReference,
    public AviaCompanyService: AviaCompanyService
  ) {
    if (!this.avia_company) {
      this.avia_company = new AviaCompanyReference();
    }
  }

  ngOnInit() {}

  update_avia_company(avia_company: AviaCompanyReference) {
    this.AviaCompanyService.update_avia_company(avia_company).subscribe(data => {
      this.avia_company = data as AviaCompanyReference;
    });
  }

  save_avia_company(avia_company: AviaCompanyReference) {
    this.AviaCompanyService.save_avia_company(avia_company).subscribe((response: HttpResponse) => {
      let tmp = response.data as AviaCompanyReference;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        console.log('Avia company:', avia_company)
        this.avia_company = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_avia_company(avia_company_id: string) {
    if (!avia_company_id) {
      console.log(`avia_company_id не передано.`);
      // Show error dialog
      return;
    }

    this.AviaCompanyService.remove_avia_company(avia_company_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: avia_company_id, element: null });
    });
  }

  save_and_close(avia_company: AviaCompanyReference) {
    // Save ticket
    this.save_update_avia_company(avia_company);
    this.close_dialog(avia_company);
  }

  save_update_avia_company(avia_company: AviaCompanyReference) {
    if (!avia_company._id) {
      this.save_avia_company(avia_company);
    } else {
      this.update_avia_company(avia_company);
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
