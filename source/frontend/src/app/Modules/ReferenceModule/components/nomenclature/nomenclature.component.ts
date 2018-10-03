import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NomenclaturePopupReferencesComponent } from './../nomenclaturePopup/nomenclaturePopup.component';

import { NomenclatureService } from '../../services';

import { NomenclatureReference } from '../../models';

@Component({
  selector: 'nomenclature-ref',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.css']
})
export class NomenclatureReferencesComponent implements OnInit {
 // Сохраняются загруженне Аэропорты
 public nomenclatures: NomenclatureReference[] = null;
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


 constructor(public dialog: MatDialog, private NomenclatureService: NomenclatureService) { }

 ngOnInit() {
   this.refresh_data();
 }

 get_nomenclature_count(){
   this.NomenclatureService.get_nomenclature_count().subscribe((data) => {
     this.elements_count = data;
     let count = Math.ceil(this.elements_count / this.limit);
     this.pagination_arr = new Array(count)
   });
 }

 load_nomenclatures(skip, limit){
   this.current_page = skip;
   skip = skip > 0 ? skip * 10 : skip;
   this.NomenclatureService.get_nomenclatures(skip, limit).subscribe((data) => {
     this.nomenclatures = data;
   });
 }

 refresh_data(){
   this.loader_displayed = true;
   this.NomenclatureService.get_nomenclatures(this.skip, this.limit).subscribe((data) => {
     this.nomenclatures = data;
     this.get_nomenclature_count()
     this.loader_displayed = false;
   });
 }

 create_nomenclature(){
   this.open_dialog(new NomenclatureReference()).afterClosed()
   .subscribe((dialog_result) => {
     console.log(dialog_result)
     if(!dialog_result) return;

     this.nomenclatures.unshift(dialog_result)
     console.log('Created nomenclature: ', dialog_result)
   });
 }

 edit_nomenclature(nomenclature_item: NomenclatureReference){
   let nomenclature_copy = NomenclatureReference.clone(nomenclature_item);
   
   this.open_dialog(nomenclature_copy).afterClosed()
   .subscribe((dialog_result) => {
     if(!dialog_result) return;
     this.handle_dialog_result(dialog_result);

     this.nomenclatures.forEach((item, index, array) => {
       if(item._id == dialog_result._id){
         array[index] = dialog_result;
       }
     });
   });
 }

 handle_dialog_result(response){
   if(response.action == 'remove'){
     this.nomenclatures.forEach((item, index, array) => {
       if(item._id == response.id){
         array.splice(index, 1)
       }
     });
   }
 }

 open_dialog(data): MatDialogRef<NomenclaturePopupReferencesComponent> {
   return this.dialog.open(NomenclaturePopupReferencesComponent, {
     panelClass: 'my-centered-dialog',
     width: '50%',
     height: '50vh',
     data: data
   });  
 }
}
