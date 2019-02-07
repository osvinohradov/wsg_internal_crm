import xml_parser from 'xml-parser';
import { map_ticket_from_argest } from '../mappers/mappers';

import * as models from '../../../models';

function parse_ticket_from_argest(xml_ticket){
    let section = {};

    for (let i = 0; i < xml_ticket.length; i++) {
        const element = xml_ticket[i];
        // Если элемент содержит дочерние элементы, нужно сделать перебор дочерних элементов
        if(element.children.length != 0){
            section[element.name] = parse_ticket_from_argest(element.children);
            continue;
        }
        section[element.name] = element.content;        
    }
    return section;
}

export async function parse_ticket(xml_ticket){
    let ticket = xml_ticket.root.children
    let json_ticket = parse_ticket_from_argest(ticket);
    let json_for_parsing = json_ticket['ReservationsList'];
    
    let additional_params = {
        time_stamp: xml_ticket.root.children[0].attributes.Timestamp
    }
    let train_ticket = await map_ticket_from_argest(json_for_parsing, additional_params);
    
    await train_ticket.save();

    console.log('##################################################################################')
    console.log(train_ticket)
    console.log('##################################################################################')
}