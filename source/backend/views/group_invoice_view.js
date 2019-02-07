import { BaseView, Exception } from '../lib';
import { GroupInvoiceModel } from '../models';
import { generate_random_number } from '../helpers';


class GroupInvoiceView extends BaseView{
    constructor(){
        super();
    }

    async get_group_invoices_names(req, res){
        let invoices = null;
        let group_invoice_name = req.query.group_invoice_name;
        
        try{
            invoices = await GroupInvoiceModel.get_group_invoices_names(group_invoice_name);

            this.send_success_response(res, 200, invoices);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new GroupInvoiceView();