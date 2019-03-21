// Built-in library

// Installed library
import moment from 'moment';
import wN from 'written-number';
// Personal library
import { BaseView, Exception } from '../lib';
import { TourismInvoiceModel } from '../models';
import { PDF_TMP_NAMES } from '../constants';
import { PDFService } from '../services';

moment.locale('uk');

class TourismView extends BaseView{
    constructor(){
        super();
    }
    async get_tourism_invoices(req, res){
        
    }

    async get_tourism_invoice_by_id(req, res){
       
    }

    async create_tourism_invoice(req, res){ 
        
    }

    async update_tourism_invoice(req, res){
        
    }

    async delete_tourism_invoice(req, res){ 
    
    }
}

export default new TourismView();