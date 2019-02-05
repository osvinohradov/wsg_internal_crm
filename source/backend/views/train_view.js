import { BaseView, Exception } from '../lib';
import { TrainInvoiceModel } from '../models';
import { generate_random_number } from '../helpers';

let my_invoicec = [{ 
    number: 0,
    payment_form: 'Платіжна картка',
    tickets_count: 0,
    total_amount: 0,
    client_id: null,
    is_void: false,
    is_returned: false,
    is_paid: false,
    group_invoice_id: null,
    offer_currency_id: null,
    total_currency_id: null,
    provider_id: null,
    taxes_payment: '',
    curator_id: null,
    currency_exchange_id: null,
    service_type_id: null,
    checking_account: '',
    responsible_agent: '',
    agent: '',
    is_processed: false,
    detail_info:
     { train_number: '780О',
       carriage_number: '03',
       place: '015',
       service_type: 'С',
       departure_dt: "2018-09-15T14:09:00.000Z",
       departure_station: 'Kiev Pass',
       arrival_dt: "2018-09-15T18:33:00.000Z",
       arrival_station: 'Sumy',
       surname: 'Бандура Игорь',
       ticket_number: 'Ф45-Т1-1805541-1408',
       supplier_cost: { sum: -31.39 },
       other_services: { sum: 0, mpe: 0 } } }]



class TrainView extends BaseView{
    constructor(){
        super();
    }
    async get_train_invoices(req, res){
        let invoices = null;
        // Добавить логику для получения ограниченной последовательности для пагинации
        let skip = 0;
        let limit = 10;
        try{
            
            // invoices = await TrainInvoiceModel.find({}).skip(skip).limit(limit);
            // this.send_success_response(res, 200, invoices);
            my_invoicec[0].number = generate_random_number();
            let data = await TrainInvoiceModel.create_object_by_schema(my_invoicec[0]);

            this.send_success_response(res, 200, my_invoicec);
        }
        catch(err){
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    async get_train_invoice_by_id(req, res){
        const id = req.query.id;
        let invoice = null;
        if(!id){
            this.send_error_response(req, 400, {
                "description": "Bad request params. Request must contains parameter id."
            });
            return;
        }
        try{
            invoice = TrainInvoiceModel.findById(id);
            this.send_success_response(res, 200, invoice);
        }
        catch(err){
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    async create_train_invoice(req, res){ 
        let invoice = req.body;
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

    async update_train_invoice(req, res){ }

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