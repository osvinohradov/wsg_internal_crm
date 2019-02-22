// Built-in packages
import fs from 'fs';
import path from 'path';
// Installed packages

// Internal packages
import { isEmpty, FileWatcher } from '../utils';
import { TrainInvoiceModel } from '../models';


class TicketHandlerService{
    
    handlers = {};
    models = {
        train: TrainInvoiceModel,
        avia: ''
    }

    constructor(config){
        // Store config object
        this.config = config;
        this.initialize_ticket_handler();
    }

    async initialize_ticket_handler(){
        await this._init_dirs();
        await this.set_parser();
        await this.initialize_watchers();
       
    }

    async process_ticket(path_to_ticket, handler_type, ticket_category){
        console.log('######################################');
        console.log('path to ticket: ', path_to_ticket);
        console.log('handler type: ', handler_type);
        console.log('ticket category: ', ticket_category);
        console.log('######################################');
    }

    async set_parser(){
        // 
        if(!this.config){
            console.log(`Неможливо налаштувати парсери. Об'єкт з конфігурацією не передано.`)
            return;
        }
        //
        let types = this.config['types'];
        // 
        for(let type in types){
            // 
            this.handlers[type] = {}
            // 
            for(let category in types[type]['categories']){
                //               
                this.handlers[type][category] = {};
                //
                for(let handler in types[type]['categories'][category]['handlers']){
                    //
                    let fn = await this.get_handler(type, handler, types[type]['categories'][category]['handlers'][handler]);
                    this.handlers[type][category][handler] = fn;
                }
            }
        }
        console.log('==========================');
        console.log(this.handlers)
        console.log('==========================');
    }

    async get_handler(category, handler, file_name){
        // Формуємо рядок зі шляхом до директорії з обробником
        const dir = `${__dirname}${path.sep}${handler}${path.sep}${category}`;
        // Формуємо ім'я файлу
        let f_name = `${file_name}.${handler}.js`;
        // Зчитиємо всі файли з директорії
        let files = fs.readdirSync(dir);
        // Формуємо повний шлях до файлу обробника
        let file_path = `${dir}${path.sep}${f_name}`;
        // Перевіряємо чи є файл з обробником у відповідній директорії
        if(!files.includes(f_name)){
            console.log(`Файл ${file_path} не знайдено.`);
            return null;
        }
        // Завантажуємо файл з обробником
        let fn = null;
        try{
            fn = require(file_path).default;
        }
        catch(err){
            console.log(`Під час завантаження файлу ${file_path} сталася помилка`);
            console.log(err)
        }
        
        // Перевіряємо чи підключили мі обробник, якщо ні, повертаємо нульове значення
        if(!fn){
            console.log(`Невдалося завантажити файл ${file_path}`);
            return null;
        }
        // Повертаємо функцію обробника
        return fn;
    }

    async initialize_watchers(){
        if(isEmpty(this.handlers)){
            console.log(`Обробникыв не встановленно.`);
            return;
        }
        
        let watcher = new FileWatcher(`D:\\wsg_data\\train\\amadeus`, "train", 'amadeus');
        watcher.start_watch(this.process_ticket.bind(this));
    }

    async _init_dirs(){
        if(!this.config){
            console.log(`Об'єкт з конфігурацією не передано.`);
            return;
        }
        
        let main_dir = `${this.config.root_dir}${path.sep}${this.config.dir_name}`;
        let is_main_dir_exists = fs.existsSync(main_dir);
        if(!is_main_dir_exists){
            console.log(`Створення директорії: ${main_dir}`);
            fs.mkdirSync(main_dir);
        }
        await this._create_sub_dirs(main_dir, this.config.types);
    }

    async _create_sub_dirs(base_dir, types){
        if(!types){
            console.log(`Не передано об'єкт з категоріями квитків`);
            return;
        }

        for(let type in types){
            const folder_name = types[type]['folder_name'];
            let dir_name = `${base_dir}${path.sep}${folder_name}`;
            let f_created = await this._create_dir(dir_name);
            if(!f_created){
                console.log(`Директорію ${dir_name} не створено.`);
                continue;
            }

            for(let category in types[type]['categories']){
                let category_dir = `${dir_name}${path.sep}${category}`;
                let created = await this._create_dir(category_dir);
                if(created){
                    console.log(`Директорію ${category_dir} успішно створено.`);
                }
                else{
                    console.log(`Директорію ${category_dir} не створено.`);
                }
            }
        }
    }

    async _create_dir(_path){
        if(!_path){
            console.log(`Відсутня директорія ${_path}. Параметр повинен містити шлях до каталогу.`);
            return false;
        }

        if(!path.isAbsolute(_path)){
            console.log(`Шляг до каталогу ${_path} повинен бути абсолютним.`);
            return false;
        }

        let is_dir_exists = fs.existsSync(_path);
        if(!is_dir_exists){
            console.log(`Cтворюємо директорію: ${_path}`);
            fs.mkdirSync(_path);
            is_dir_exists = fs.existsSync(_path);
        }
        return is_dir_exists;
    }
}

export {
    TicketHandlerService
}