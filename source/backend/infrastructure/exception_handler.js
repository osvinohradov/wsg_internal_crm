class HttpResponseError{
    /**
     * 
     * @param {*} exception_data 
     */
    constructor(message, status_code, inner_exception){
        this.message = message;
        this.status_code = status_code;
        this.inner_exception = inner_exception;
    }
}

export {
    HttpResponseError
}