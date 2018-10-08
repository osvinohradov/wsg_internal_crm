import { Avia } from '../../models';
import { HttpResponseError } from '../../infrastructure';

const AviaInvoice = Avia.AviaInvoice;

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /avia_invoice
 * 
 * Description:
 * Функція знаходить всі Авіа Накладні з параметрами skip та limit і повертає клієнту виборку.
 * 
 * Example (POST) data:
 * {
 * }
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
export async function get_all_avia_invoices(req, res){
    let avia_invoices = null;
    let skip = parseInt(req.query.skip ? req.query.skip : 0);
    let limit = parseInt(req.query.limit ? req.query.limit : 15);
    try{
        //res.status(200).json(get_mock_invoice());
        avia_invoices = await AviaInvoice.find({}).skip(skip).limit(limit);

        if(!avia_invoices){
            res.status(404).json({ "Error": "Avia Invoices not found." });
            return;
        }

        res.status(200).json(avia_invoices);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /avia/invoice
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт ??? із тіла, та зберігає його в БД.
 * 
 * Example (POST) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function create_avia_invoice(req, res) {
    let err = null;
    let body = req.body;

    try {
        let airport = new AviaInvoice(body);
        err = airport.validateSync();

        if (err) {
            throw new HttpResponseError(`Validate error. Avia invoice was not created.`, 400, err);
        }

        airport = await airport.save();

        if (!airport) {
            throw new HttpResponseError(`Avia invoice not saved.`, 400);
        }

        res.status(200).json(airport);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: PUT
 * 
 * Route: /avia/invoice/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт ??? із тіла запиту,
 * та ідентифікатор із рядка запиту, та обовлює вже існуючий об'єкт в БД.
 * 
 * Example (PUT) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function update_avia_invoice(req, res) {
    let airport_id = req.params.id;
    let airport = req.body;

    try {
        let update = await AviaInvoice.findByIdAndUpdate(airport_id, airport, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Avia invoice not found or parameters invalid.`, 400, null);
        }

        res.status(200).json(update);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: DELETE
 * 
 * Route: /avia/invoice/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає ідентифікатор із рядка запиту,
 * знаходить обє'кт в БД та видаляє його.
 * 
 * Example (DELETE) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function remove_avia_invoice(req, res) {
    let airport_id = req.params.id;
    try {
        await AviaInvoice.remove({ _id: airport_id });
        res.status(200).json({ "Status": `OK.` });
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /avia/invoice/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає ідентифікатор із рядка запиту,
 * знаходить обє'кт в БД та повертає його клієнту.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_avia_invoice_by_id(req, res) {
    let airport_id = req.params.id;
    let airport = null;

    if (!airport_id) {
        res.status(400).json({ "Error": `Bad raquest. Avia invoice id is empty.` });
        return;
    }

    try {
        airport = await AviaInvoice.findById(airport_id).populate('GroupInvoiceId');

        if (!airport) {
            throw new HttpResponseError(`Avia invoice with id ${airport_id} not found.`, 404, null);
        }

        res.status(200).json(airport);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /avia/count/invoice
 * 
 * Description:
 * Функція повертає кількість збережених ???.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_avia_invoice_count(req, res) {
    let airports_count = null;
    try {
        airports_count = await AviaInvoice.count();

        if (!airports_count) {
            throw new HttpResponseError(`Can't get avia invoice count.`, 404, null);
        }

        res.status(200).json(airports_count);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}


function get_mock_invoice(){
    let invoices = [
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameNative: "Варава",
                    FirstNameNative: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        }),
        new Avia.AviaInvoice({
            Number: 67621,
            Date: "07.09.2017 17:14:13",
            PaymentForm: "Банківській рахунок",
            PaymentDate: "07.09.2017",
            TicketsCount: 1,
            TotalAmount: 6597,
            ClientId: {
                _id: "id",
                Name: "OPCI"
            },
            ServiceDate: "27.09.2017",
            IsVoid: true,
            IsReturned: false,
            IsPaid: false,
            GroupInvoiceId: null,
            OfferCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            TotalCurrencyId: {
                _id: "id",
                Name: "grn"
            },
            ProviderId: {
                _id: "id",
                Name: "ІАТА Україна"
            },
            TaxesPayment: "IATA Україна",
            CuratorId: {
                _id: "id",
                Name: "Curator"
            },
            BookingCode: "63HEZR",
            CurrencyExchangeId: {
                _id: "id",
                Name: "NBU"
            },
            ServiceTypeId: {
                _id: "id",
                Name: "AirTickets"
            },
            CheckingAccount: "Checking account",
            Comment: "galileo =566-6776657936",
            ResponsibleAgent: "Ігор Дзуєнко",
            Agent: "Ігор Дзуєнко",
            PmCode: "91",
            IsOpened: false,
            DetailInfo: {
                NameId: {
                    _id: "id",
                    LastNameEng: "Варава",
                    FirstNameEng: "Дмитро"
                },
                TicketNumber: "566-6776657936",
                PurchaseDate: "07.09.2017",
                SupplierCost: {
                    Sum: 3855,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                SupplierCommision: {
                    Sum: 1,
                    MPE: 0,
                    Percent: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                Forfeit: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedSupplierRate: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalSupplierComission: {
                    Sum: 0,
                    MPE: 0,
                    CashSum: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                UsedTaxes: {
                    Sum: 0,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AgencyServices: {
                    Sum: 30,
                    MPE: 0,
                    Percent: 0,
                    BankPercent: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                OtherServices: {
                    Sum: 2712,
                    MPE: 0,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                TotalAmount: {
                    Sum: 6597,
                    MPE: 5,
                    CurrencyId: {
                        _id: "id",
                        name: "грн"
                    }
                },
                AdditionalInfo: "additional info"
            },
            FlightInfo: [{
                FlightNumber: "PS 515",
                Place: "",
                DeparturePlace: "KIEV/BORISPIL (KBP, Terminal)",
                ArrivalPlace: "TBILISI (TBS, Terminal)",
                ServiceType: "K",
                DepartureTime: "27.09.2017 12:00:00",
                ArrivalTime: "27.09.2017 15:45:00"
            },{
                FlightNumber: "PS 516",
                Place: "",
                DeparturePlace: "TBILISI (TBS, Terminal)",
                ArrivalPlace: "KIEV/BORISPIL (KBP, Terminal)",
                ServiceType: "K",
                DepartureTime: "30.09.2017 16:35:00",
                ArrivalTime: "30.09.2017 18:35:00"
            }],
            TicketsInfo: [{
                Name: "Варава Дмитро",
                TicketNumber: "566-6776657936"
            }]
        })
    ];

    return invoices;
}