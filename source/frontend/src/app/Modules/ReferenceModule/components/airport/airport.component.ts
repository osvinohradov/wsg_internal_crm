import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
// import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';
import { AirportPopupReferencesComponent } from './../airportPopup/airportPopup.component';

import { AirportService } from '../../services';

import { AirportModel } from '../../models';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map } from 'rxjs/operators';


@Component({
  selector: 'airport-ref',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  // Сохраняются загруженне Аэропорты
  public airports: AirportModel[] = null;
  // В данной версии не используется. Сохраняются выделенные элементы.
  public selected_items = [];
  // Указывает нужно отображать загрузчик или нет
  public loader_displayed = false;
  // Указываем сколько элементов нужно пропустить в БД при запросе
  public skip: number = 0;
  // Указываем сколько элементов нужно выбрать из БД
  public limit: number = 20;
  // Хранится общее количество элементов в БД
  public elements_count: number = 0;
  // Текущая страница, используется для подсчета сколько элементов нужно пропустить при выборке 
  public current_page: number = 0;
  // Переменная для блока пагинации. Пересмотреть и возможно избавится.
  public pagination_arr = [];

  constructor(public dialog: MatDialog, private AirportService: AirportService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.refresh_data();
  }

  get_airports_count(){
    this.AirportService.get_airports_count().subscribe((data) => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count)
    });
  }

  

  load_airports(skip, limit){
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.AirportService.get_airports(skip, limit).subscribe((data) => {
      this.airports = data;
    });
  }

  refresh_data(){
    this.loader_displayed = true;
    this.AirportService.get_airports(this.skip, this.limit).subscribe((data) => {
      this.airports = data;
      this.get_airports_count()
      this.loader_displayed = false;
    });
  }

  create_airport(){
    this.open_dialog(new AirportModel()).afterClosed()
    .subscribe((dialog_result) => {
      console.log(dialog_result)
      if(!dialog_result) return;

      this.airports.unshift(dialog_result)
      console.log('Created arport: ', dialog_result)
    });
  }

  retrieve_airport(airport_id, callback){
    console.log('retrieve airport')
    this.AirportService.get_airport_by_id(airport_id).subscribe((result) => {
      callback(result);
    });
  }

  edit_airport(airport_id){
    if(!airport_id){
      this.toastr.errorToastr('Не передано ідентифікатор аеропорту!', 'Помилка!')
      return;
    }
    console.log('Edit airport fn called')

    this.retrieve_airport(airport_id, (airport: AirportModel) => {

      this.open_dialog(airport).afterClosed().subscribe((dialog_result) => {
        console.log('Edit airport dialog result: ', dialog_result)
      });
    });
  }

  handle_dialog_result(response){
    if(response.action == 'remove'){
      this.airports.forEach((item, index, array) => {
        if(item._id == response.id){
          array.splice(index, 1)
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<AirportPopupReferencesComponent> {
    return this.dialog.open(AirportPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: 'auto',
      data: data
    });  
  }
}
