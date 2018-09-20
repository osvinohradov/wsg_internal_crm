import { Avia } from '../../models';

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
export async function get_avia_invoices(req, res){
    let avia_invoices = null;
    let skip = req.query.skip ? req.query.skip : 0;
    let limit = req.query.limit ? req.query.limit : 15;

    try{
        res.status(200).json(get_mock_invoice());
        return;
        avia_invoices = await Avia.AviaInvoice.find({}).skip(skip).limit(limit);

        if(!avia_invoices){
            res.status(404).json({ "Error": "Avia Invoices not found." });
            return;
        }

        res.status(200).json(avia_invoices);
    }
    catch(err){
        console.log(err);
        req.status(500).json({ "Error": `Internal Server Error.` });
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