export class BaseView{
    send_success_response(res, statusCode, data={}){
        // Сделать все возможные проверки параметров
        res.status(statusCode).json(data);
    }

    send_error_response(res, statusCode, data={}){
        res.status(statusCode).json(data);
    }
}