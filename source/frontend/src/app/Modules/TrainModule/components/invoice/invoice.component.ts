import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


import { TrainService } from "../../services";
import { TrainInvoiceInfo, TrainInvoiceDetail } from "../../models";
import { TrainInvoiceDialogComponent } from "../invoice_popup/invoice_popup.component";
import { GroupInvoiceNameModel } from "../../../GroupInvoice/models";
import { CounterpartyNameModel, RefRailwayStationNameModel, RefUnitClassifierNameModel, RefCuratorNameModel, RefCurrencyExchangeNameModel, ServiceTypeNameModel, RefCheckingAccountNameModel, RefUserNameModel, RefOrganizationNameModel, RefIndividualCounterpartyNameModel } from "../../../ReferenceModule/models";
import { HttpResponse } from "../../../Common/models/HttpResponseModel";


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
  }

  load_invoices_data(){
    this.is_loader_displayed = true;

    this.TrainService.get_train_invoices(0, 0).subscribe((response: HttpResponse) => {
      this.train_invoices = response.data;
      console.log(typeof this.train_invoices[0])
      console.log("Fetch train invoices: ", this.train_invoices[0]);
      this.is_loader_displayed = false;
    });
  }
  
  get_invoice_count(){
    console.log('Get invoice count');
  }

  edit_invoice(invoice_id) {
    this.is_loader_displayed = true;
    this.TrainService.get_train_invoice_by_id(invoice_id).subscribe((response: HttpResponse) => {
      if(!response || response.fail){
        // connect toaster library and show notification
        console.log('Invoice not found.');
        alert('Data not found');
        return;
      }
      let data = response.data;

      // TODO: Refactoring. Change method of getting null properties
      data.client_id = data.client_id ? data.client_id : new CounterpartyNameModel();
      data.group_invoice_id = data.group_invoice_id ? data.group_invoice_id : new GroupInvoiceNameModel();
      data.offer_currency_id = data.offer_currency_id ? data.offer_currency_id : new RefUnitClassifierNameModel();
      data.total_currency_id = data.total_currency_id ? data.total_currency_id : new RefUnitClassifierNameModel();
      data.provider_id = data.provider_id ? data.provider_id : new CounterpartyNameModel();
      data.taxes_payment_id = data.taxes_payment_id ? data.taxes_payment_id : new CounterpartyNameModel();
      data.curator_id = data.curator_id ? data.curator_id : new RefCuratorNameModel();
      data.currency_exchange_id = data.currency_exchange_id ? data.currency_exchange_id : new RefCurrencyExchangeNameModel();
      data.service_type_id = data.service_type_id ? data.service_type_id : new ServiceTypeNameModel();
      data.checking_account_id = data.checking_account_id ? data.checking_account_id : new RefCheckingAccountNameModel();
      data.responsible_agent_id = data.responsible_agent_id ? data.responsible_agent_id : new RefUserNameModel();
      data.agent_id = data.agent_id ? data.agent_id : new RefUserNameModel();
      data.organization_id = data.organization_id ? data.organization_id : new RefOrganizationNameModel();

      data.detail_info.departure_station_id = data.detail_info.departure_station_id ? data.detail_info.departure_station_id : new RefRailwayStationNameModel();
      data.detail_info.departure_station_id = data.detail_info.departure_station_id ? data.detail_info.departure_station_id : new RefRailwayStationNameModel();
      data.detail_info.surname_id = data.detail_info.surname_id ? data.detail_info.surname_id : new RefIndividualCounterpartyNameModel();
      
      this.is_loader_displayed = false;
      this.open_dialog(data).afterClosed().subscribe((dialog_response) => {
        
        console.log('Dialog closed.')
      });
    })
  }


  __get_invoice_content(invoice){
    let passanger = invoice.detail_info.surname;
    if(!passanger)
      return ``;

    let content = `Оплата залізничного квитка ${passanger.last_name_native} ${passanger.first_name_native}.
            Маршрут: від ${invoice.detail_info.departure_station} до ${invoice.detail_info.arrival_station}. 
            Дата та час відправлення: ${invoice.detail_info.departure_dt}; Дата та час прибуття: ${invoice.detail_info.arrival_dt};
            Потяг: ${invoice.detail_info.train_number}; Вагон ${invoice.detail_info.carriage_number};
            Місце ${invoice.detail_info.place}; Код підтвердження: ????? ШЯП-Е1-30887 ?????.`;
    // console.log('Content: ', content);
    return content;
  }


  create_invoice(){
    this.open_dialog(null);
    
  }


  /**
   * 
   */
  open_dialog(data): MatDialogRef<TrainInvoiceDialogComponent>{
    return this.dialog.open(TrainInvoiceDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '95%',
      height: 'auto',
      data: data
    })
  }

}
