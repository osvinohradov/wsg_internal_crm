import { Avia } from '../models';

export class TicketMapper{
    constructor(){

    }

    /**
     * 
     * @param {AviaTicketXML} xml_ticket
     * 
     * @returns {AviaInvoice} avia_invoice
     */
    async avia_ticker_from_amadeus_xml_mapper(xml_ticket){
        if(!xml_ticket) return null;
    }

    async avia_ticket_doc_to_invoice_mapper(doc_ticket){
        let avia_invoice = new Avia.AviaInvoice();
    
    }
}
