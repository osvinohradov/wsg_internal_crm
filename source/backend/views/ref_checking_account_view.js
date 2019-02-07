import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class ReferenceCheckingAccountView extends BaseView{
    constructor(){
        super();
    }

    async get_checking_accounts_names(req, res){
       let checking_accounts = null;

       let checking_account_name = req.query.checking_account_name;

        try{
            checking_accounts = await Ref.ReferenceCheckingAccountModel.get_checking_accounts_names(checking_account_name);

            this.send_success_response(res, 200, checking_accounts);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new ReferenceCheckingAccountView();