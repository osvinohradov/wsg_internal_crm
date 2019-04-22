// Builf-in packages
import util from 'util';
// Installed packages
import { Router as eRouter } from 'express';
// Internal packages
import { LoggerModel } from '../models';

class Router{

    // There is we will store object eRouter (Router from express)
    static __registered_routes = [];
    static __auth_service = null;

    // Using for register routes in app, receive app object as parameter and base_url that null by default
    static register_routes(app, base_url=null){
        if(!app){
            console.log(`[Router.register_routes] Error: app parameter must be an object.`);
            return;
        }
        base_url = util.isNull(base_url) || !base_url ? '' : base_url;
        // Register all routes in express app
        this.__register_routes(app, base_url);
    }

    static __register_routes(app, base_url){
        for(let i = 0; i < this.__registered_routes.length; i++){
            const route = this.__registered_routes[i];
            app.use(base_url, route);
        }
    }

    static set_auth_service(service){
        if(!service){
            console.log(`You have to pass service object.`);
            return;
        }
        this.__auth_service = service;
    }

    register_routes(routes){
        if(!routes || !routes.length || util.isPrimitive(routes)){
            console.log(`[Router.register_routes] Error: routes is not an array of objects or router object.`);
            return;
        }

        // Check if route received as object or as array
        if(!util.isArray(routes)){
            if(routes.multiple){
                this.__register_multiple_route(routes);
            }
            else{
                this.__register_single_route(routes);
            }
        }

        for(let i = 0; i < routes.length; i++){
            const route = routes[i];
            if(route.multiple){
                this.__register_multiple_route(route);
            }
            else{
                this.__register_single_route(route);
            }
        }
        // TODO: Maybe need to delete
        return {};
    }

    __register_multiple_route(route){
        // TODO: Implement this method
        const router = eRouter();
        let _router = router.route(route.url);
        for(let i = 0; i < route.handlers.length; i++){
            let elem = route.handlers[i];
            let method = elem.method.toLowerCase();
            _router[method](this.__route_handler(elem));
        }
        Router.__registered_routes.push(router);
    }

    __register_single_route(route){
        let router = eRouter();
        let method = route.method.toLowerCase();
        router[method](route.url, this.__route_handler(route));
        // Add router to routers array
        Router.__registered_routes.push(router);
    }

    __route_handler(route){
        return async function(req, res, next){
            console.log(`${req.method}: ${req.path}`)
            if(route.auth){
                let user = null;
                let err;
                // Description: If route contains auth property with true value, it means that we must to validate incoming data
                // also route must contain auth_service property with some service, if it's wrong we will send status code 400
                if(!Router.__auth_service){
                    route.controller.send_failed_response(res, { msg: `Authentication failed.` }, 409);
                    return;
                }

                [user, err] = await Router.__auth_service.verify_user_auth_data(req);
                if(!user || err){
                    route.controller.send_failed_response(res, err, 401);
                    return;
                }
                req.user = user;
            }

            if(route.middleware){
                // TODO: Call middleware function
            }

            if(route.validate_data){
                // TODO: Implement function for validate data
            }

            // If all conditions checked we call route handler
            // TODO: Implement logger
            try{
                route.handler.call(route.controller, req, res, next);
            }
            catch(err){
                console.log(err);
                route.controller.send_failed_response(res, { msg: `Something went wrong. Please, see logs.`}, 500);
            }            
        }
    }
}

// Example of route

// {
//     url: '/auth/login',
//     method: 'POST',
//     controller: AuthController,
//     handler: AuthController.login,
//     handlers: null,
//     middleware: null, // Maybe we will use it in future
//     multiple: false,
//     validate_data: true,
//     auth: false,
//     schema: ''
// }

// {   url: '/user_settings/:settings_id',
//     handler: null,
//     multiple: true,
//     handlers: [{
//         method: 'PUT',
//         controller: AccountSettingsCtrl,
//         handler: AccountSettingsCtrl.update_account_settings,
//         middleware: null, // Maybe we will use it in future
//         auth: true,
//         auth_service: null,
//         validate_data: true,
//         schema: ''
//     }],
// }

export default Router;