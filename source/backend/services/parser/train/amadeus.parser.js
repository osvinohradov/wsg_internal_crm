// Built-in packages
import util from 'util';
// Installed packages
import xml_parser from 'xml-parser';
// Internal packages
import { Parser } from '../parser';

class TrainAmadeusParser extends Parser {

    constructor(){
        super();
    }

    async parse(xml_str){
        let ticket_as_obj = await this.get_xml_data(xml_str);
        let additional_params = await this.get_additional_data(ticket_as_obj);
        let ticket_content = await this.get_ticket_content(ticket_as_obj);
        let invoice = await this.get_section(ticket_content);
        invoice.additional_params = additional_params;

        return invoice;
    }

    async get_xml_data(xml_ticket){
        let xml_data = xml_parser(xml_ticket);
        return xml_data;
    }

    async get_additional_data(ticket){
        let ticket_data = ticket.root.children[0];
        let additional_params = {};
        
        additional_params['creation_date'] = ticket_data['attributes']['Timestamp'];

        return additional_params;
    }

    async get_ticket_content(ticket){
        let ticket_content = ticket.root.children[0].children;

        return ticket_content;
    }

    async get_section(section_arr){
        let section = {};

        for (let i = 0; i < section_arr.length; i++) {
            const element = section_arr[i];
            
            // Если элемент содержит дочерние элементы, нужно сделать перебор дочерних элементов
            if(element.children.length != 0){
                let inner_obj = await this.get_section(element.children);
                if(section[element.name] && !Array.isArray(section[element.name])){                    
                    let tmp = section[element.name];
                    section[element.name] = new Array();
                    section[element.name].push(tmp);
                    section[element.name].push(inner_obj);
                }
                else if(Array.isArray(section[element.name])){
                    section[element.name].push(inner_obj);
                }
                else{
                    section[element.name] = inner_obj;
                }
                continue;
            }

            if(!element.content)
                continue;

            section[element.name] = element.content;        
        }
        return section;
    }
}

export default new TrainAmadeusParser();