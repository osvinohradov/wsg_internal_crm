import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AirportReference } from "../../models";
import { ReferenceService } from "../../services/reference.service";

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
    @Inject(MAT_DIALOG_DATA) public airport: AirportReference,
    public ReferenceService: ReferenceService
  ) {
    if (!this.airport) {
      this.airport = new AirportReference();
    }
  }

  ngOnInit() {}

  update_airport(airport: AirportReference) {
    this.ReferenceService.update_airport(airport).subscribe(data => {
      this.airport = data as AirportReference;
    });
  }

  save_airport(airport: AirportReference) {
    this.ReferenceService.save_airport(airport).subscribe(data => {
      let tmp = data as AirportReference;
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

    this.ReferenceService.remove_airport(airport_id).subscribe(() => {
      this.dialogRef.close({ action: "remove", id: airport_id, element: null });
    });
  }

  save_and_close(airport: AirportReference) {
    // Save ticket
    this.save_update_airport(airport);
    this.close_dialog(airport);
  }

  save_update_airport(airport: AirportReference) {
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
