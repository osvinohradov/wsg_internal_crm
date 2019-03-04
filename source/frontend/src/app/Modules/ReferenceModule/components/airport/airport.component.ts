import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { AirportPopupReferencesComponent } from './../airport_popup/airport_popup.component';

import { AirportService } from '../../services';

import { AirportModel } from '../../models';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../../../Common/models/HttpResponseModel';


@Component({
  selector: 'airport-ref',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css', '../../../Common/styles.css']
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

  constructor(public dialog: MatDialog,
              private AirportService: AirportService,
              public toastr: ToastrManager) { }

  ngOnInit() {
    this.get_airports_count();
    this.refresh_data();
  }

  get_airports_count(){
    this.AirportService.get_airports_count()
      .subscribe(
        (response: HttpResponse) => {
          this.elements_count = response.data.count;
          let count = Math.ceil(this.elements_count / this.limit);
          this.pagination_arr = new Array(count)
        }, 
        (response: HttpResponse) => {
          console.log(response);
        });
  } 

  load_airports(skip, limit){
    this.loader_displayed = true;
    this.current_page = skip;    
    skip = skip > 0 ? skip * 10 : skip;
    this.AirportService.get_airports(skip, limit)
      .subscribe(
        (response: HttpResponse) => {
          this.airports = response.data;
          this.loader_displayed = false;
        },
        (response: HttpResponse) => {
          console.log(response);
          this.toastr.errorToastr('Неможливо завантажити аеропорти!', 'Помилка!');
          this.loader_displayed = false;
        });
  }

  create_airport(){
    let airport = new AirportModel();
    this.open_dialog(airport).afterClosed()
      .subscribe(
        (dialog_result) => {
          this.load_airports(this.skip, this.limit);
      });
  }

  edit_airport(airport_id){
    if(!airport_id){
      this.toastr.errorToastr('Не передано ідентифікатор аеропорту!', 'Помилка!')
      return;
    }

    this.retrieve_airport(airport_id, (airport: AirportModel) => {

      this.open_dialog(airport).afterClosed()
        .subscribe((dialog_result) => {
          console.log('Edit airport dialog result: ', dialog_result);
          this.load_airports(this.skip, this.limit);
        });
    });
  }

  refresh_data(){
    this.loader_displayed = true;
    this.AirportService.get_airports(this.skip, this.limit).subscribe((response: any) => {
      this.airports = response.data;
      this.get_airports_count()
      this.loader_displayed = false;
    });
  }

  

  retrieve_airport(airport_id, callback){
    console.log('retrieve airport')
    this.AirportService.get_airport_by_id(airport_id).subscribe((response: HttpResponse) => {
      // TODO: Add validation errors
      let airport = response.data;
      callback(airport);
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
