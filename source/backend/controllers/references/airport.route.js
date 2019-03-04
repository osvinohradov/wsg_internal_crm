// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/airports')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        References.AirportController.get_airports(req, res);
    });

router.route('/reference/airport')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        References.AirportController.create_airport(req, res);
    })

router.route('/reference/airport/:id')
    // Отримуємо єлемент за переданим ідентифікатором
    .get(async (req, res) => {
        References.AirportController.get_airport(req, res);
    })
    // Оновлюємо вже існуючий єлемент за переданім ідентифікатором
    .put(async (req, res) => {
        References.AirportController.update_aiprport(req, res);
    })
    // Видаляємо вже існуючий єлемент за переданим ідентифікатором
    .delete(async (req, res) => {
        References.AirportController.delete_airport(req, res);
    })

router.route('/reference/count/airport')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        References.AirportController.get_airports_count(req, res);
    });


export default router;