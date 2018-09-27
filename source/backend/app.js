import mongoose from 'mongoose';
import body_parser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookie_parser from 'cookie-parser';

import { register_routes } from './controllers';
import { FileWatcher } from './services';

const app = express();
const port = 8080;
const baseUrl = '/api/v1';

app.use(body_parser.json());
app.use(cookie_parser());
app.use(cors({ origin: '*' }))

register_routes(app, baseUrl);

// Вынести в конфигурационный файл
let avia_xml_tickets_dir = 'E:\\test_ticket';

let avia_xml_watcher = new FileWatcher(avia_xml_tickets_dir);
avia_xml_watcher.initialize_watcher();



mongoose.connect(`mongodb://localhost:27017/wsg_db`);

const server = app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});

export default app;