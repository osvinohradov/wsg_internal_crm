import path from 'path';
import fs from 'fs';

import { Exception } from '../lib';
/**
 * Опис:
 *      Фнкція призначена для ініціалізації каталогів для збереження квитків, які надходять до системи.
 *      Спочатку перевіряється таблиця settings на наявність шляхів, встановлених користувачем.
 *      Якщо данні відсутні - перевіряємо чи існують вже данні каталоги, якщо їх не існую, необхідно їх створити,
 *      в іншому випадку - ігноруємо.
 * @param {*} config 
 */
export function directory_initializer(config){
    if(!config){
        throw new Exception("Parameter config must be passed.");
    }

    let base_dir = path.join(config['root'], config['dir_name']);

    for(let item in config['categories']){
        let category_catalog = path.join(base_dir, item);
        create_directory(category_catalog);

        for(let current_category in config['categories'][item]){
            let catalog = path.join(base_dir, item, current_category);
            create_directory(catalog);
        }        
    }
}


function create_directory(dir_name){
    fs.exists(dir_name, (exists) => {
        if(!exists){
            fs.mkdir(dir_name, (err) => {
                if(err){
                    console.log(err)
                    // Add description
                    // throw new Exception()
                    return;
                }
                console.log(`Folder ${dir_name} created!`)
            });
        }
    });
}