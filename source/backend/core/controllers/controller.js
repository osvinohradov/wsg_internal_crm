// Builf-in packages

// Installed packages

// Internal packages


class Controller{
    constructor(){

    }

    // async validate_user(req, res)

    async send_success_response(res, body, msg='', status=200){
        // TODO: Add validation for params
        res.status(status).json({
            success: true,
            msg: msg,
            body: body,
            error: null, 
            status: status
        });
    }

    async send_failed_response(res, error, msg='', status=404){
        // TODO: Add validation for params
        res.status(status).json({
            success: false,
            msg: msg,
            body: null,
            error: error, 
            status: status
        });
    }

    async send_invalid_model_data(res, errors){
        // TODO: Generate error object
        this.send_failed_response(res, errors, `ValidationError occurred.`, 409);
    }
}

export default Controller;