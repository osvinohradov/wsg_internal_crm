// Built-in packages

// Installed packages

// Internal packages
import { Parser } from '../parser';


class TourismParser extends Parser {

    constructor(){
        super();
    }

    async parse(xml_ticket){
        let ticket_as_obj = await this.get_xml_data(xml_ticket);
        let invoice = this.get_invoice(ticket_as_obj, null);
        return invoice;
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
        let result = Object.assign(invoice, date);
        return result;
    }

    async get_attr(arr, is_child){
        let section = {};

        for(let i = 0; i < arr.length; i++){
            let elem = arr[i];
            section[elem.name] = {
                attrs: null,
                elements: []
            }

            let attrs = {};
            for(let prop in elem.attributes){
                attrs[prop] = elem.attributes[prop]
            }

            for(let i = 0; i < elem.children.length; i++){
                let element = null;
                element = await this.get_attr(elem.children, true);
                section[elem.name]['elements'].push(element);
            }

            section[elem.name]['attrs'] = attrs;
        }

        return section;
    }
}

export default new TourismParser();