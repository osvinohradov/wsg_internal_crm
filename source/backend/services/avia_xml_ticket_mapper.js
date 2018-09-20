import { Utils, Avia } from '../models';

/**
 * 
 * @param {AviaTicketXML} xml_ticket
 * 
 * @returns {AviaInvoice} avia_invoice
 */
export async function avia_ticker_from_xml_mapper(xml_ticket) {
    if(!xml_ticket) return null;

    let avia_invoice = new Avia.AviaInvoice();

    // Дата создания
    // avia_invoice.Date = xml_ticket.CreationDate;
    // // Код бронирования
    // avia_invoice.BookingCode = xml_ticket.RecordLocator;
    // //
    // avia_invoice.TicketsCount = 
    // //
    // avia_invoice.TotalAmount = 
    // // 
    // avia_invoice.



}

/**
 * 
 * @param {*} doc_ticket 
 * 
 * @returns {AviaInvoice} avia_invoice
 */
export async function avia_ticket_doc_to_invoice_mapper(doc_ticket){
    let avia_invoice = new Avia.AviaInvoice();

}