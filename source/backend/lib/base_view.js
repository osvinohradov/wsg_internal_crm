export class BaseView{

    send_success_response(res, data={}, statusCode=200){
        // Сделать все возможные проверки параметров
        res.status(statusCode).json(data);
    }

    send_error_response(res, data={}, statusCode=404){
        res.status(statusCode).json(data);
    }

}