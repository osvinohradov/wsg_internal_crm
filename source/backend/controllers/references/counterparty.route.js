// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/counterparties')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        References.CounterpartyController.get_counterparties(req, res);
    });

router.route('/reference/counterparties/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        References.CounterpartyController.get_counterparties_names(req, res);
    });

router.route('/reference/counterparty')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        References.CounterpartyController.create_counterparty(req, res);
    })

router.route('/reference/counterparty/:id')
    // Отримуємо єлемент за переданим ідентифікатором
    .get(async (req, res) => {
        References.CounterpartyController.get_counterparty(req, res);
    })
    // Оновлюємо вже існуючий єлемент за переданім ідентифікатором
    .put(async (req, res) => {
        References.CounterpartyController.update_counterparty(req, res);
    })
    // Видаляємо вже існуючий єлемент за переданим ідентифікатором
    .delete(async (req, res) => {
        References.CounterpartyController.delete_counterparty(req, res);
    })

router.route('/reference/count/counterparty')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        References.CounterpartyController.get_counterparties_count(req, res);
    });

export default router;