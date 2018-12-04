import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { AirportReferenceModel } from '../../../models/reference/airport.reference';
import { AirportService } from "../../../services/reference/airport.service";

@Component({
  selector: "airport-popup-ref",
  templateUrl: "./airportPopup.component.html",
  styleUrls: [
    "./airportPopup.component.css",
    "./../airport/airport.component.css"
  ]

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']
})
export class AirportPopupReferencesComponent implements OnInit {
  public is_saved: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AirportPopupReferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public airport: AirportReferenceModel,
    public AirportService: AirportService
  ) {
    if (!this.airport) {
      this.airport = new AirportReferenceModel();
    }
  }

  ngOnInit() {}

  update_airport(airport: AirportReferenceModel) {
    this.AirportService.update_airport(airport).subscribe(data => {
      this.airport = data as AirportReferenceModel;
    });
  }

  save_airport(airport: AirportReferenceModel) {
    this.AirportService.save_airport(airport).subscribe(data => {
      let tmp = data as AirportReferenceModel;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        this.airport = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_airport(airport_id: string) {
    if (!airport_id) {
      console.log(`airport_id не передано.`);
      // Show error dialog
      return;
    }

    this.AirportService.remove_airport(airport_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: airport_id, element: null });
    });
  }

  save_and_close(airport: AirportReferenceModel) {
    // Save ticket
    this.save_update_airport(airport);
    this.close_dialog(airport);
  }

  save_update_airport(airport: AirportReferenceModel) {
    if (!airport._id) {
      this.save_airport(airport);
    } else {
      this.update_airport(airport);
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
