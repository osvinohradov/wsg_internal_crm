import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { CuratorPopupReferencesComponent } from './../curatorPopup/curatorPopup.component';
import { CuratorService } from '../../services';
import { CuratorReference } from '../../models';


@Component({
  selector: 'curator-ref',
  templateUrl: './curator.component.html',
  styleUrls: ['./curator.component.css']
})
export class CuratorReferencesComponent implements OnInit {

  // Сохраняются загруженне Клиенты
  public curators: CuratorReference[] = null;
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


  constructor(public dialog: MatDialog, private CuratorService: CuratorService) { }

  ngOnInit() {
    this.refresh_data();
  }

  get_curators_count(){
    this.CuratorService.get_curators_count().subscribe((data) => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count)
    });
  }

  load_curator(skip, limit){
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.CuratorService.get_curators(skip, limit).subscribe((data) => {
      this.curators = data;
    });
  }

  refresh_data(){
    this.loader_displayed = true;
    this.CuratorService.get_curators(this.skip, this.limit).subscribe((data) => {
      this.curators = data;
      this.get_curators_count()
      this.loader_displayed = false;
    });
  }

  create_curator(){
    this.open_dialog(new CuratorReference()).afterClosed()
    .subscribe((dialog_result) => {
      console.log(dialog_result)
      if(!dialog_result) return;

      this.curators.unshift(dialog_result)
      console.log('Created curator: ', dialog_result)
    });
  }

  edit_curator(curator_item: CuratorReference){
    let curator_copy = CuratorReference.clone(curator_item);
    
    this.open_dialog(curator_copy).afterClosed()
    .subscribe((dialog_result) => {
      if(!dialog_result) return;
      this.handle_dialog_result(dialog_result);

      this.curators.forEach((item, index, array) => {
        if(item._id == dialog_result._id){
          array[index] = dialog_result;
        }
      });
    });
  }

  handle_dialog_result(response){
    if(response.action == 'remove'){
      this.curators.forEach((item, index, array) => {
        if(item._id == response.id){
          array.splice(index, 1)
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<CuratorPopupReferencesComponent> {
    return this.dialog.open(CuratorPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '75vh',
      data: data
    });  
  }
}
