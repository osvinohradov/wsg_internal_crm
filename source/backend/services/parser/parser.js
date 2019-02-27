// Built-in packages

// Installed packages
import xml_parser from 'xml-parser';
// Internal packages


export class Parser{

    constructor(){}

    async get_xml_data(xml_ticket){
        let xml_data = xml_parser(xml_ticket);
        return xml_data;
    }

    async parse_section(section_arr){
        
    }

    async parse_ticket_recursive(section_arr){
        let section = {};

        for (let i = 0; i < section_arr.length; i++) {
            const element = section_arr[i];
            
            // Если элемент содержит дочерние элементы, нужно сделать перебор дочерних элементов
            if(element.children.length != 0){
                let inner_obj = await this.parse_ticket_recursive(element.children);
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