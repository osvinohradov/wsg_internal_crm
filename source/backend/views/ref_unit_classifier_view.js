import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class ReferenceUnitClassifierView extends BaseView{
    constructor(){
        super();
    }

    async get_unit_classifiers_names(req, res){
       let unit_classifiers = null;

       let unit_classifier_name = req.query.unit_classifier_name;

        try{
            unit_classifiers = await Ref.ReferenceUnitClassifierModel.get_unit_classifiers_names(unit_classifier_name);

            this.send_success_response(res, 200, unit_classifiers);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new ReferenceUnitClassifierView();