// Built-in packages
import util from 'util';
// Installed packages
import moment from 'moment';
// Internal packages
import { Mapper } from '../mapper';
import { generate_random_number } from '../../../helpers';
import { PAYMENT_FORMS,
         DEFAULT_UNIT_CLASSIFIER_NAME,
         DEFAULT_COUNTERPARTY_NAME,
         DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE,
         MPE_RATE, 
         DEFAULT_TRAIN_ARGEST_SERVICE_TYPE} from '../../../constants/common';
import { References } from '../../../models';


class TainArgestMapper extends Mapper{
    constructor(){
        super();
    }

    async map(ticket, model){
        let invoice = new model();
        invoice = await this._get_invoice(ticket, invoice);
        console.log(util.inspect(invoice, true, Infinity, true));
        
        return invoice;
    }

    async _get_invoice(ticket, model){
        let ticket_date = await this.get_date_time(ticket.creation_time);
        model.number = generate_random_number();
        model.date = ticket_date;
        model.payment_form = PAYMENT_FORMS['credit'];

        model.payment_date = null;
        model.tickets_count = ticket.travel.trip.boarding_pass;
        model.total_amount = 0;

        let client = await References.CounterpartyModel.findOne({ name: DEFAULT_COUNTERPARTY_NAME });
        model.client_id = client ? client._id : null;  

        model.service_date = ticket_date;

        // If status = 8 it means that ticket canceled
        model.is_void = false;
        model.is_returned = false;
        model.is_paid = false;
        model.group_invoice_id = null;

        let currency = await References.UnitClassifierModel.findOne({ name: DEFAULT_UNIT_CLASSIFIER_NAME });
        currency = currency._id || null;

        model.offer_currency_id = currency;
        model.total_currency_id = currency;

        model.provider_id = null;
        model.taxes_payment_id = null;
        model.curator_id = null;
        model.currency_exchange_id = null;

        let service = await References.ServiceTypeModel.findOne({ name: DEFAULT_TRAIN_ARGEST_SERVICE_TYPE });
        model.service_type_id = service._id || null;

        model.checking_account_id = null;
        model.comment = '';
        model.responsible_agent_id = null;
        model.agent_id = null;
        model.is_processed = false;
        model.returned_document = '';

        model.detail_info = {};
        model.detail_info.train_number = ticket.travel.trip.id;
        model.detail_info.carriage_number = ticket.sold_seats.car_id;
        model.detail_info.place = ticket.sold_seats.id;
        model.detail_info.service_type = '';

        let departure_dt = `${ticket.travel.dep_date} ${ticket.travel.src_dep}`;
        let arrival_dt = `${ticket.travel.arr_date} ${ticket.travel.dst_arr}`;
        departure_dt = await this.get_date_time(departure_dt);
        arrival_dt = await this.get_date_time(arrival_dt)

        model.detail_info.arrival_dt = arrival_dt;
        model.detail_info.departure_dt = departure_dt;
        model.detail_info.payment_provider_dt = ticket_date;

        let st_code = ticket.travel.src.idx ? new RegExp(`.*${ticket.travel.src.idx}.*`, 'i') : '';
        let dep_st = await References.RailwayStationModel.findOne({ station_code : st_code });
        model.detail_info.departure_station_id = dep_st ? dep_st._id : null;

        st_code = ticket.travel.dst.idx ? new RegExp(`.*${ticket.travel.dst.idx}.*`, 'i') : '';
        let arr_st = await References.RailwayStationModel.findOne({ station_code : st_code });
        model.detail_info.arrival_station_id = arr_st ? arr_st._id : null;

        let individual = {
            last_name_native: ticket.sold_seats.passenger.surname,
            first_name_native: ticket.sold_seats.passenger.name
        };

        let individual_counterparty = await References.IndividualCounterpartyModel.findOne(individual);

        if(!individual_counterparty){
            individual_counterparty = new References.IndividualCounterpartyModel(individual);
            individual_counterparty = await individual_counterparty.save();
        }
        model.detail_info.surname_id = individual_counterparty._id;

        model.detail_info.ticket_number = ticket.asps_code_2;


        let sup_cost = ticket.sold_seats.price.articles[0].price;
        sup_cost = await this.get_cost_from_str(sup_cost);

        model.detail_info.supplier_cost = {};
        model.detail_info.supplier_cost.sum = sup_cost;
        model.detail_info.supplier_cost.mpe = 0;
        model.detail_info.supplier_cost.currency_id = currency;

        model.detail_info.supplier_commision = {};
        model.detail_info.supplier_commision.sum = 0;
        model.detail_info.supplier_commision.mpe = 0;
        model.detail_info.supplier_commision.percent = 0;
        model.detail_info.supplier_commision.currency_id = currency;

        model.detail_info.forfeit = {};
        model.detail_info.forfeit.sum = 0;
        model.detail_info.forfeit.mpe = 0;
        model.detail_info.forfeit.currency_id = currency;

        model.detail_info.agency_services = {};
        model.detail_info.agency_services.sum = 0;
        model.detail_info.agency_services.mpe = 0;
        model.detail_info.agency_services.percent = 0;
        model.detail_info.agency_services.bank_percent = 0;
        model.detail_info.agency_services.currency_id = currency;

        let  o_ser_sum = ticket.sold_seats.price.articles[1].price;
        o_ser_sum = await this.get_cost_from_str(o_ser_sum);
        let  o_ser_mpe = ticket.sold_seats.price.tax;
        o_ser_mpe = await this.get_cost_from_str(o_ser_mpe);

        model.detail_info.other_services = {};
        model.detail_info.other_services.sum = o_ser_sum;
        model.detail_info.other_services.mpe = o_ser_mpe;
        model.detail_info.other_services.currency_id = currency;

        model.detail_info.total_amount = {};
        model.detail_info.total_amount.sum = (model.detail_info.supplier_cost.sum + model.detail_info.supplier_commision.sum +
            model.detail_info.forfeit.sum + model.detail_info.agency_services.sum + model.detail_info.other_services.sum);
        
        model.detail_info.total_amount.mpe = (model.detail_info.supplier_cost.mpe + model.detail_info.supplier_commision.mpe +
            model.detail_info.forfeit.mpe + model.detail_info.agency_services.mpe + model.detail_info.other_services.mpe);
        model.detail_info.total_amount.currency_id = currency;

        model.detail_info.additional_info ='';
        model.detail_info.total_amount_ucop = 0;
        model.detail_info.ucop_mpe =0;

        return model;
    }

    async get_cost_from_str(str){
        if(!str) return 0;

        let result = 0;

        let first_part = str.substring(0, str.length - 2); 
        let second_part = str.substring(str.length - 2);
        let str_num = `${first_part}.${second_part}`;
        try{
            result = parseFloat(str_num);
        }
        catch(err){
            console.log(`[TainArgestMapper] Warning: В процесі парсингу числа ${str_num} виникла помилка.`);
            console.log(err);
            
            result = 0;
        }

        return result;
    }

    async get_date_time(dt){
        let date_time = moment.utc(dt, ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss']);

        if(!date_time.isValid()){
            console.log(`[TainArgestMapper] Waring: Date ${dt} is invalid`);
            return null;
        }

        return date_time.toDate();
    }
}

export default new TainArgestMapper();