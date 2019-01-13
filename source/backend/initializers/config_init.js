import * as config from '../config/config.json';

export function get_config_data(){
    let _env = `dev`;// process.env ? process.env : 'dev';
    let conf_obj = Object.assign({}, config[_env]);
    return conf_obj;
}