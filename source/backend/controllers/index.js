import * as AviaController from './routes';
import * as ReferencesController from './reference';
import { register_routes } from './routes';


let Controllers = {
    AviaController,
    ReferencesController
}


export {
    register_routes,
    Controllers
}