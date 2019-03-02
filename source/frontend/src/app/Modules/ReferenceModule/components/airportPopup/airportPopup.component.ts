import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { AirportModel } from "../../models";
import { AirportService } from "../../services";
import { ToastrManager } from "ng6-toastr-notifications";
import { map } from "rxjs/operators";


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

  constructor(public dialogRef: MatDialogRef<AirportPopupReferencesComponent>,
              @Inject(MAT_DIALOG_DATA) public airport: AirportModel,
              public AirportService: AirportService,
              public toastr: ToastrManager){
    if(!airport){
      console.log('Airport object was not received')
      this.airport = new AirportModel();
    }
    console.log('Airport: ', airport)
  }

  ngOnInit() {}

  update_airport(airport: AirportModel) {
    this.AirportService.update_airport(airport).subscribe(data => {
      this.airport = data as AirportModel;
    });
  }

  save_airport(airport: AirportModel) {
    this.AirportService.save_airport(airport).subscribe(data => {
      let tmp = data as AirportModel;
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

  save_and_close(airport: AirportModel) {
    // Save ticket
    this.save_update_airport(airport);
    this.close_dialog(airport);
  }

  save_update_airport(airport: AirportModel) {
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
