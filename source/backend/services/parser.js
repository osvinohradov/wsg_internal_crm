import fs from 'fs';

//
import xml_parser from 'xml-parser';

export class ParserHandler{
    constructor(ticket_parser, watcher){
        this.ticket_parser = ticket_parser;
        this.watcher = watcher;
    }
    read_file(file_path){
        fs.readFile(file_path, function(err, data){
            if(err){
                console.log(`Не удалось прочитать файл.`);
                console.log(err);
                return;
            }
            data = data.toString();
            this.parse(data);
        })
    }

    convert_xml_string_to_object(xml_string){
        return xml_parser(xml_string);
    }

    parse(xml_string){
        if(!xml_string){
            console.log(``);
            return;
        }
    }
}