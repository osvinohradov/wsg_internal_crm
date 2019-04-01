// Built-in library

// Installed library
import moment from 'moment';
import wN from 'written-number';
// Personal library
import { BaseView, Exception } from '../lib';
import { TrainInvoiceModel } from '../models';
import { generate_random_number } from '../helpers';
import { PDF_TMP_NAMES } from '../constants';
import { PDFService } from '../services';

moment.locale('uk');

class TrainView extends BaseView{
    constructor(){
        super();
    }
    async get_train_invoices(req, res){
        let invoices_info = null;
        // Добавить логику для получения ограниченной последовательности для пагинации
        let params = { limit: 10, skip: 0 };
        
        try{
            invoices_info = await TrainInvoiceModel.get_train_invoices_info(params);

            this.send_success_response(res, invoices_info);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res);
        }
    }

    async get_train_invoice_by_id(req, res){
        const id = req.params.id;
        let invoice = null;
        if(!id){
            this.send_error_response(res, {
                "description": "Bad request params. Request must contains parameter id."
            }, 400);
            return;
        }
        try{

            invoice = await TrainInvoiceModel.get_train_invoice_by_id({ _id: id });
            this.send_success_response(res, invoice);
        }
        catch(err){
            console.log('Error: ', err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    async create_train_invoice(req, res){ 
        let invoice = req.body;
        

        if(!invoice){
            this.send_error_response(req, {
                "description": "Bad request params. Request must contains body."
            }, 400);
        }
        try{
            invoice = await TrainInvoiceModel.get_normalize_invoice(invoice);
            // TODO:
            invoice = new TrainInvoiceModel(invoice);
            let err = invoice.validateSync();
            if(err){
                this.send_error_response(res, {
                    "description": "Internal Server Error. Data not stored."
                }, 500);
                return;
            }
            console.log('================================= Train invoice =================================');
            console.log(invoice)
            console.log('=================================================================================');
            invoice = await invoice.save();
            this.send_success_response(res, invoice);
        }
        catch(err){
             // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
             this.send_error_response();
        }
    }

    async update_train_invoice(req, res){
        let invoice = req.body;
        let invoice_id = null;

        if(!invoice){
            this.send_error_response(req, {
                "description": "Bad request params. Request must contains body."
            }, 400);
        }
        try{
            // TODO: We need to validate each object for existing field
            invoice = await TrainInvoiceModel.get_normalize_invoice(invoice);
            invoice_id = invoice._id;
            // TODO: return updated object
            invoice = await TrainInvoiceModel.update({ _id: invoice_id }, invoice);
            
            console.log('================================= Train invoice =================================');
            console.log(invoice)
            console.log('=================================================================================');
            this.send_success_response(res, invoice);
        }
        catch(err){
            console.log(err);
            this.send_error_response(res, {}, 500);
        }

    }

    async delete_train_invoice(req, res){ 
        const id = req.query.id;
        try{
            await TrainInvoiceModel.deleteOne({ id: id });
            this.send_success_response(res, {
                "description": `Data deleted by id ${id}`
            });
        }
        catch(err){
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    async print_act_document(req, res){
        let invoice_id = req.params.invoice_id;
        try{
            let invoice = await TrainInvoiceModel.get_train_invoice_by_id({ _id: invoice_id });
            if(!invoice){
                console.log(`Invoice not found.`);
                this.send_error_response(res, {}, 404);
            }
            console.log('Date: ', invoice.date)
            let date = moment.utc(invoice.date, ['YYYY-MM-DDTHH:mm:s Z']).format('DD MMMM YYYY');
            invoice.creation_date = date;
            
            let last_name = invoice.detail_info.surname_id.last_name_native ? invoice.detail_info.surname_id.last_name_native : '';
            let first_name = invoice.detail_info.surname_id.first_name_native ? invoice.detail_info.surname_id.first_name_native : '';
            invoice.detail_info.surname_id = `${last_name} ${first_name}`;

            invoice.detail_info.departure_dt = moment(invoice.detail_info.departure_dt).format('DD.MM.YYYY HH:mm:ss');
            invoice.detail_info.arrival_dt = moment(invoice.detail_info.arrival_dt).format('DD.MM.YYYY HH:mm:ss');

            let carriage_number = invoice.detail_info.carriage_number ? invoice.detail_info.carriage_number : '';
            let carriage_type = invoice.detail_info.service_type ? `, ${invoice.detail_info.service_type}` : '';

            invoice.detail_info.carriage_number = `${carriage_number}${carriage_type}`;

            invoice.detail_info.total_amount.sum = invoice.detail_info.supplier_cost.sum +
                invoice.detail_info.supplier_commision.sum + invoice.detail_info.forfeit.sum +
                invoice.detail_info.agency_services.sum + invoice.detail_info.other_services.sum;
            
            invoice.detail_info.total_amount.mpe = invoice.detail_info.supplier_cost.mpe +
                invoice.detail_info.supplier_commision.mpe + invoice.detail_info.forfeit.mpe +
                invoice.detail_info.agency_services.mpe + invoice.detail_info.other_services.mpe;

            console.log(wN(123.7, { lang: 'uk' }))
            console.log( invoice.detail_info.total_amount.sum);
            
            let total_amount_sum_arr = invoice.detail_info.total_amount.sum.toString().split('.');
            let total_amount_sum_coins =  total_amount_sum_arr[1] ? total_amount_sum_arr[1] : '00';

            let total_amount_mpe_arr = invoice.detail_info.total_amount.mpe.toString().split('.');
            let total_amount_mpe_coins = total_amount_mpe_arr[1] ? total_amount_mpe_arr[1] : '00';

            let total_amount = (invoice.detail_info.total_amount.sum + invoice.detail_info.total_amount.mpe).toString().split('.');
            let total_amount_coins =  total_amount[1] ? total_amount[1] : '00';

            let total_amount_full_sum = total_amount_sum_arr[0] ? this._write_number(total_amount_sum_arr[0]) : 0;
            let total_amount_full_mpe = total_amount_mpe_arr[0] ? this._write_number(total_amount_mpe_arr[0]) : 0;
            let total_amount_full = total_amount[0] ? this._write_number(total_amount[0]) : 0;

            let written_sum = {
                total_amount_full_sum,
                total_amount_sum_coins,
                total_amount_full_mpe,
                total_amount_mpe_coins,
                total_amount_full,
                total_amount_coins
            }
            invoice.written_sum = written_sum;

            invoice.detail_info.total_amount.sum = invoice.detail_info.supplier_cost.sum +
                invoice.detail_info.supplier_commision.sum + invoice.detail_info.forfeit.sum +
                invoice.detail_info.agency_services.sum + invoice.detail_info.other_services.sum;
            
            invoice.detail_info.total_amount.mpe = invoice.detail_info.supplier_cost.mpe +
                invoice.detail_info.supplier_commision.mpe + invoice.detail_info.forfeit.mpe +
                invoice.detail_info.agency_services.mpe + invoice.detail_info.other_services.mpe;

            let pdf_form = await PDFService.get_act_pdf_form(PDF_TMP_NAMES.TRAIN.TRAIN_ACT_FORM_NAME, invoice);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(pdf_form);
        }
        catch(err){
            console.log(err);
            this.send_error_response(res, {}, 500);
        }  
    }

    async print_invoice_document(req, res){
        let invoice_id = req.params.invoice_id;
        try{
            let invoice = await TrainInvoiceModel.get_train_invoice_by_id({ _id: invoice_id });
            if(!invoice){
                console.log(`Invoice not found.`);
                this.send_error_response(res, {}, 404);
            }
            console.log('Date: ', invoice.date)
            let date = moment.utc(invoice.date, ['YYYY-MM-DDTHH:mm:s Z']).format('DD MMMM YYYY');
            invoice.creation_date = date;
            console.log('Invoice for print: ', invoice);
            let last_name = invoice.detail_info.surname_id.last_name_native ? invoice.detail_info.surname_id.last_name_native : '';
            let first_name = invoice.detail_info.surname_id.first_name_native ? invoice.detail_info.surname_id.first_name_native : '';
            invoice.detail_info.surname_id = `${last_name} ${first_name}`;

            invoice.detail_info.departure_dt = moment(invoice.detail_info.departure_dt).format('DD.MM.YYYY HH:mm:ss');
            invoice.detail_info.arrival_dt = moment(invoice.detail_info.arrival_dt).format('DD.MM.YYYY HH:mm:ss');

            let carriage_number = invoice.detail_info.carriage_number ? invoice.detail_info.carriage_number : '';
            let carriage_type = invoice.detail_info.service_type ? `, ${invoice.detail_info.service_type}` : '';

            invoice.detail_info.carriage_number = `${carriage_number}${carriage_type}`;

            invoice.detail_info.total_amount.sum = invoice.detail_info.supplier_cost.sum +
                invoice.detail_info.supplier_commision.sum + invoice.detail_info.forfeit.sum +
                invoice.detail_info.agency_services.sum + invoice.detail_info.other_services.sum;
            
            invoice.detail_info.total_amount.mpe = invoice.detail_info.supplier_cost.mpe +
                invoice.detail_info.supplier_commision.mpe + invoice.detail_info.forfeit.mpe +
                invoice.detail_info.agency_services.mpe + invoice.detail_info.other_services.mpe;

            console.log(wN(123.7, { lang: 'uk' }))
            console.log( invoice.detail_info.total_amount.sum);
            
            let total_amount_sum_arr = invoice.detail_info.total_amount.sum.toString().split('.');
            let total_amount_sum_coins =  total_amount_sum_arr[1] ? total_amount_sum_arr[1] : '00';

            let total_amount_mpe_arr = invoice.detail_info.total_amount.mpe.toString().split('.');
            let total_amount_mpe_coins = total_amount_mpe_arr[1] ? total_amount_mpe_arr[1] : '00';

            let total_amount = (invoice.detail_info.total_amount.sum + invoice.detail_info.total_amount.mpe).toString().split('.');
            let total_amount_coins =  total_amount[1] ? total_amount[1] : '00';

            let total_amount_full_sum = total_amount_sum_arr[0] ? this._write_number(total_amount_sum_arr[0]) : 0;
            let total_amount_full_mpe = total_amount_mpe_arr[0] ? this._write_number(total_amount_mpe_arr[0]) : 0;
            let total_amount_full = total_amount[0] ? this._write_number(total_amount[0]) : 0;

            let written_sum = {
                total_amount_full_sum,
                total_amount_sum_coins,
                total_amount_full_mpe,
                total_amount_mpe_coins,
                total_amount_full,
                total_amount_coins
            }
            invoice.written_sum = written_sum;

            invoice.detail_info.total_amount.sum = invoice.detail_info.supplier_cost.sum +
                invoice.detail_info.supplier_commision.sum + invoice.detail_info.forfeit.sum +
                invoice.detail_info.agency_services.sum + invoice.detail_info.other_services.sum;
            
            invoice.detail_info.total_amount.mpe = invoice.detail_info.supplier_cost.mpe +
                invoice.detail_info.supplier_commision.mpe + invoice.detail_info.forfeit.mpe +
                invoice.detail_info.agency_services.mpe + invoice.detail_info.other_services.mpe;

            let pdf_form = await PDFService.get_act_pdf_form(PDF_TMP_NAMES.TRAIN.TRAIN_INVOICE_FORM_NAME, invoice);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(pdf_form);
        }
        catch(err){
            console.log(err);
            this.send_error_response(res, {}, 500);
        }  
    }

    async print_order_document(req, res){
        let invoice_id = req.params.invoice_id;
        try{
            let invoice = await TrainInvoiceModel.get_train_invoice_by_id({ _id: invoice_id });
            if(!invoice){
                console.log(`Invoice not found.`);
                this.send_error_response(res, {}, 404);
            }
            console.log('Date: ', invoice.date)
            let date = moment.utc(invoice.date, ['YYYY-MM-DDTHH:mm:s Z']).format('DD MMMM YYYY');
            invoice.creation_date = date;
            
            let last_name = invoice.detail_info.surname_id.last_name_native ? invoice.detail_info.surname_id.last_name_native : '';
            let first_name = invoice.detail_info.surname_id.first_name_native ? invoice.detail_info.surname_id.first_name_native : '';
            invoice.detail_info.surname_id = `${last_name} ${first_name}`;

            invoice.detail_info.departure_dt = moment(invoice.detail_info.departure_dt).format('DD.MM.YYYY HH:mm:ss');
            invoice.detail_info.arrival_dt = moment(invoice.detail_info.arrival_dt).format('DD.MM.YYYY HH:mm:ss');

            let carriage_number = invoice.detail_info.carriage_number ? invoice.detail_info.carriage_number : '';
            let carriage_type = invoice.detail_info.service_type ? `, ${invoice.detail_info.service_type}` : '';

            invoice.detail_info.carriage_number = `${carriage_number}${carriage_type}`;

            invoice.detail_info.total_amount.sum = invoice.detail_info.supplier_cost.sum +
                invoice.detail_info.supplier_commision.sum + invoice.detail_info.forfeit.sum +
                invoice.detail_info.agency_services.sum + invoice.detail_info.other_services.sum;
            
            invoice.detail_info.total_amount.mpe = invoice.detail_info.supplier_cost.mpe +
                invoice.detail_info.supplier_commision.mpe + invoice.detail_info.forfeit.mpe +
                invoice.detail_info.agency_services.mpe + invoice.detail_info.other_services.mpe;

            console.log(wN(123.7, { lang: 'uk' }))
            console.log( invoice.detail_info.total_amount.sum);
            
            let total_amount_sum_arr = invoice.detail_info.total_amount.sum.toString().split('.');
            let total_amount_sum_coins =  total_amount_sum_arr[1] ? total_amount_sum_arr[1] : '00';

            let total_amount_mpe_arr = invoice.detail_info.total_amount.mpe.toString().split('.');
            let total_amount_mpe_coins = total_amount_mpe_arr[1] ? total_amount_mpe_arr[1] : '00';

            let total_amount = (invoice.detail_info.total_amount.sum + invoice.detail_info.total_amount.mpe).toString().split('.');
            let total_amount_coins =  total_amount[1] ? total_amount[1] : '00';

            let total_amount_full_sum = total_amount_sum_arr[0] ? this._write_number(total_amount_sum_arr[0]) : 0;
            let total_amount_full_mpe = total_amount_mpe_arr[0] ? this._write_number(total_amount_mpe_arr[0]) : 0;
            let total_amount_full = total_amount[0] ? this._write_number(total_amount[0]) : 0;

            let written_sum = {
                total_amount_full_sum,
                total_amount_sum_coins,
                total_amount_full_mpe,
                total_amount_mpe_coins,
                total_amount_full,
                total_amount_coins
            }
            invoice.written_sum = written_sum;

            invoice.detail_info.total_amount.sum = invoice.detail_info.supplier_cost.sum +
                invoice.detail_info.supplier_commision.sum + invoice.detail_info.forfeit.sum +
                invoice.detail_info.agency_services.sum + invoice.detail_info.other_services.sum;
            
            invoice.detail_info.total_amount.mpe = invoice.detail_info.supplier_cost.mpe +
                invoice.detail_info.supplier_commision.mpe + invoice.detail_info.forfeit.mpe +
                invoice.detail_info.agency_services.mpe + invoice.detail_info.other_services.mpe;

            let pdf_form = await PDFService.get_act_pdf_form(PDF_TMP_NAMES.TRAIN.TRAIN_ORDER_FORM_NAME, invoice);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(pdf_form);
        }
        catch(err){
            console.log(err);
            this.send_error_response(res, {}, 500);
        }
    }


    _write_number(number=0){
        return wN(number, { lang: 'uk' });
    }
}

export default new TrainView();