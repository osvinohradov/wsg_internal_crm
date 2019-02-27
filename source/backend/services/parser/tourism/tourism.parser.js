// Built-in packages
import util from 'util';
// Installed packages
import xml_parser from 'xml-parser';
// Internal packages
import { Parser } from '../parser';


class TourismParser extends Parser {

    constructor(){
        super();
    }

    async parse(xml_ticket){
        let ticket_as_obj = await this.get_xml_data(xml_ticket);
        let invoice = this.get_invoice(ticket_as_obj, null);
        console.log(util.inspect(ticket_as_obj, true, Infinity, true));
    }

    async get_invoice(ticket, model){
        let invoice = {}
        ticket = ticket.root;
        invoice[ticket.name] = {};
        invoice[ticket.name]['checkOut'] = ticket.attributes.checkOut;
        invoice[ticket.name]['checkIn'] = ticket.attributes.checkIn;
        invoice[ticket.name]['createdAt'] = ticket.attributes.createdAt;
        invoice[ticket.name]['createdBy'] = ticket.attributes.createdBy;
        invoice[ticket.name]['bookingId'] = ticket.attributes.bookingId;
        invoice[ticket.name]['brand'] = ticket.attributes.brand;

        let date = await this.get_attr(ticket.children);

        console.log(invoice);
        console.log(date);

    }

    async get_attr(arr){
        let section = {};

        for(let i = 0; i < arr.length; i++){
            let elem = arr[i];

            let attrs = {};
            for(let prop in elem.attributes){
                attrs[prop] = elem.attributes[prop]
            }

            section[elem.name] = {}
            section[elem.name]['attrs'] = attrs;
            //section[elem.name]['child'] = child;
        }

        return section;
    }
}

export default new TourismParser();