import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CurrencyExchangePopupReferencesComponent } from './../currencyExchangePopup/currencyExchangePopup.component';
import { CurrencyExchangeService } from '../../services';
import { CurrencyExchangeReference } from '../../models';

@Component({
  selector: 'currency-exchange-ref',
  templateUrl: './currencyExchange.component.html',
  styleUrls: ['./currencyExchange.component.css']
})
export class CurrencyExchangeReferencesComponent implements OnInit {
// Сохраняются загруженне Клиенты
public currency_exchanges: CurrencyExchangeReference[] = null;
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


constructor(public dialog: MatDialog, private CurrencyExchangeService: CurrencyExchangeService) { }

ngOnInit() {
  this.refresh_data();
}

get_currency_exchanges_count(){
  this.CurrencyExchangeService.get_currency_exchange_count().subscribe((data) => {
    this.elements_count = data;
    let count = Math.ceil(this.elements_count / this.limit);
    this.pagination_arr = new Array(count)
  });
}

load_currency_exchanges(skip, limit){
  this.current_page = skip;
  skip = skip > 0 ? skip * 10 : skip;
  this.CurrencyExchangeService.get_currency_exchanges(skip, limit).subscribe((data) => {
    this.currency_exchanges = data;
  });
}

refresh_data(){
  this.loader_displayed = true;
  this.CurrencyExchangeService.get_currency_exchanges(this.skip, this.limit).subscribe((data) => {
    this.currency_exchanges = data;
    this.get_currency_exchanges_count()
    this.loader_displayed = false;
  });
}

create_currency_exchange(){
  this.open_dialog(new CurrencyExchangeReference()).afterClosed()
  .subscribe((dialog_result) => {
    console.log(dialog_result)
    if(!dialog_result) return;

    this.currency_exchanges.unshift(dialog_result)
    console.log('Created currency Exchange: ', dialog_result)
  });
}

edit_currency_exchange(currency_exchange_item: CurrencyExchangeReference){
  let currency_exchange_copy = CurrencyExchangeReference.clone(currency_exchange_item);
  
  this.open_dialog(currency_exchange_copy).afterClosed()
  .subscribe((dialog_result) => {
    if(!dialog_result) return;
    this.handle_dialog_result(dialog_result);

    this.currency_exchanges.forEach((item, index, array) => {
      if(item._id == dialog_result._id){
        array[index] = dialog_result;
      }
    });
  });
}

handle_dialog_result(response){
  if(response.action == 'remove'){
    this.currency_exchanges.forEach((item, index, array) => {
      if(item._id == response.id){
        array.splice(index, 1)
      }
    });
  }
}

open_dialog(data): MatDialogRef<CurrencyExchangePopupReferencesComponent> {
  return this.dialog.open(CurrencyExchangePopupReferencesComponent, {
    panelClass: 'my-centered-dialog',
    width: '50%',
    height: '75vh',
    data: data
  });  
}
}
