import fs from 'fs';
import path from 'path';

/**
 * {
 *   "argest": {
 *      "parser": function,
 *      "mapper": function
 *   }
 * }
 */

class TrainTicketHandler{
    constructor(train_dirs_config){
        this.base_dir = path.join(train_dirs_config['root'], train_dirs_config['dir_name']);
        this.categories = train_dirs_config['categories']['train'];
        this.handlers = {}; 
    }

    set_parser(kind_of_ticket, parser_callback){
        this.handlers[kind_of_ticket] = this.handlers[kind_of_ticket] ? this.handlers[kind_of_ticket] : {};
        this.handlers[kind_of_ticket]['parser'].push(parser_callback);

    }
    set_mapper(kind_of_ticket, mapper_callback){
        this.handlers[kind_of_ticket] = this.handlers[kind_of_ticket] ? this.handlers[kind_of_ticket] : {};
        this.handlers[kind_of_ticket]['mapper'].push(mapper_callback);
    }
}


export function initialize_train_ticket_parsers(config){
    if(!config){
        console.log(`Не передано параметр з конфігурацією. Парсери ЖД білетів не ініціалізовано.`);
        return;
    }

    
}


// fs.readFile(train_file_path, (err, data) => {
//     if(err){
//         console.log(`Залізничний білет не прочитано: ${train_file_path}`);
//         console.error(err);
//         return;
//     }
//     data = data.toString();
//     //let ticket = parse_train_ticket(data);
//     let json_ticket = parse_ticket( xml_parser(data).root.children);

//     console.dir(json_ticket, {
//         colors: true,
//         depth: Infinity
//     });
   
// });