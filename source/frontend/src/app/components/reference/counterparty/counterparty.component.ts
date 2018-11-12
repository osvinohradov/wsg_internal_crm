import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CounterpartyPopupReferencesComponent } from "./../counterpartyPopup/counterpartyPopup.component";

import { CounterpartyService } from "../../services";
import { CounterpartyReference } from "../../models";

@Component({
  selector: "counterparty-ref",
  templateUrl: "./counterparty.component.html",
  styleUrls: ["./counterparty.component.css"]
})
export class CounterpartyReferencesComponent implements OnInit {
  // Сохраняются загруженне Аэропорты
  public counterparties: CounterpartyReference[] = null;
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

  constructor(public dialog: MatDialog, private CounterpartyService: CounterpartyService) {}

  ngOnInit() {
    this.refresh_data();
  }

  get_counterparties_count() {
    this.CounterpartyService.get_counterparties_count().subscribe(data => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count);
    });
  }

  load_counterparties(skip, limit) {
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.CounterpartyService.get_counterparties(skip, limit).subscribe(data => {
      this.counterparties = data;
    });
  }

  refresh_data() {
    this.loader_displayed = true;
    this.CounterpartyService.get_counterparties(this.skip, this.limit).subscribe(data => {
      this.counterparties = data;
      this.get_counterparties_count();
      this.loader_displayed = false;
    });
  }

  create_counterparty() {
    this.open_dialog(new CounterpartyReference())
      .afterClosed()
      .subscribe(dialog_result => {
        console.log(dialog_result);
        if (!dialog_result) return;

        this.counterparties.unshift(dialog_result);
        console.log("Created counterparty: ", dialog_result);
      });
  }

  edit_counterparty(counterparty_item: CounterpartyReference) {
    let counterparty_copy = CounterpartyReference.clone(counterparty_item);

    this.open_dialog(counterparty_copy)
      .afterClosed()
      .subscribe(dialog_result => {
        if (!dialog_result) return;
        this.handle_dialog_result(dialog_result);

        this.counterparties.forEach((item, index, array) => {
          if (item._id == dialog_result._id) {
            array[index] = dialog_result;
          }
        });
      });
  }

  handle_dialog_result(response) {
    if (response.action == "remove") {
      this.counterparties.forEach((item, index, array) => {
        if (item._id == response.id) {
          array.splice(index, 1);
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<CounterpartyPopupReferencesComponent> {
    return this.dialog.open(CounterpartyPopupReferencesComponent, {
      panelClass: "my-centered-dialog",
      width: "80%",
      height: "80vh",
      data: data
    });
  }
}
