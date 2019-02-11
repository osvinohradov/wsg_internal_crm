import mongoose from 'mongoose';
import body_parser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookie_parser from 'cookie-parser';

// import { register_routes } from './controllers';
import { FileWatcher } from './services';

import { config_init, dir_init, route_init } from './initializers';
import { initialize_train_ticket_parsers } from './services/train_ticket_parser';

require('./models/initialize_db');

require('./service_db_init/initialize_zhd_station');

const app = express();
const port = 8080;
const baseUrl = '/api/v1';

app.use(body_parser.json());
app.use(cookie_parser());
app.use(cors({ origin: '*' }))



global.app = app;

global.app.config = config_init.get_config_data();
console.log(global.app.config)
//register_routes(app, baseUrl);

initialize_train_ticket_parsers(global.app.config)

dir_init.directory_initializer(global.app.config['path_to_files'])
route_init.register_routes(app, baseUrl);

// Вынести в конфигурационный файл
let avia_xml_tickets_dir = 'E:\\test_ticket';

// let avia_xml_watcher = new FileWatcher(avia_xml_tickets_dir);
// avia_xml_watcher.initialize_watcher();



mongoose.connect(`mongodb://localhost:27017/wsg_db`, { useNewUrlParser: true });

const server = app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});

export default app;