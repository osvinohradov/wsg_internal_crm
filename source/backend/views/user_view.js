import { BaseView, Exception } from '../lib';
import { UserModel } from '../models';
import { generate_random_number } from '../helpers';


class UserView extends BaseView{
    constructor(){
        super();
    }

    async get_users_names(req, res){
        let users = null;

        let user_name = req.query.user_name;

        try{
            users = await UserModel.get_users_names(user_name);

            this.send_success_response(res, users);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, {}, 500);
        }
    }
}

export default new UserView();