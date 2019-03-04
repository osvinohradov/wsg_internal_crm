// Built-in packages

// Installed packages
import { Router } from 'express';
// Internal packages
import { References } from '../../views';


const router = Router();

router.route('/reference/counterparty_contracts')
    // Отримуємо n єлементів за БД
    .get(async (req, res) => {
        References.CounterpartyContractController.get_counterparty_contracts(req, res);
    });

router.route('/reference/counterparty_contract')
    // Створюэмо новий елемент в таблиці
    .post(async (req, res) => {
        References.CounterpartyContractController.create_counterparty_contract(req, res);
    })

router.route('/reference/counterparty_contract/:id')
    // Отримуємо єлемент за переданим ідентифікатором
    .get(async (req, res) => {
        References.CounterpartyContractController.get_counterparty_contract(req, res);
    })
    // Оновлюємо вже існуючий єлемент за переданім ідентифікатором
    .put(async (req, res) => {
        References.CounterpartyContractController.update_counterparty_contract(req, res);
    })
    // Видаляємо вже існуючий єлемент за переданим ідентифікатором
    .delete(async (req, res) => {
        References.CounterpartyContractController.delete_counterparty_contract(req, res);
    })

router.route('/reference/count/counterparty_contract')
    // Отримуємо загальну кількість елементів в таблиці
    .get(async (req, res) => {
        References.CounterpartyContractController.get_counterparty_contract_count(req, res);
    });


export default router;