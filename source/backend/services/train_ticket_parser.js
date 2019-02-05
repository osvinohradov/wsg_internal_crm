import { map_ticket_from_argest } from './train/mappers/mappers';
import { parse_ticket } from './train/parsers/argest_parser';


import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import chokidar from 'chokidar';
import xml_parser from 'xml-parser';

export function initialize_train_ticket_parsers(config){
    let path_name = "D:\\wsg_data\\train\\argest";
    let watcher = FileWatcherFactory.create_file_watcher(path_name, read_file, parse_ticket);
    watcher.init_watcher();
}

function read_file(file_name, handler){
   fs.readFile(file_name, function(err, data){
       if(err){
           console.log("Error during read file");
           console.log(err);
           return;
       }
        let data_str = data.toString();
        let xml_data = xml_parser(data_str);
        handler(xml_data)
   });
}

/**
 * Класс описывает процесс наблюдения за файлами.
 */
class _FileWatcher extends EventEmitter{
    constructor(dir_name, handler, parser){
        super();
        this.dir_name = dir_name;
        this.handler = handler;
        this.parser = parser;
        this.watcher = null;
    }

    init_watcher(){
        this.watcher = chokidar.watch(this.dir_name, { 
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true
        });
        this.watcher.on('add', this._is_file_copied.bind(this))
    }

    _is_file_copied(path, file_info){
        let self = this;
        fs.stat(path, function(err, stat){
            if(err){
                console.log(`Помилка при отриманні інформації про файл.`);
                return;
            }
            function inner_handler(err, prev_stat){
                fs.stat(path, function(err, stat){
                    if(err){
                        console.log(err);
                        return;
                    }
                    if(stat.mtime.getTime() === prev_stat.mtime.getTime()){
                        console.log(`Файл ${path} успішно отримано.`);
                        self.handler(path, self.parser);
                    }
                    else{
                        console.log(`Копіювання файлу ${path}.`);
                        setTimeout(inner_handler, 200, path, stat);
                    }
                });
            }
            setTimeout(inner_handler, 200, path, stat);
        });
    }

}


class FileWatcherFactory{

    static create_file_watcher(dir_name, handler, parser){
        if(typeof handler !== "function"){
            console.log(`Параметр handler не являється функцією.`);
            return null;
        }

        if(!path.isAbsolute(dir_name)){
            console.log(`Шлях до каталогу ${dir_name} повинен бути абсолютним!`);
            return null;
        }

        return new _FileWatcher(dir_name, handler, parser);
    }
}