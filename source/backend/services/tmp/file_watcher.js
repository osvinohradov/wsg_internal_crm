import fs from 'fs';
import path from 'path';
import utils from 'util';

import chokidar from 'chokidar';

import { TicketsParser } from './tickets_parser';
import { TicketMapper } from './tickets_mapper';

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
    
        this.watcher = chokidar.watch(this.dir_name, { 
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true
        });

        let self = this;
        this.watcher.on('add', function(path, file_info){
            self._added_files_handler(path, file_info);
        });
    }

    async _added_files_handler(path, file_info){
        let self = this;
        fs.stat(path, function(err, stat){
            if(err) throw err;
            function func (path, prev_stat){
                fs.stat(path, async (err, stat) => {
                    if(err) throw err;
                    if(stat.mtime.getTime() === prev_stat.mtime.getTime()){
                        console.log('Finished');
                        await self.parse_file(path);
                    }
                    else{
                        console.log('Copying')
                        setTimeout(func, 200, path, stat)
                    }
                });
            }
            setTimeout(func, 200, path, stat)
        });
    }

    async parse_file(path){
        fs.readFile(path, async (err, data) => {
            if(err){
                console.log(`Білет не прочитанно: ${path}\n`, err);
                return;
            }
            // Парсим билет
            let parsed_ticket = await TicketsParser.parseAviaTicketFromXML(data.toString());
            // Сопоставляем полученный на предыдущем шаге билет с инвойсом
            let avia_invoices = await this.mapper.avia_ticker_from_amadeus_xml_mapper(parsed_ticket);

            for(let i =0; i < avia_invoices.length; i++){
                let avia_invoice = avia_invoices[i];
                let saved = avia_invoice.save();
                if(!saved){
                    console.log(`[Ticket Parser] Авіабілет не збереженно.`)
                    console.log(saved);
                    return;
                }
            }
        });
    }
}

export {
    FileWatcher
}
