// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/curators')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        References.CuratorController.get_curators(req, res);
    });

router.route('/reference/curators/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        References.CuratorController.get_curators_names(req, res);
    });

router.route('/reference/curator')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        References.CuratorController.create_curator(req, res);
    })

router.route('/reference/curator/:id')
    // Отримуємо єлемент за переданим ідентифікатором
    .get(async (req, res) => {
        References.CuratorController.get_curator(req, res);
    })
    // Оновлюємо вже існуючий єлемент за переданім ідентифікатором
    .put(async (req, res) => {
        References.CuratorController.update_curator(req, res);
    })
    // Видаляємо вже існуючий єлемент за переданим ідентифікатором
    .delete(async (req, res) => {
        References.CuratorController.delete_curator(req, res);
    })

router.route('/reference/count/curator')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        References.CuratorController.get_curators_count(req, res);
    });

export default router;