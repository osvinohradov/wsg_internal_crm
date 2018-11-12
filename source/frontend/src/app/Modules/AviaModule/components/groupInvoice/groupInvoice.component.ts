import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AviaGroupInvoicePopupComponent } from "../groupInvoicePopup/groupInvoicePopup.component";

import { AviaGroupInvoiceService } from "../../services";

import { AviaGroupInvoice } from "../../models";

@Component({
  selector: "avia-group-invoice",
  templateUrl: "./groupInvoice.component.html",
  styleUrls: ["./groupInvoice.component.css"]
})
export class AviaGroupInvoiceComponent implements OnInit {
  // Сохраняются загруженне Аэропорты
  public avia_group_invoices: AviaGroupInvoice[] = null;
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
    private AviaGroupInvoiceService: AviaGroupInvoiceService
  ) {}

  ngOnInit() {
    this.refresh_data();
  }

  get_avia_group_invoices_count() {
    this.AviaGroupInvoiceService.get_avia_group_invoices_count().subscribe(
      data => {
        this.elements_count = data;
        let count = Math.ceil(this.elements_count / this.limit);
        console.log(data)
        this.pagination_arr = new Array(count);
      }
    );
  }

  load_avia_group_invoices(skip, limit) {
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    this.AviaGroupInvoiceService.get_avia_group_invoices(skip, limit).subscribe(
      data => {
        this.avia_group_invoices = data;
      }
    );
  }

  refresh_data() {
    this.loader_displayed = true;
    this.AviaGroupInvoiceService.get_avia_group_invoices(
      this.skip,
      this.limit
    ).subscribe(data => {
      this.avia_group_invoices = data;
      this.get_avia_group_invoices_count();
      this.loader_displayed = false;
    });
  }

  create_avia_group_invoice() {
    this.open_dialog(new AviaGroupInvoice())
      .afterClosed()
      .subscribe(dialog_result => {
        console.log(dialog_result);
        if (!dialog_result) return;

        this.avia_group_invoices.unshift(dialog_result);
        console.log("Created arport: ", dialog_result);
      });
  }

  edit_avia_group_invoice(avia_group_invoice_item: AviaGroupInvoice) {
    let avia_group_invoice_copy = AviaGroupInvoice.clone(avia_group_invoice_item);

    this.open_dialog(avia_group_invoice_copy)
      .afterClosed()
      .subscribe(dialog_result => {
        if (!dialog_result) return;
        this.handle_dialog_result(dialog_result);

        this.avia_group_invoices.forEach((item, index, array) => {
          if (item._id == dialog_result._id) {
            array[index] = dialog_result;
          }
        });
      });
  }

  handle_dialog_result(response) {
    if (response.action == "remove") {
      this.avia_group_invoices.forEach((item, index, array) => {
        if (item._id == response.id) {
          array.splice(index, 1);
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<AviaGroupInvoicePopupComponent> {
    return this.dialog.open(AviaGroupInvoicePopupComponent, {
      panelClass: "my-centered-dialog",
      width: "90%",
      height: "85vh",
      data: data
    });
  }


}
