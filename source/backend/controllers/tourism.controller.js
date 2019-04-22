// Built-in packages

// Installed packages

// Internal packages
import { Controller } from '../core';
import { TourismInvoiceModel } from '../models';


class TourismController extends Controller{
    /**
     * Description:
     *      Method for retrieve tourism invoices from db.
     * 
     * Method: GET
     * URL: /tourim/invoices
     * 
     * @param {HttpRequest} req - Request from client 
     * @param {HttpResponse} res - Response from server 
     */
    async get_tourism_invoices(req, res){
        const skip = req.query.slip || 0;
        const limit = req.query.limit || 10;
        let tourism_invoices = null;

        tourism_invoices = await TourismInvoiceModel.find_invoices({}, { skip: skip, limit: limit });

        this.send_success_response(res, tourism_invoices);
    }

    /**
     * Description:
     *      Method for retrieve tourism invoice by id
     * 
     * Method: GET
     * URL: /tourism/invoice
     * 
     * @param {HttpRequest} req - Request from client 
     * @param {HttpResponse} res - Response from server 
     */
    async get_tourism_invoice_by_id(req, res){
       
    }

    async create_tourism_invoice(req, res){ 
        
    }

    async update_tourism_invoice(req, res){
        
    }

    async delete_tourism_invoice(req, res){ 
    
    }
}

export default new TourismController();