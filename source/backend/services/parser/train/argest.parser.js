// Built-in packages
import util from 'util';
// Installed packages

// Internal packages
import { Parser } from '../parser';

class TrainArgestParser extends Parser {

    constructor(){
        super();
    }

    async parse(xml_ticket){
        let ticket_as_obj = await this.get_xml_data(xml_ticket);
        let body = ticket_as_obj.root.children;
        let ticket_content = await this.parse_ticket_recursive(body);
        return ticket_content;        
    }

    
}

export default new TrainArgestParser();