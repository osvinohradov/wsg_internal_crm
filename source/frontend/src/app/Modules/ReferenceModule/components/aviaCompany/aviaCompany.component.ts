import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';
import { AviaCompanyPopupReferencesComponent } from './../aviaCompanyPopup/aviaCompanyPopup.component';

import { AviaCompanyService } from '../../services';

import { AviaCompanyReference } from '../../models';

@Component({
  selector: 'aviaCompany-ref',
  templateUrl: './aviaCompany.component.html',
  styleUrls: ['./aviaCompany.component.css']
})
export class AviaCompanyReferencesComponent implements OnInit {

  // Сохраняются загруженне Авиа  компании
  public avia_companies: AviaCompanyReference[] = null;
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

  constructor(public dialog: MatDialog, private AviaCompanyService: AviaCompanyService) { }

  ngOnInit() {
    this.refresh_data();
  }
  // Получаем общее количество авиа компаний в БД
  get_avia_companies_count(){
    this.AviaCompanyService.get_avia_company_count().subscribe((data) => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count)
    });
  }
  // Загружаем авиа компании с указанным лимитом
  load_avia_compaies(skip, limit){
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.AviaCompanyService.get_avia_companies(skip, limit).subscribe((data) => {
      this.avia_companies = data;
    });
  }

  // Запрашиваем данные заново для обновления
  refresh_data(){
    this.loader_displayed = true;
    this.AviaCompanyService.get_avia_companies(this.skip, this.limit).subscribe((data) => {
      this.avia_companies = data;
      this.get_avia_companies_count()
      this.loader_displayed = false;
    });
  }
  // Создание новой авиа компании
  create_avia_company(){
    this.open_dialog(new AviaCompanyReference()).afterClosed()
    .subscribe((dialog_result) => {
      console.log(dialog_result)
      if(!dialog_result) return;

      this.avia_companies.unshift(dialog_result)
      console.log('Created avia company: ', dialog_result)
    });
  }

  // Редактирование авиа компании 
  edit_avia_company(avia_company_item: AviaCompanyReference){
    let airport_copy = AviaCompanyReference.clone(avia_company_item);
    
    this.open_dialog(airport_copy).afterClosed()
    .subscribe((dialog_result) => {
      if(!dialog_result) return;
      this.handle_dialog_result(dialog_result);

      this.avia_companies.forEach((item, index, array) => {
        if(item._id == dialog_result._id){
          array[index] = dialog_result;
        }
      });
    });
  }
  // Обработка авиа компании после закрытия всплывающего окна
  handle_dialog_result(response){
    if(response.action == 'remove'){
      this.avia_companies.forEach((item, index, array) => {
        if(item._id == response.id){
          array.splice(index, 1)
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<AviaCompanyPopupReferencesComponent> {
    return this.dialog.open(AviaCompanyPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '60h',
      data: data
    });  
  }
}
