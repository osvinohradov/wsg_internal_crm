import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { ServicePopupReferencesComponent } from "./../service_popup/service_popup.component";

import { RefServiceTypeService } from '../../services';

import { ServiceTypeReference } from '../../models';


@Component({
  selector: "service-ref",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.css"]
})
export class ServiceReferencesComponent implements OnInit {


  // Сохраняются загруженне Виды сервисов
  public service_types: ServiceTypeReference[] = null;
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

  constructor(
    public dialog: MatDialog,
    private RefServiceTypeService: RefServiceTypeService
  ) {}

  ngOnInit() {
    this.refresh_data();
  }

  get_service_types_count() {
    this.RefServiceTypeService.get_service_types_count().subscribe(data => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count);
    });
  }

  load_service_types(skip, limit) {
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.RefServiceTypeService.get_service_types(skip, limit).subscribe(data => {
      this.service_types = data;
    });
  }

  refresh_data() {
    this.loader_displayed = true;
    this.RefServiceTypeService.get_service_types(this.skip, this.limit).subscribe(
      data => {
        this.service_types = data;
        this.get_service_types_count();
        this.loader_displayed = false;
      }
    );
  }

  create_service_type() {
    this.open_dialog(new ServiceTypeReference())
      .afterClosed()
      .subscribe(dialog_result => {
        console.log(dialog_result);
        if (!dialog_result) return;

        this.service_types.unshift(dialog_result);
        console.log("Created service type: ", dialog_result);
      });
  }

  edit_service_type(service_type_item: ServiceTypeReference) {
    let service_type_copy = ServiceTypeReference.clone(service_type_item);

    this.open_dialog(service_type_copy)
      .afterClosed()
      .subscribe(dialog_result => {
        if (!dialog_result) return;
        this.handle_dialog_result(dialog_result);

        this.service_types.forEach((item, index, array) => {
          if (item._id == dialog_result._id) {
            array[index] = dialog_result;
          }
        });
      });
  }

  handle_dialog_result(response) {
    if (response.action == "remove") {
      this.service_types.forEach((item, index, array) => {
        if (item._id == response.id) {
          array.splice(index, 1);
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<ServicePopupReferencesComponent> {
    return this.dialog.open(ServicePopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: 'auto',
      data: data
    });
  }
}
