import { Avia } from '../models';

class TicketMapper{
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
        
        // mapping
        let avia_invoices = []

        for(let i = 0; i < xml_ticket.NameElement.length; i ++){
            // Create new Avia Invoice object
            let avia_invoice = new Avia.AviaInvoice();
            let current_element = xml_ticket.NameElement[i];

            avia_invoice.Date = xml_ticket.CreationDate;
            avia_invoice.PaymentForm = "Банківсткий рахунок";
            avia_invoice.TicketsCount = 1;
            // change hardcode, если имеем два билета в одномЮ но парсятся они как отдельные, какую дату полета выбирать????
            avia_invoice.ServiceDate = xml_ticket.NameElement[0].Ticket[0].AirSegment[0].DepartureDate;
            avia_invoice.ProviderId = {
                Name: "IATA Україна"
            };
            avia_invoice.TaxesPayment = "IATA Україна";
            avia_invoice.ServiceTypeId = {
                Name: "Airtickets"
            };
            PmCode = xml_ticket.AgentSignBooking;


        }
        


    }

    async avia_ticket_doc_to_invoice_mapper(doc_ticket){
        let avia_invoice = new Avia.AviaInvoice();
    
    }
}

export {
    TicketMapper
}
