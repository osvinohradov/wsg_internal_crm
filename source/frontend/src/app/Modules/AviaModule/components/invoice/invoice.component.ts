import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AviaInvoicePopupComponent } from "../invoicePopup/invoicePopup.component";
import { AviaService } from "../../services/avia.service";

import { AviaPrintInvoicePopupComponent } from "./../../../../Components/printInvoice/printInvoice.component";
import { AviaPrintActPopupComponent } from "./../../../../Components/printAct/printAct.component";
import { AviaPrintScorePopupComponent } from "./../../../../Components/printScore/printScore.component";
import { AviaPrintScoreWithStampPopupComponent } from "./../../../../Components/printScoreWithStamp/printScoreWithStamp.component";

import { AviaInvoice } from "../../models";

@Component({
  selector: "avia-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class AviaInvoiceComponent implements OnInit {
  // Сохраняются загруженне Аэропорты
  public avia_invoices: AviaInvoice[] = null;
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

  constructor(public dialog: MatDialog,  private AviaService: AviaService) {}

  get_avia_invoices_count() {
    this.AviaService.get_avia_invoice_count().subscribe(data => {
      this.elements_count = data;
      let count = Math.ceil(this.elements_count / this.limit);
      this.pagination_arr = new Array(count);
    });
  }

  load_airports(skip, limit) {
    this.current_page = skip;
    skip = skip > 0 ? skip * 10 : skip;
    // Повторяется, по возможности убрать
    this.AviaService.get_avia_invoices(skip, limit).subscribe(data => {
      this.avia_invoices = data;
    });
  }

  ngOnInit() {
    this.refresh_data();
  }

  public _get_invoice_content(invoice) {
    let info = `Авіаційний квиток №${invoice.DetailInfo.TicketNumber} для ${
      invoice.DetailInfo.NameId.LastNameNative
    } ${invoice.DetailInfo.NameId.FirstNameNative}, за маршрутом: `;
    let additional = "";
    for (let i = 0; i < invoice.FlightInfo.length; i++) {
      additional += `виліт із ${invoice.FlightInfo[i].DeparturePlace} ${
        invoice.FlightInfo[i].DepartureTime
      }, приліт в ${invoice.FlightInfo[i].ArrivalPlace} ${
        invoice.FlightInfo[i].ArrivalTime
      }; `;
    }
    info += additional;
    return info;
  }

  refresh_data() {
    this.loader_displayed = true;
    // Повторяется, по возможности убрать
    this.AviaService.get_avia_invoices(this.skip, this.limit).subscribe(
      data => {
        this.avia_invoices = data;
        this.get_avia_invoices_count();

        console.log(
          "Avia Invoice: ",
          this.avia_invoices[0]
        );
        this.loader_displayed = false;
      }
    );
  }

  create_airport() {
    this.open_dialog(new AviaInvoice())
      .afterClosed()
      .subscribe(dialog_result => {
        console.log(dialog_result);
        if (!dialog_result) return;

        this.avia_invoices.unshift(dialog_result);
      });
  }

  edit_airport(airport_item: AviaInvoice) {
    let airport_copy = AviaInvoice.clone(airport_item);

    this.open_dialog(airport_copy)
      .afterClosed()
      .subscribe(dialog_result => {
        if (!dialog_result) return;
        this.handle_dialog_result(dialog_result);

        this.avia_invoices.forEach((item, index, array) => {
          if (item._id == dialog_result._id) {
            array[index] = dialog_result;
          }
        });
      });
  }

  handle_dialog_result(response) {
    if (response.action == "remove") {
      this.avia_invoices.forEach((item, index, array) => {
        if (item._id == response.id) {
          array.splice(index, 1);
        }
      });
    }
  }

  open_dialog(data): MatDialogRef<AviaInvoicePopupComponent> {
    return this.dialog.open(AviaInvoicePopupComponent, {
      panelClass: "my-centered-dialog",
      width: "98%",
      height: "90vh",
      data: data
    });
  }

  // ***************************************************************************************************

  openPrintInvoice(): void {
    let dialogRef = this.dialog.open(AviaPrintInvoicePopupComponent, {
      width: "98%",
      height: "90vh"
    });
  }

  openPrintAct(): void {
    let dialogRef = this.dialog.open(AviaPrintActPopupComponent, {
      width: "98%",
      height: "90vh"
    });
  }

  openPrintScore(): void {
    let dialogRef = this.dialog.open(AviaPrintScorePopupComponent, {
      width: "98%",
      height: "90vh"
    });
  }

  openPrintScoreWithStamp(): void {
    let dialogRef = this.dialog.open(AviaPrintScoreWithStampPopupComponent, {
      width: "98%",
      height: "98%"
    });
  }
}
