export class BaseView{

    send_success_response(res, data={}, statusCode=200){
        let response = {
            success: true,
            fail: false,
            error: null,
            status: statusCode,
            data: data
        }
        // Сделать все возможные проверки параметров
        res.status(statusCode).json(response);
    }

    send_error_response(res, data={}, statusCode=404){
        let response = {
            success: false,
            fail: true,
            error: data,
            data: null,
            status: statusCode
        }
        res.status(statusCode).json(response);
    }

}