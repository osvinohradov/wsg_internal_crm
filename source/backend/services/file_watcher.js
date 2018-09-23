import fs from 'fs';
import path from 'path';

import chokidar from 'chokidar';

import { Avia } from '../models';
import { TicketsParser } from './tickets_parser';
import { TicketMapper } from './tickets_mapper';

const AviaInvoice = Avia.AviaInvoice;

class FileWatcher{
    constructor(dir_name){
        this.dir_name = dir_name;
        this.counter = 1;
        this.watcher = null;
        this.mapper = new TicketMapper();
    }

    initialize_watcher(){
        if(!this.dir_name){
            console.log(`Праметр dir_name не повинен дорівнювати - ${dir_name}`);
            return;
        }

        if(!path.isAbsolute(this.dir_name)){
            console.log(`Шлях до дирикторії повинен бути абсолютний, наприклад, C:\\tickets`);
            return;
        }
    
        this.watcher = chokidar.watch(dir_name, { 
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true
        });
    
        this.watcher.on('add', this._added_files_handler);
    }

    async _added_files_handler(path, file_info){
        console.log('Added new file:', path, ' ', this.counter);
        this.counter++;
        fs.readFile(path, async function(err, data){
            if(err){
                console.log(`Білет не прочитанно: ${path}`, err);
                return;
            }
    
            let parsed_ticket = await TicketsParser.parseAviaTicketFromXML(data.toString());
            let avia_invoice = await this.mapper.avia_ticker_from_amadeus_xml_mapper(parsed_ticket);

            avia_invoice.save();
            if(err){
                console.log(`[Ticket Parser] Авіабілет не збереженно.`)
                console.log(err);
            }

            console.log('\n\n\n');
            console.log(parsed_ticket)
        });        
    }

}

let dir_name = 'E:\\test_ticket';


let fw = new FileWatcher(dir_name);
fw.initialize_watcher()
