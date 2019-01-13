import { train_ctrl } from '../controllers';

/**
 * 
 * @param {app} object
 * 
 * @returns {void} void
 */
export function register_routes(app, base_route){
    // Avia routes section
    app.use(base_route, train_ctrl);
}