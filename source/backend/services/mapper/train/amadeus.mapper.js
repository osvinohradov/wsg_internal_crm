// Built-in packages
// Installed packages
import moment from 'moment';
// Internal packages
import { Mapper } from '../mapper';
import { generate_random_number } from '../../../helpers';
import { PAYMENT_FORMS,
         DEFAULT_UNIT_CLASSIFIER_NAME,
         DEFAULT_COUNTERPARTY_NAME,
         DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE,
         MPE_RATE } from '../../../constants/common';
import { References } from '../../../models';

class TrainAmadeusMapper extends Mapper{
    constructor(){
        super();
    }

    async map(ticket, model){
        let invoices = [];

        if(Array.isArray(ticket.passenger)){
            for(let i = 0; i < ticket.passenger.length; i++){
                console.log(`================================ ${i} ================================`);
                
                let invoice = await this._get_invoice(ticket, model, i);
                invoices.push(invoice);
            }
        }
        else{
            let invoice = await this._get_invoice(ticket, model, null);
            invoices.push(invoice);
        }

        return invoices;
    }

    /**
     * 
     * @param {*} tfx 
     * @param {*} passanger 
     * @param {*} model
     */
    async _get_invoice(tfx, model, pass_number){
        let t = new model();
        let date = await this.get_date_time(tfx.additional_params.creation_date);

        t.number = generate_random_number();
        t.date = date;
        // Payment form equals credit by default
        t.payment_form = PAYMENT_FORMS['credit'];
        t.tickets_count = 1;

        let client = await References.CounterpartyModel.findOne({ name: DEFAULT_COUNTERPARTY_NAME });
        t.client_id = client ? client._id : null;  
        t.service_date = date; // возможно заменить (спросить у Игоря)

        t.is_void = false;  
        t.is_returned = false;
        t.is_paid = false;
        t.group_invoice_id = null;

        let currency = await References.UnitClassifierModel.findOne({ name: DEFAULT_UNIT_CLASSIFIER_NAME });
        currency = currency._id || null;
        t.offer_currency_id = currency;
        t.total_currency_id = currency;

        t.provider_id = null;
        t.taxes_payment = null;
        t.curator_id = null;
        t.currency_exchange_id = null;

        let service = await References.ServiceTypeModel.findOne({ name: DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE });
        t.service_type_id = service ? service._id : null;

        t.checking_account_id = null;
        t.comment = '';
        t.responsible_agent_id = null;
        t.agent_id = null;
        t.is_processed = false;
        t.returned_document = '';

        t.detail_info = {};
        // номер поезда
        t.detail_info.train_number = tfx.trainNumber;
        // номер вагона
        t.detail_info.carriage_number = tfx.wagonNumber;
        // номер места
        let seat = null;
        if(pass_number == null){
            seat = tfx.seats
        }
        else{
            let seats = tfx.seats.split(', ');
            seat = seats[pass_number];
            console.log('Seat: ', seat)
        }
        t.detail_info.place = seat;
        // Тип сервиса 
        t.detail_info.service_type = tfx.wagonType;

        let st_code = tfx.departureStationCode ? new RegExp(`.*2${tfx.departureStationCode}.*`, 'i') : '';
        let departure = await References.RailwayStationModel.findOne({ $or: [{ name_eng: tfx.departureStation }, { station_code : st_code } ]});
        t.detail_info.departure_station_id = departure ? departure._id : null;
        
        st_code = tfx.arrivalStationCode ? new RegExp(`.*2${tfx.arrivalStationCode}.*`, 'i') : '';
        let arrival = await References.RailwayStationModel.findOne({ $or: [{ name_eng: tfx.arrivalStation }, { station_code : st_code } ]});
        t.detail_info.arrival_station_id = arrival ? arrival._id : null;
        
        // Дата отправления
        t.detail_info.departure_dt = await this.get_date_time(tfx.departureDate);
        // Дата и время прибытия
        t.detail_info.arrival_dt = await this.get_date_time(tfx.arrivalDate);
        // Дата покупки у поставщика
        t.payment_provider_dt = date


        let passenger = pass_number == null ? tfx.passenger : tfx.passenger[pass_number];
        console.log(passenger);
    
        // Фамилия
        let individual = {
            last_name_native: passenger.lastName,
            first_name_native: passenger.firstName
        }

        let individual_counterparty = await References.IndividualCounterpartyModel.findOne(individual);


        if(!individual_counterparty){
            individual_counterparty = new References.IndividualCounterpartyModel(individual);
            individual_counterparty = await individual_counterparty.save();
        }
        t.detail_info.surname_id = individual_counterparty._id;

        // номер билета
        t.detail_info.ticket_number = tfx.confirmationNumber;
        
        // Стоимость поставщика
        t.detail_info.supplier_cost = {};
        t.detail_info.supplier_cost.sum = await this.parse_number(tfx.documentsPrice);
        t.detail_info.supplier_cost.mpe = 0;
        t.detail_info.supplier_cost.currency_id = currency;

        // // Секція "Комісія постачальника"
        t.detail_info.supplier_commision = {};
        t.detail_info.supplier_commision.sum = 0;
        t.detail_info.supplier_commision.mpe = 0;
        t.detail_info.supplier_commision.percent = 0;
        t.detail_info.supplier_commision.currency_id = currency;

        // Секція "Штраф"
        t.detail_info.forfeit = {};
        t.detail_info.forfeit.sum = 0;
        t.detail_info.forfeit.mpe = 0;
        t.detail_info.forfeit.currency_id = currency;

        // Секція "Послуги агенції"
        t.detail_info.agency_services = {};
        t.detail_info.agency_services.sum = 0;
        t.detail_info.agency_services.mpe = 0;
        t.detail_info.agency_services.percent = 0;
        t.detail_info.agency_services.bank_percent = 0;
        t.detail_info.agency_services.currency_id = currency;

        // Секція "Інші послуги"
        t.detail_info.other_services = {};
        t.detail_info.other_services.sum = 0;
        t.detail_info.other_services.mpe = 0;
        t.detail_info.other_services.currency_id = currency;

        t.detail_info.other_services.sum = passenger.fees;
        // Other service mpe  
        t.detail_info.other_services.mpe = passenger.fees / MPE_RATE;


        // TODO: Add forfeit
        // Секція "Всього"
        t.detail_info.total_amount = {};
        let s_cos_sum = await this.parse_number(t.detail_info.supplier_cost.sum);
        let s_com_sum = await this.parse_number(t.detail_info.supplier_commision.sum);
        let a_ser_sum = await this.parse_number(t.detail_info.agency_services.sum);
        let o_ser_sum = await this.parse_number(t.detail_info.other_services.sum);
        t.detail_info.total_amount.sum = (s_cos_sum + s_com_sum + a_ser_sum + o_ser_sum).toFixed(2);

        let s_cos_mpe = await this.parse_number(t.detail_info.supplier_cost.mpe);
        let s_com_mpe = await this.parse_number(t.detail_info.supplier_commision.mpe);
        let a_ser_mpe = await this.parse_number(t.detail_info.agency_services.mpe);
        let o_ser_mpe = await this.parse_number(t.detail_info.other_services.mpe);
        
        t.detail_info.total_amount.mpe = (s_cos_mpe + s_com_mpe + a_ser_mpe + o_ser_mpe).toFixed(2);

        t.detail_info.total_amount.currency_id = currency;

        t.detail_info.additional_info = '';
        t.detail_info.total_amount_ucop = 0;
        t.detail_info.ucop_mpe = 0;

        return t;
    }

    async get_date_time(dt_str){
        let value = moment.utc(dt_str, ['YYYY-MM-DDTHH:mm:ss', 'DD.MM.YYYY HH:mm:ss']);
        return value.toDate();
    }

    async parse_number(number, flag=0){
        let parse = flag ? parseInt : parseFloat;
        let n = 0;
      
        try {
          n = parse(number);
          console.log(n)
        } catch (err) {
          console.log(`При перетворенні рядка до числа виникла помилка!`);
          console.log(err);
        }
        return n;
    }
}

export default new TrainAmadeusMapper();
