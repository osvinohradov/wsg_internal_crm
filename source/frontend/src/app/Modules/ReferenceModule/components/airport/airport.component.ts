import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
// import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';
import { AirportPopupReferencesComponent } from './../airportPopup/airportPopup.component';

import { ReferenceService } from '../../services/reference.service';

import { AirportReference } from '../../models';


@Component({
  selector: 'airport-ref',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportReferencesComponent implements OnInit {

  public nomenclatureAirports:string = 'AAA';

  public airports: AirportReference[] = null;

  public selected_items = [];

  public loader_displayed = false;

  public skip: number = 0;
  public limit: number = 20;
  public element_count: number = 0;
  public current_page: number = 0;


  constructor(public dialog: MatDialog, private ReferenceService: ReferenceService) {
    this.get_airports_count()
  }

  get_airports_count(){
    this.ReferenceService.get_airports_count().subscribe((data) => {
      this.element_count = (50 / this.limit)
    });
  }

  load_airports(skip, limit){
    console.log('Index: ', skip)
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.ReferenceService.get_airports(skip, limit).subscribe((data) => {
      this.airports = data;
      console.log('Next page')
    })

  }

  ngOnInit() {
    this.refresh_data();
  }

  refresh_data(){
    this.loader_displayed = true;
    this.ReferenceService.get_airports(this.skip, 20).subscribe((data) => {
      this.airports = data;
      //data = data.map((item) => AirportReference.serialize_from_json(item, new AirportReference()))
      console.log(this.airports[0]);
      this.loader_displayed = false;
    })
  }

  create_airport(){
    this.open_dialog(new AirportReference()).afterClosed()
    .subscribe((dialog_result) => {
      console.log(dialog_result)
      if(!dialog_result) return;

      this.airports.unshift(dialog_result)
      console.log('Created arport: ', dialog_result)
    });
  }

  edit_airport(airport_item: AirportReference){
    let airport_copy = AirportReference.clone(airport_item);
    
    this.open_dialog(airport_copy).afterClosed()
    .subscribe((dialog_result) => {
      if(!dialog_result) return;

      this.airports.forEach((item, index, array) => {
        if(item._id == dialog_result._id){
          array[index] = dialog_result;
        }
      });
    });
  }

  select_item(airport_item_id){

  }

  open_dialog(data): MatDialogRef<AirportPopupReferencesComponent> {
    return this.dialog.open(AirportPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '75vh',
      data: data
    });  
  }
}
