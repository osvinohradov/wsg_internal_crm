import xml_parser from 'xml-parser';


function TicketsParser(){};

TicketsParser.parseAviaTicketFromXML = async function(xml_data){
    let invoice = {};
    let json_xml = xml_parser(xml_data);
    json_xml = json_xml['root']['children'][0]['children'][0]['children'][0]['children'][0]['children'];    
    
    for(let i = 0; i < json_xml.length; i++){
        let elem = json_xml[i];
    
        if(elem.name == 'RecordLocator'){
            invoice[elem.name] = elem.content;
        }
        if(elem.name == 'CreationDate'){
            invoice[elem.name] = elem.content;
        }
        if(elem.name == 'OfficeidBooking'){
            invoice[elem.name] = elem.content;
        }
        if(elem.name == 'AgentSignBooking'){
            invoice[elem.name] = elem.content;
        }
        if(elem.name == 'ChangeDate'){
            invoice[elem.name] = elem.content;
            // invoice[elem.name] = invoice[elem.name] ? invoice[elem.name] : [];
            // invoice[elem.name].push(elem.content);
        }
        if(elem.name == 'LastTransactionDate'){
            invoice[elem.name] = elem.content;
            // invoice[elem.name] = invoice[elem.name] ? invoice[elem.name] : [];
            // invoice[elem.name].push(elem.content);
        }
        if(elem.name == 'NameElement'){
            invoice['NameElement'] = [];
    
            for(let i = 0; i < elem.children.length; i++){
                let name_elem = {};
                for (let j = 0; j < elem.children[i]['children'].length; j++) {
                    let name_inner_elem = elem.children[i]['children'][j];
                    
                    if(name_inner_elem.name == 'Tattoo'){
                        name_elem[name_inner_elem.name] = name_inner_elem.content;
                    }
                    else if(name_inner_elem.name == 'ElementNo'){
                        name_elem[name_inner_elem.name] = name_inner_elem.content;
                    }
                    else if(name_inner_elem.name == 'LastName'){
                        name_elem[name_inner_elem.name] = name_inner_elem.content;
                    }
                    else if(name_inner_elem.name == 'FirstName'){
                        name_elem[name_inner_elem.name] = name_inner_elem.content;
                    }
                    else if(name_inner_elem.name == 'Title'){
                        name_elem[name_inner_elem.name] = name_inner_elem.content;
                    }
                    else if(name_inner_elem.name == 'Ap'){                    
                        name_elem[name_inner_elem.name] = name_inner_elem.children[0].content;
                    }
                    else if(name_inner_elem.name == 'SsrDocs'){
                        name_elem[name_inner_elem.name] = [];
    
                        for (let k = 0; k < name_inner_elem.children.length; k++) {
                            let ssr_docs_elem = {};
                            for (let l = 0; l < name_inner_elem.children[k].children.length; l++) {
                                let ssr_docs_inner = name_inner_elem.children[k].children[l];
                                if(ssr_docs_inner.name == 'AirlineCode'){                    
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'DocType'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'DocCountry'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'DocNumber'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'PaxCountry'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'BirthDate'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'Gender'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'ExpiryDate'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'LastName'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'FirstName'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                }
                                else if(ssr_docs_inner.name == 'SecondName'){
                                    ssr_docs_elem[ssr_docs_inner.name] = ssr_docs_inner.content;
                                };
                            }
                            name_elem['SsrDocs'].push(ssr_docs_elem);                        
                        }
                    }
                    else if(name_inner_elem.name == 'Ticket'){                    
                        name_elem[name_inner_elem.name] = [];
                        for (let k = 0; k < name_inner_elem.children.length; k++) {
                            let ticket_elem = {};
                            for (let l = 0; l < name_inner_elem.children[k].children.length; l++) {
                                let ticket_inner_elem = name_inner_elem.children[k].children[l];
                                if(ticket_inner_elem.name == 'OfficeidTicketing'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'Status'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'No'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'IataAgencyCode'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'ValidatingCarrier'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'DocCurrency'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'FareCurrency'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'Fare'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'FareEquiv'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'FareRate'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'DocTotal'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'DocGrandTotal'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'MiscellaneousFeesTotal'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'MiscellaneousFeesVatTotal'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'TaxTotal'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'Commission'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'Endorsement'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'Type'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'Ttype'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'FlightClass'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'OrigCity'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'DestCity'){                    
                                    ticket_elem[ticket_inner_elem.name] = ticket_inner_elem.content;
                                }
                                else if(ticket_inner_elem.name == 'AirSegment'){                    
                                    ticket_elem[ticket_inner_elem.name] = [];
    
                                    for (let m = 0; m < ticket_inner_elem.children.length; m++) {
                                        let air_segment_elem = {};
    
                                        for (let n = 0; n < ticket_inner_elem.children[m].children.length; n++) {
                                            let air_segment_inner = ticket_inner_elem.children[m].children[n];
                                            if(air_segment_inner.name == 'No'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'ServiceCarrier'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'FlightNo'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'AirClass'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'BkgClass'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'DepartureDate'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'DepartureTime'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'ArrivalDate'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'ArrivalTime'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'OrigAirport'){
                                                air_segment_elem[air_segment_inner.name] = {};
                                                let inner_elem = air_segment_inner.children;
                                                air_segment_elem[air_segment_inner.name][inner_elem[0].name] = inner_elem[0].content;
                                                air_segment_elem[air_segment_inner.name][inner_elem[1].name] = inner_elem[1].content;
                                            }
                                            else if(air_segment_inner.name == 'DestAirport'){
                                                air_segment_elem[air_segment_inner.name] = {};
                                                let inner_elem = air_segment_inner.children;
                                                air_segment_elem[air_segment_inner.name][inner_elem[0].name] = inner_elem[0].content;
                                                air_segment_elem[air_segment_inner.name][inner_elem[1].name] = inner_elem[1].content;
                                            }
                                            else if(air_segment_inner.name == 'FareBasis'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'BaggageAllow'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'Meal'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'FlightDurationTime'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'Mileage'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'Equipment'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            }
                                            else if(air_segment_inner.name == 'AcRecLoc'){
                                                air_segment_elem[air_segment_inner.name] = air_segment_inner.content;
                                            };
                                        }
                                        ticket_elem[ticket_inner_elem.name].push(air_segment_elem);
                                    }
                                }
                                else if(ticket_inner_elem.name == 'Tax'){                    
                                    ticket_elem[ticket_inner_elem.name] = [];
    
                                    for(let m = 0; m < ticket_inner_elem.children.length; m++){
                                        let tax_item = {};
                                        for (let n = 0; n < ticket_inner_elem.children[m].children.length; n++) {
                                            let tax_inner = ticket_inner_elem.children[m].children[n];
                                            if(tax_inner.name == 'Amount'){                    
                                                tax_item[tax_inner.name] = tax_inner.content;
                                            }
                                            else if(tax_inner.name == 'TaxCode'){                    
                                                tax_item[tax_inner.name] = tax_inner.content;
                                            }
                                            else if(tax_inner.name == 'NatureCode'){                    
                                                tax_item[tax_inner.name] = tax_inner.content;
                                            }
                                        }
                                        ticket_elem[ticket_inner_elem.name].push(tax_item);
                                    }
                                }
                                else if(ticket_inner_elem.name == 'History'){                    
                                    ticket_elem[ticket_inner_elem.name] = [];
    
                                    for(let m = 0; m < ticket_inner_elem.children.length; m++){
                                        let history_item = {};
                                        for (let n = 0; n < ticket_inner_elem.children[m].children.length; n++) {
                                            let history_inner = ticket_inner_elem.children[m].children[n];
                                            if(history_inner.name == 'Action'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'Action'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'ActionDate'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'AirFile'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'AgentSign'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'Amount'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'NationalAmount'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'NationalCurrency'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            }
                                            else if(history_inner.name == 'FormOfPayment'){                    
                                                history_item[history_inner.name] = history_inner.content;
                                            };
                                        }
                                        ticket_elem[ticket_inner_elem.name].push(history_item);
                                    }
                                };
                            }
                            name_elem[name_inner_elem.name].push(ticket_elem);                        
                        }
                    }
                }
                invoice['NameElement'].push(name_elem);
            }
        }
    }

    return invoice;
}

