import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AviaInvoicePopupComponent } from '../invoicePopup/invoicePopup.component';
import { AviaService } from '../../services/avia.service';

import { AviaPrintInvoicePopupComponent } from './../../../../Components/printInvoice/printInvoice.component';
import { AviaPrintActPopupComponent } from './../../../../Components/printAct/printAct.component';
import { AviaPrintScorePopupComponent } from './../../../../Components/printScore/printScore.component';
import { AviaPrintScoreWithStampPopupComponent } from './../../../../Components/printScoreWithStamp/printScoreWithStamp.component';

@Component({
  selector: 'avia-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class AviaInvoiceComponent implements OnInit {

  public aviaDescription:string = 'aviaDescription';

  public avia_invoices: Array<any> = null;

  constructor(public dialog: MatDialog, private AviaService: AviaService) { }
  
  ngOnInit() {
    this.AviaService.get_avia_invoices().subscribe((data)=>{
      this.avia_invoices = data as Array<any>;
    });
  }

  public _get_invoice_content(invoice){
    let info = `Авіаційний квиток №${invoice.DetailInfo.TicketNumber} для ${invoice.DetailInfo.NameId.LastNameNative} ${invoice.DetailInfo.NameId.FirstNameNative}, за маршрутом: `;
    let additional = '';
    for(let i = 0; i < invoice.FlightInfo.length; i++){
      additional += `виліт із ${invoice.FlightInfo[i].DeparturePlace} ${invoice.FlightInfo[i].DepartureTime}, приліт в ${invoice.FlightInfo[i].ArrivalPlace} ${invoice.FlightInfo[i].ArrivalTime}; `
    }
    info += additional;
    return info;
  }

  public getDocument(): void {
    console.log('get documents');
  }

  public getInvoiceModal(id): void {
    console.log('getInvoiceModalID = ' + id);
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(AviaInvoicePopupComponent, {
      width: '98%',
      height: '90vh'
    });
  }


  openPrintInvoice(): void {
    let dialogRef = this.dialog.open(AviaPrintInvoicePopupComponent, {
      width: '98%',
      height: '90vh'
    });
  }

  openPrintAct(): void {
    let dialogRef = this.dialog.open(AviaPrintActPopupComponent, {
      width: '98%',
      height: '90vh'
    });
  }

  openPrintScore(): void {
    let dialogRef = this.dialog.open(AviaPrintScorePopupComponent, {
      width: '98%',
      height: '90vh'
    });
  }

  openPrintScoreWithStamp(): void {
    let dialogRef = this.dialog.open(AviaPrintScoreWithStampPopupComponent, {
      width: '98%',
      height: '98%'
    });
  }
}
