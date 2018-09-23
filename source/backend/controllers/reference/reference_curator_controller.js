import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/curator')
    .get(async (req, res) => {
        ReferenceHandler.CuratorView.get_all_curators(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.CuratorView.create_curator(req, res);
    });

router.route('/references/curator/:id')
    .get(async (req, res) => {
        ReferenceHandler.CuratorView.get_curator_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.CuratorView.update_curator(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.CuratorView.remove_curator(req, res);
    });

router.route('/references/count/curator')
    .get(async (req, res) => {
        ReferenceHandler.CuratorView.get_curator_count(req, res);
    })

export { router };