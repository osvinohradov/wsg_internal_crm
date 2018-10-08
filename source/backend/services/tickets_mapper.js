import { Avia } from '../models';
import { References } from '../models';

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
        
        // Массив, в который будет помещаться билеты, в одном файле может быть несколько билетов
        let avia_invoices = [];
        // Все билеты нахоятся с секции NameElement
        for(let i = 0; i < xml_ticket.NameElement.length; i ++){
            // Создаем новый обьект Авиа билета
            let avia_invoice = new Avia.AviaInvoice();
            // записываем в переменную текущий билет
            let current_invoice = xml_ticket.NameElement[i];
            
            // номер присвоится билету при сохранении, обисанно в моделе
            let invoice_count = await Avia.AviaInvoice.count();
            let number = 0;
            console.log('Invoice count', invoice_count)
            if(!invoice_count){
                console.log('Invoices not fount. Create number.');
                // Take out to config file
                number = 18000000000;
            }
            else{
                let avia_invoice = await Avia.AviaInvoice.find().sort({ Number: -1}).limit(1);
                number = avia_invoice[0].Number + avia_invoices.length + 1;
                console.log(number);
            }
            avia_invoice.Number = number;
            // Секция, в которой записываются общие данные для всех билетов в XML файле
            avia_invoice.Date = xml_ticket.CreationDate;
            // вінести в конфигурационний файл
            avia_invoice.PaymentForm = "Банківсткий рахунок";
            // в авиа накладной всегда один билет
            avia_invoice.TicketsCount = 1;
            // change hardcode, если имеем два билета в одном, но парсятся они как отдельные, какую дату полета выбирать????
            avia_invoice.ServiceDate = xml_ticket.NameElement[0].Ticket[0].AirSegment[0].DepartureDate;
            // Клиент, по умолчанию Физическая личность, логика поиска происходит при сохранении илета
            avia_invoice.ClientId = null;
            // В первой версии все билеты купленные и задействованны
            avia_invoice.IsVoid = false;
            // В первой версии все билеты купленные и задействованны
            avia_invoice.IsReturned = false;
            // Ставит бухгалтер
            avia_invoice.IsPaid = false;
            // Групповой заказ, ставиться пользователем системы, потому как мы не знаем для кого покупается билет
            avia_invoice.GroupInvoiceId = null;
            // Поставщик для xml авиа билетов всегда IATA Україна (вынести в отдельную функцию)
            // let provider = await References.ReferenceCounterparty.findOne({Name: 'ІАТА Україна'});
            // if(!provider){
            //     console.log('Provider not found. Creating new provider.')
            //     provider = new References.ReferenceCounterparty({
            //         Name: 'ІАТА Україна'
            //     });

            //     provider = await provider.save();
            // }
            // console.log('Provider:', provider)
            // avia_invoice.ProviderId = provider._id;
            avia_invoice.ProviderId = 'ІАТА Україна'

            // Оплата таксы для xml авиа билетов всегда IATA Україна
            avia_invoice.TaxesPayment = 'ІАТА Україна';
            avia_invoice.CuratorId = null;
            avia_invoice.BookingCode = xml_ticket.RecordLocator;
            avia_invoice.CurrencyExchangeId = null;
            // Вид сервиса (ищем в базе, если нет, то создаем его)
            // let service_type = await References.ReferenceServiceType.findOne({ Name: 'AirTickets'});
            // if(!service_type){
            //     console.log('Service Type not found. Creating new Service Type.');
            //     service_type = new References.ReferenceServiceType({
            //         Name: 'AirTickets'
            //     });

            //     service_type = await provider.save();
            // }
            // console.log('Service Type:', service_type);
            // avia_invoice.ServiceTypeId = service_type._id;
            avia_invoice.ServiceTypeId = 'AirTickets';

            avia_invoice.CheckingAccount = '';
            avia_invoice.Comment = '';
            // Нужно заменить на поиск агента из базы
            avia_invoice.ResponsibleAgent = 'Igor Dzuienko';
            avia_invoice.Agent = 'Igor Dzuienko';
            // Добавить агента с таким номером
            avia_invoice.PmCode = xml_ticket.xml_ticket;
            avia_invoice.IsProcessed = false;
            console.log(current_invoice)
            let supplier_commission_sum = current_invoice.Ticket[0].Commission.search(/[a-zA-Z]/) != -1 ? parseInt(current_invoice.Ticket[0].Commission) : 0;
            let supplier_commission_percent = current_invoice.Ticket[0].Commission.search(/[a-zA-Z]/) == -1 ? current_invoice.Ticket[0].Commission : 0;
            avia_invoice.DetailInfo = {
                NameId: null,
                TicketNumber: current_invoice.No,
                PurchaseDate: xml_ticket.CreationDate,
                SupplierCost: {
                    Sum: current_invoice.Ticket[0].FareEquiv,
                    MPE: 0,
                    CurrencyId: null
                },
                SupplierCommision: {
                    Sum: supplier_commission_sum,
                    MPE: 0,
                    Percent: supplier_commission_percent,
                    CurrencyId: null
                },
                 // Пока не делаем
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: null
                },
                // Пока не делаем
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: null
                },
                // Пока не делаем
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: null
                },
                // Пока не делаем
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: null
                },
                // Вводят данные сами
                AgencyServices: {
                    Sum: 0,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 0,
                    CurrencyId: null
                },
                OtherServices: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: null
                },
                TotalAmount: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: null
                },
                AdditionalInfo: ''
            };
            // Уточнить информацию по полю Ticket, по усолчинию возьмем 1 билет
            let flight_infos = [];

            for(let i = 0; i < current_invoice.Ticket[0]['AirSegment'].length; i++){
                let current_flight = current_invoice.Ticket[0]['AirSegment'][i];
                let flight = {};
                flight.FlightNumber = current_flight.FlightNo;
                flight.Place = '';
                flight.DeparturePlace = current_flight.OrigAirport.Code + ' ' + current_flight.OrigAirport.AmaName;
                flight.ArrivalPlace = current_flight.DestAirport.Code + ' ' + current_flight.DestAirport.AmaName;;
                flight.ServiceType = current_flight.AirClass;
                flight.DepartureTime = current_flight.DepartureDate + ' ' + current_flight.DepartureTime;
                flight.ArrivalTime = current_flight.ArrivalDate + ' ' + current_flight.ArrivalTime;

                flight_infos.push(flight);
            }

            avia_invoice.FlightInfo = flight_infos;

            avia_invoice.TicketInfo = {
                Name: current_invoice.LastName + ' ' + current_invoice.FirstName,
                TicketNumber: current_invoice.Ticket[0].No
            }
            avia_invoices.push(avia_invoice);
        }
        return avia_invoices;
    }

    async avia_ticket_doc_to_invoice_mapper(doc_ticket){
        let avia_invoice = new Avia.AviaInvoice();
    
    }
}

export {
    TicketMapper
}
