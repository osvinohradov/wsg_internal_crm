import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/nomenclature')
    .get(async (req, res) => {
        ReferenceHandler.NomenclatureView.get_all_nomenclatures(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.NomenclatureView.create_nomenclature(req, res);
    });

router.route('/references/nomenclature/:id')
    .get(async (req, res) => {
        ReferenceHandler.NomenclatureView.get_nomenclature_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.NomenclatureView.update_nomenclature(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.NomenclatureView.remove_nomenclature(req, res);
    });

router.route('/references/count/nomenclature')
    .get(async (req, res) => {
        ReferenceHandler.NomenclatureView.get_nomenclature_count(req, res);
    })

export { router };