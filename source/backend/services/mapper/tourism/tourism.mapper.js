// Built-in packages
// Installed packages
import moment from 'moment';
// Internal packages
import { Mapper } from '../mapper';
import { generate_random_number } from '../../../helpers';
import { PAYMENT_FORMS, DEFAULT_COUNTERPARTY_NAME, DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE, MPE_RATE } from '../../../constants/common';
import { Ref } from '../../../models';

class TourismMapper extends Mapper{
    constructor(){
        super();
    }

    async map(ticket, model){
        console.log('Ticket: ', ticket);
        let trourism_invoice = new model();
        trourism_invoice.number = generate_random_number();  
        trourism_invoice.date = ticket.booking.createdAt;
        trourism_invoice.service_date = ticket.booking.checkOut;
        trourism_invoice.client_id = null;
        trourism_invoice.service_type_id = null;

        trourism_invoice.detail_info = {};

        console.log('Tourism invoice: ', ticket)
    }

    async get_date_time(dt_str){
        let value = moment(dt_str, ['YYYY-MM-DDTHH:mm:ss', 'DD.MM.YYYY HH:mm:ss']);
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

export default new TourismMapper();
