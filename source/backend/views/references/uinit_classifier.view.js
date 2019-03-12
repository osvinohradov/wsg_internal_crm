import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class UnitClassifierController extends BaseView{
    constructor(){
        super();
    }

    // async get_unit_classifiers(req, res){
    //     let service_types = null;
    //     let skip = 0;
    //     let limit = 10;
    //     try{
    //         service_types = await Ref.UnitClassifierModel.find({}).skip(skip).limit(10);

    //         this.send_success_response(res, service_types);
    //     }
    //     catch(err){
    //         console.log(err)
    //         // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
    //         this.send_error_response(res, null, 404);
    //     }
    // }

    // async get_service_type(req, res){
    //     let service_type_id = req.params.id;
    //     try{
    //         let service_type = await Ref.UnitClassifierModel.findOne({ _id: service_type_id});

    //         this.send_success_response(res, service_type);
    //     }
    //     catch(err){
    //         console.log(err)
    //         // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
    //         this.send_error_response(res, null, 404);
    //     }
    // }

    // async create_service_type(req, res){
    //     let service_type = req.body;

    //     service_type = new Ref.UnitClassifierModel(service_type);
    //     let is_invalid = service_type.validateSync();
    //     if(is_invalid){
    //         // TODO: Return error
    //         console.log(is_invalid);
    //         this.send_error_response(res, is_invalid.errors, 404);
    //         return;
    //     }

    //     service_type = await service_type.save();

    //     this.send_success_response(res, service_type);
    // }

    // async update_service_type(req, res){
    //     let service_type_id = req.params.id;
    //     let service_type = req.body;

    //     // TODO: Validate body
    //     service_type = await Ref.UnitClassifierModel.findOneAndUpdate({ _id: service_type_id }, service_type, { new: true });

    //     this.send_success_response(res, service_type);
    // }

    // async delete_service_type(req, res){
    //     let service_type_id = req.params.id;

    //     let deleted = await Ref.UnitClassifierModel.findOneAndDelete({ _id: service_type_id });
    //     // TODO: Send status
    //     this.send_success_response(res, {});
    // }

    // async get_service_type_count(req, res){
    //     let service_type_count = null;

    //     service_type_count = await Ref.UnitClassifierModel.countDocuments({});

    //     this.send_success_response(res, { count: service_type_count});
    // }

    async get_unit_classifiers_names(req, res){
        let unit_classifiers = null;
 
        let unit_classifier_name = req.query.unit_classifier_name;
 
        try{
            unit_classifiers = await Ref.UnitClassifierModel.get_unit_classifiers_names(unit_classifier_name);

            this.send_success_response(res, unit_classifiers);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, {}, 500);
        }
     }
}

export default new UnitClassifierController();