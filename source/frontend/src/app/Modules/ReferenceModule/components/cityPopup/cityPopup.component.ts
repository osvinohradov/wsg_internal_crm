import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CityReference } from "../../models";
import { CityService } from "../../services";
import { HttpResponse } from '../../../Common/models/HttpResponseModel';

@Component({
  selector: 'city-popup-ref',
  templateUrl: './cityPopup.component.html',
  styleUrls: ['./cityPopup.component.css', './../city/city.component.css']

})
export class CityPopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CityReference>,
    @Inject(MAT_DIALOG_DATA) public city: CityReference,
    public CityService: CityService
  ) {
    if (!this.city) {
      this.city = new CityReference();
    }
  }

  ngOnInit() {}

  update_city(city: CityReference) {
    this.CityService.update_city(city).subscribe((response: HttpResponse) => {
      this.city = response.data as CityReference;
    });
  }

  save_city(city: CityReference) {
    this.CityService.save_city(city).subscribe((response: HttpResponse) => {
      let tmp = response.data as CityReference;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        console.log('City:', city)
        this.city = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_city(city_id: string) {
    if (!city_id) {
      console.log(`city_id не передано.`);
      // Show error dialog
      return;
    }

    this.CityService.remove_city(city_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: city_id, element: null });
    });
  }

  save_and_close(city: CityReference) {
    // Save ticket
    this.save_update_city(city);
    this.close_dialog(city);
  }

  save_update_city(city: CityReference) {
    if (!city._id) {
      this.save_city(city);
    } else {
      this.update_city(city);
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
