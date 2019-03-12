// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/individual_counterparty_passports')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        // References.ServiceTypeController.get_service_types(req, res);
    });

router.route('/reference/individual_counterparty_passports/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        References.IndividualCounterpartyController.get_individual_counterparties_names(req, res);
    });

router.route('/reference/individual_counterparty_passport')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        //References.ServiceTypeController.create_service_type(req, res);
    })

router.route('/reference/individual_counterparty_passport/:id')
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

router.route('/reference/count/individual_counterparty_passport')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        //References.ServiceTypeController.get_service_type_count(req, res);
    });


export default router;