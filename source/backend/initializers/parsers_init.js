import { TrainTicketHandler } from '../services';

let config = global.app.config.path_to_files;
new TrainTicketHandler(config);