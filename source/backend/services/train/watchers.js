import fs from 'fs';
import path from 'path';

import chokidar from 'chokidar';

export function start_file_watcher(dir, parser, mapper){
    if(!path.isAbsolute(dir)){
        console.log(`Шлях до каталогу повинен бути абсолютним!`);
        return;
    }
    if(!parser){
        console.log(`Пармер не передано.`);
        return;
    }
    if(!mapper){
        console.log(`Не передано mapper.`);
        return;
    }
    let watcher = chokidar.watch(dir, { 
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true
    });

    watcher.on('add', read_file(parser, mapper))

}

function read_file(parser, mapper){
    return (path, file_info) => {
        fs.stat
    }
}

function is_copied_file_check(){

}

function get_file_content(path_to_file){
    if(!path){
        console.log(`Переданий шлях до файлу не вірний ${path_to_file}`);
        return;
    }
    fs.readFile(path, async (err, data) => {
        if(err){
            console.log(`Читання файлу завершилось помилкою.`);
            console.log(err);
            return;
        }
    })
}