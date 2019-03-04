// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/avia_companies')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        References.AviaCompanyController.get_avia_companies(req, res);
    });

router.route('/reference/avia_company')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        References.AviaCompanyController.create_avia_company(req, res);
    })

router.route('/reference/avia_company/:id')
    // Отримуємо єлемент за переданим ідентифікатором
    .get(async (req, res) => {
        References.AviaCompanyController.get_avia_company(req, res);
    })
    // Оновлюємо вже існуючий єлемент за переданім ідентифікатором
    .put(async (req, res) => {
        References.AviaCompanyController.update_avia_company(req, res);
    })
    // Видаляємо вже існуючий єлемент за переданим ідентифікатором
    .delete(async (req, res) => {
        References.AviaCompanyController.delete_avia_company(req, res);
    })

router.route('/reference/count/avia_company')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        References.AviaCompanyController.get_avia_company_count(req, res);
    });


export default router;