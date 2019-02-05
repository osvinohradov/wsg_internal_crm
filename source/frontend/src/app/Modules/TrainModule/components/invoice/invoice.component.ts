import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


import { TrainService } from "../../services";
import { TrainInvoiceInfo } from "../../models";
import { TrainInvoiceDialogComponent } from "../invoice_popup/invoice_popup.component";


@Component({
  selector: "avia-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class TrainInvoiceComponent implements OnInit {

  // Сохраняем все инвойсы которые пришли с сервера
  public train_invoices: TrainInvoiceInfo[] = [];
  // Указывает нужно отображать прелоадер или нет
  public is_loader_displayed: boolean = false;

  // Хранится общее количество элементов в БД , используется для пагинации
  public elements_count: number = 0;

  constructor(private TrainService: TrainService, private dialog: MatDialog){

  }

  ngOnInit() {
    this.load_invoices_data();
    this.get_invoice_count();
    this.get_train_invoices(0, 0);
  }

  load_invoices_data(){
    this.is_loader_displayed = true;

    this.TrainService.get_train_invoices(0, 0).subscribe((data: TrainInvoiceInfo[]) => {
      this.train_invoices = data;
      console.log(typeof this.train_invoices[0])
      console.log("Fetch train invoices: ", this.train_invoices[0]);
      this.is_loader_displayed = false;
    })
  }

  get_train_invoices(skip: Number, limit: Number){
    skip = 0;
    limit = 10;
    this.is_loader_displayed = true;
    this.TrainService.get_train_invoices(skip, limit).subscribe((data) => {
      //this.train_invoices = data;
      console.log(data);
      this.is_loader_displayed = false;
    })
  }
  get_invoice_count(){
    console.log('Get invoice count');
  }




  create_invoice(){
    this.open_dialog(null);
    
  }


  /**
   * 
   */
  open_dialog(data): MatDialogRef<TrainInvoiceDialogComponent>{
    return this.dialog.open(TrainInvoiceDialogComponent, {
      panelClass: "my-centered-dialog",
      width: "98%",
      height: "90vh",
      data: data
    })
  }

}