TicketsParser.parseTrainInvoiceFromXML = async function(xml_data){
    let train_invoice = {};
    let train = parser(xml_data);
    let first_elem = train.root.children;

    for (let i = 0; i < first_elem.length; i++) {
        let elem = first_elem[i];
        let tmp_invoce = {};
        if(elem.name == 'ReservationsList'){
            tmp_invoce[elem.name] = {
                "Timestamp" : elem['attributes']['Timestamp'],
                "Username" : elem['attributes']['Username'],
                "ResellerCode" : elem['attributes']['ResellerCode']
            };
        }

        for (let j = 0; j < elem.children.length; j++) {
            let inner_elem = elem.children[j];

            if(inner_elem.name == 'id'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'confirmationNumber'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'trainNumber'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'wagonNumber'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'wagonType'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'seats'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'withLinen'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'departureDate'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'departureStation'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'arrivalDate'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'arrivalStation'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'serviceType'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'documentsPrice'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'vatFromDocumentPrice'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'remitCommission'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'vatFromRemitCommission'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'markup'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'vatFromMarkup'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'vatFromCommission'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'purchasePrice'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'agentCommission'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'totalPrice'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'currency'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'status'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'addDate'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'agentName'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'officeId'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'officeName'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'numberOfDocuments'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'passenger'){
                tmp_invoce[inner_elem.name] = {};

                for (let k = 0; k < inner_elem.children.length; k++) {
                    let elem = inner_elem.children[k];
                    
                    if(elem.name == 'firstName'){
                        tmp_invoce[inner_elem.name][elem.name] = elem.content;
                    }
                    else if(elem.name == 'lastName'){
                        tmp_invoce[inner_elem.name][elem.name] = elem.content;
                    }
                    else if(elem.name == 'isChild'){
                        tmp_invoce[inner_elem.name][elem.name] = elem.content;
                    }
                    else if(elem.name == 'phone'){
                        tmp_invoce[inner_elem.name][elem.name] = elem.content;
                    }
                    else if(elem.name == 'email'){
                        tmp_invoce[inner_elem.name][elem.name] = elem.content;
                    }
                }
            }
            else if(inner_elem.name == 'bankFee'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'source'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'paymentGateway'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
            else if(inner_elem.name == 'documentType'){
                tmp_invoce[inner_elem.name] = inner_elem.content;
            }
        }

        train_invoice = tmp_invoce;
    }

    return train_invoice;
}


export { TicketsParser }