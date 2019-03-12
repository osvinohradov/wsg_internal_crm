// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/currency_exchanges')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        References.ServiceTypeController.get_service_types(req, res);
    });

router.route('/reference/currency_exchanges/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        References.CurrencyExchangeController.get_currency_exchanges_names(req, res);
    });

router.route('/reference/currency_exchange')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        //References.ServiceTypeController.create_service_type(req, res);
    })

router.route('/reference/currency_exchange/:id')
    // Отримуємо єлемент за переданим ідентифікатором
    .get(async (req, res) => {
        //References.ServiceTypeController.get_service_type(req, res);
    })
    // Оновлюємо вже існуючий єлемент за переданім ідентифікатором
    .put(async (req, res) => {
        //References.ServiceTypeController.update_service_type(req, res);
    })
    // Видаляємо вже існуючий єлемент за переданим ідентифікатором
    .delete(async (req, res) => {
        //References.ServiceTypeController.delete_service_type(req, res);
    })

router.route('/reference/count/currency_exchange')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        //References.ServiceTypeController.get_service_type_count(req, res);
    });


export default router;