import fs from 'fs';
import path, { dirname } from 'path';
import { EventEmitter } from 'events';

// 
import chokidar from 'chokidar';

/**
 * Класс описывает процесс наблюдения за файлами.
 */
class _FileWatcher extends EventEmitter{
    constructor(dir_name, handler){
        this.dir_name = dir_name;
        this.handler = handler;
        this.watcher = null;
    }

    init_watcher(){
        this.watcher = chokidar.watch(this.dir_name, { 
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true
        });
        this.watcher.on('add', this._file_is_copied)
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
                        self.handler(path);
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


export class FileWatcher{

    static create_file_watcher(dir_name, handler){
        if(typeof callback !== "function"){
            console.log(`Параметр handler не являється функцією.`);
            return null;
        }

        if(!path.isAbsolute(dir_name)){
            console.log(`Шлях до каталогу ${dir_name} повинен бути абсолютним!`);
            return null;
        }

        return new _FileWatcher(dir_name, handler);
    }
}





// export class FileWatcher extends EventEmitter{
//     constructor(path_to_dir){
//         this.path_to_dir = path_to_dir;
//         this.handlers = [];
//         this.watcher = null;
//     }
    
//     initialize_watcher(){
//         this.watcher = chokidar.watch(dir, { 
//             ignored: /(^|[\/\\])\../,
//             ignoreInitial: true
//         });
//         this.watcher.on('add', this._file_is_copied)
//     }

//     _file_is_copied(path, file_info){
//         let self = this;
//         fs.stat(path, function(err, stat){
//             if(err){
//                 console.log(`Ошибка при получении информации о файле.`);
//                 return;
//             }
//             function inner_handler(err, prev_stat){
//                 fs.stat(path, function(err, stat){
//                     if(err){
//                         console.log(err);
//                         return;
//                     }
//                     if(stat.mtime.getTime() === prev_stat.mtime.getTime()){
//                         console.log(`Файл ${path} успешно получен.`);
//                         self.handlers.forEach((element, index, array) => {
//                             element(path);
//                         });
//                     }
//                     else{
//                         console.log(`Копирование файла ${path}.`);
//                         setTimeout(inner_handler, 200, path, stat);
//                     }
//                 });
//             }
//             setTimeout(inner_handler, 200, path, stat);
//         });
//     }
// }
