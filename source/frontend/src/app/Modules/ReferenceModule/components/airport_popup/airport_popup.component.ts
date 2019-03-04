import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AirportModel } from '../../models';
import { AirportService } from '../../services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../../../Common/models/HttpResponseModel';


@Component({
  selector: 'airport-popup-ref',
  templateUrl: './airport_popup.component.html',
  styleUrls: ['./airport_popup.component.css', './../airport/airport.component.css']
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

  // Створити новий елемент
  create_airport(airport){
    this.AirportService.create_airport(airport)
      .subscribe(
        (response: HttpResponse) => {
          this.airport = response.data as AirportModel;
          this.toastr.successToastr('Аеропорт успішно збережено.', 'Успiх!');
        },
        (response: HttpResponse) => {
          console.log(response);
          this.toastr.errorToastr('Невдалося зберегти аеропорт.', 'Помилка!');
        }
      );
  }
  // Оновити існуючий елемент
  update_airport(airport: AirportModel) {
    this.AirportService.update_airport(airport)
      .subscribe(
        (response: HttpResponse) => {
          this.airport = response.data as AirportModel;
          this.toastr.successToastr('Аеропорт успішно оновлено.', 'Успіх!');
        },
        (response: HttpResponse) => {
          console.log(response);
          this.toastr.errorToastr('Невдалося оновити аеропорт.', 'Помилка!');
        }
      );
  }
  // Обрати шлях збереження, створити новий або оновити існуючий
  save_airport(airport: AirportModel, close: Boolean = false) {
    if(!airport._id){
      this.create_airport(airport);
    }
    else{
      this.update_airport(airport);
    }
    if(close) this.close_dialog(); 
  }
  // Видалити існуючий елемент
  delete_airport(){
    this.AirportService.delete_airport(this.airport._id)
      .subscribe(
        (response) => {
          this.toastr.successToastr('Аеропорт успішно видалено.', 'Успіх!');
          this.close_dialog();
        },
        (response) => {
          console.log(response);
          this.toastr.errorToastr('невдалося видалити аеропорт.', 'Помилка!');
        }
      )
  }
  

  // Закрити діалогове вікно
  close_dialog(): void {
    console.log("Close dialog:");
    this.dialogRef.close();
  }
}
