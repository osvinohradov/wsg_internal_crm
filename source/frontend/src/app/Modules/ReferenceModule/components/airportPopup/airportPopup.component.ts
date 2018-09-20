import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AirportReference } from '../../models';
import { ReferenceService } from '../../services/reference.service';

@Component({
  selector: 'airport-popup-ref',
  templateUrl: './airportPopup.component.html',
  styleUrls: ['./airportPopup.component.css', './../airport/airport.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']
})
export class AirportPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AirportPopupReferencesComponent>, @Inject(MAT_DIALOG_DATA) public airport: AirportReference, public ReferenceService: ReferenceService) {
    console.log('From parent: ', this.airport)
    if(this.airport == null){
      this.airport = new AirportReference();
    }
  }

  ngOnInit() {
  }

  update_airport(airport: AirportReference){
    this.ReferenceService.update_airport(airport).subscribe((data) => {
      this.airport = data as AirportReference;
    });
  }

  save_airport(airport: AirportReference){
    this.ReferenceService.save_airport(airport).subscribe((data) => {
      console.log('Airport saved: ', data)
      this.airport = data as AirportReference;
    });
  }

  save_and_close(airport:AirportReference){
    // Save ticket
    this.save_update_airport(airport)
    this.close_dialog(airport)
  }

  save_update_airport(airport: AirportReference){
    if(!airport._id){
      this.save_airport(airport);
    }
    else{
      this.update_airport(airport);
    }
  }

  close_dialog(airport:AirportReference): void {
    this.dialogRef.close(airport);
  }

}
