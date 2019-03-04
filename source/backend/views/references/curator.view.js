import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class CuratorController extends BaseView{
    constructor(){
        super();
    }

    async get_curators(req, res){
        let curators = null;
        let skip = 0;
        let limit = 10;
        try{
            curators = await Ref.CuratorModel.find({}).skip(skip).limit(10);

            this.send_success_response(res, curators);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async get_curator(req, res){
        let curator_id = req.params.id;
        try{
            let curator = await Ref.CuratorModel.findOne({ _id: curator_id});

            this.send_success_response(res, curator);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async create_curator(req, res){
        let curator = req.body;

        curator = new Ref.CuratorModel(curator);
        let is_invalid = curator.validateSync();
        if(is_invalid){
            // TODO: Return error
            console.log(is_invalid);
            this.send_error_response(res, is_invalid.errors, 404);
            return;
        }

        curator = await curator.save();

        this.send_success_response(res, curator);
    }

    async update_curator(req, res){
        let curator_id = req.params.id;
        let curator = req.body;

        // TODO: Validate body
        curator = await Ref.CuratorModel.findOneAndUpdate({ _id: curator_id }, curator, { new: true });
        
        this.send_success_response(res, curator);
    }

    async delete_curator(req, res){
        let curator_id = req.params.id;

        let deleted = await Ref.CuratorModel.findOneAndDelete({ _id: curator_id });
        // TODO: Send status
        this.send_success_response(res, {});
    }

    async get_curators_count(req, res){
        let curators_count = null;

        curators_count = await Ref.CuratorModel.countDocuments({});

        this.send_success_response(res, { count: curators_count});
    }

    async get_curators_names(req, res){
        let curators = null;
 
        let curator_name = req.query.curator_name;
 
         try{
             curators = await Ref.CuratorModel.get_curators_names(curator_name);
 
             this.send_success_response(res, curators);
         }
         catch(err){
             console.log(err)
             // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
             this.send_error_response();
         }
     }
}

export default new CuratorController();