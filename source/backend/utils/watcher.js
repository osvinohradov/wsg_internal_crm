// Built-in packages
import fs from 'fs';
import { EventEmitter } from 'events';
// Installed packages
import chokidar from 'chokidar';


class FileWatcher{
    constructor(dir_name, handler_type, ticket_category){
        this.dir_name = dir_name;
        this.handler_type = handler_type;
        this.ticket_category = ticket_category;
        this.watcher = null;
        this.initialize_watcher();
    }

    initialize_watcher(){
        this.watcher = chokidar.watch(this.dir_name, {
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true
        });
    }

    start_watch(cb){
        if(typeof cb !== 'function'){
            console.log(`Параметр не являється функцією.`);
            return;
        }
        this.cb = cb;
        this.watcher.on('add', this._is_file_copied.bind(this));
    }

    _is_file_copied(path, file_info){
        let self = this;
        fs.stat(path, (err, stat) => {
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
                        self.cb(path, self.handler_type, self.ticket_category);
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

export default FileWatcher;