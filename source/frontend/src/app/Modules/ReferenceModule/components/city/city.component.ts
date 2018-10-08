import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CityPopupReferencesComponent } from "./../cityPopup/cityPopup.component";
import { SearchPopupReferencesComponent } from "./../searchPopup/searchPopup.component";

import { CityService } from "../../services";
import { CityReference } from "../../models";

@Component({
  selector: "city-ref",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.css"]
})
export class CityReferencesComponent implements OnInit {
  // Сохраняются загруженне Аэропорты
  public cities: CityReference[] = null;
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

  constructor(public dialog: MatDialog, private CityService: CityService) {}

  ngOnInit() {
    this.refresh_data();
  }

  get_cities_count() {
    this.CityService.get_cities_count().subscribe(data => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count);
    });
  }

  load_cities(skip, limit) {
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.CityService.get_cities(skip, limit).subscribe(data => {
      this.cities = data;
    });
  }

  refresh_data() {
    this.loader_displayed = true;
    this.CityService.get_cities(this.skip, this.limit).subscribe(data => {
      this.cities = data;
      this.get_cities_count();
      this.loader_displayed = false;
    });
  }

  create_city() {
    this.open_dialog(new CityReference())
      .afterClosed()
      .subscribe(dialog_result => {
        console.log(dialog_result);
        if (!dialog_result) return;

        this.cities.unshift(dialog_result);
        console.log("Created city: ", dialog_result);
      });
  }

  edit_city(city_item: CityReference) {
    let city_copy = CityReference.clone(city_item);

    this.open_dialog(city_copy)
      .afterClosed()
      .subscribe(dialog_result => {
        if (!dialog_result) return;
        this.handle_dialog_result(dialog_result);

        this.cities.forEach((item, index, array) => {
          if (item._id == dialog_result._id) {
            array[index] = dialog_result;
          }
        });
      });
  }

  handle_dialog_result(response) {
    if (response.action == "remove") {
      this.cities.forEach((item, index, array) => {
        if (item._id == response.id) {
          array.splice(index, 1);
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<CityPopupReferencesComponent> {
    return this.dialog.open(CityPopupReferencesComponent, {
      panelClass: "my-centered-dialog",
      width: "50%",
      height: "75vh",
      data: data
    });
  }
}
