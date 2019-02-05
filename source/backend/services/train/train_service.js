import path from 'path';
import fs from 'fs';

import { parse_ticket_from_argest } from './parsers/argest_parser';
import { map_ticket_from_argest } from './mappers/mappers';
import  { FileWatcherFactory } from '../../utils';

export function train_xml_ticket_initializer(config){
    let _path = config['path_to_files'];
    let dir_name = path.join(_path['root'], _path['dir_name'], "train", config['path_to_files']['categories']['train']['argest']);
    console.log(dir_name);
    
    // let tickets_from_argest_warcher = FileWatcherFactory.create_file_watcher(dir_name)
}

function read_file(file_name){
    fs.readFile(file_name, (data) => {

    })
}
