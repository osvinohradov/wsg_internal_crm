import { BaseView, Exception } from '../lib';
import { TrainInvoiceModel } from '../models';
import { generate_random_number } from '../helpers';


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

            this.send_success_response(res, 200, invoices_info);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    async get_train_invoice_by_id(req, res){
        const id = req.params.id;
        let invoice = null;
        if(!id){
            this.send_error_response(res, 400, {
                "description": "Bad request params. Request must contains parameter id."
            });
            return;
        }
        try{

            invoice = await TrainInvoiceModel.get_train_invoice_by_id({ _id: id });
            this.send_success_response(res, 200, invoice);
        }
        catch(err){
            console.log('Error: ', err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    async create_train_invoice(req, res){ 
        let invoice = req.body;


        console.log('================================= Train invoice =================================');
        console.log(invoice)
        console.log('=================================================================================');


        if(!invoice){
            this.send_error_response(req, 400, {
                "description": "Bad request params. Request must contains body."
            });
        }
        try{
            invoice = new TrainInvoiceModel(invoice);
            let err = invoice.validateSync();
            if(err){
                this.send_error_response(res, 500, {
                    "description": "Internal Server Error. Data not stored."
                });
                return;
            }
            invoice = await invoice.save();
            this.send_success_response(res, 200, invoice);
        }
        catch(err){
             // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
             this.send_error_response();
        }
    }

    async update_train_invoice(req, res){
        let train = req.body;
        try{
            console.log(train);
        }
        catch(err){

        }

     }

    async delete_train_invoice(req, res){ 
        const id = req.query.id;
        try{
            await TrainInvoiceModel.deleteOne({ id: id });
            this.send_success_response(res, 200, {
                "description": `Data deleted by id ${id}`
            });
        }
        catch(err){
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new TrainView();