import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

// 
import chokidar from 'chokidar';

/**
 * Класс описывает процесс наблюдения за файлами.
 */
export class FileWatcher extends EventEmitter{
    constructor(path_to_dir){
        this.path_to_dir = path_to_dir;
        this.handlers = [];
        this.watcher = null;
    }
    add_handler(callback){
        if(typeof callback !== "function"){
            console.log(``);
            return;
        }
        this.handlers.push(callback);
    }
    
    initialize_watcher(){
        if(!path.isAbsolute(this.path_to_dir)){
            let error = new Error(`Шлях до каталогу ${this.path_to_dir} повинен бути абсолютним!`);
            throw error;
        }
        this.watcher = chokidar.watch(dir, { 
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true
        });
        this.watcher.on('add', this._file_is_copied)
    }

    _file_is_copied(path, file_info){
        let self = this;
        fs.stat(path, function(err, stat){
            if(err){
                console.log(`Ошибка при получении информации о файле.`);
                return;
            }
            function inner_handler(err, prev_stat){
                fs.stat(path, function(err, stat){
                    if(err){
                        console.log(err);
                        return;
                    }
                    if(stat.mtime.getTime() === prev_stat.mtime.getTime()){
                        console.log(`Файл ${path} успешно получен.`);
                        self.handlers.forEach((element, index, array) => {
                            element(path);
                        });
                    }
                    else{
                        console.log(`Копирование файла ${path}.`);
                        setTimeout(inner_handler, 200, path, stat);
                    }
                });
            }
            setTimeout(inner_handler, 200, path, stat);
        });
    }
}
