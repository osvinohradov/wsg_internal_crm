const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Контрагенти
const ReferenceCounterpartySchema = new Schema({
    // Найменування
    Name            :{ type: String },
    // Загальні
    General         :{ type: {
        // Фіз./Юр. особа (enumerate [Фізична особа, Юридична особа])
        Person :{ type: String },
        // Не є резидентом
        IsResident :{ type: Boolean },
        // Повне найменування
        FullName :{ type: String },
        // Група (посилання на групу контрагентів)
        GroupId :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
        // Головний контрагент (Посилання на групу контрагентів)
        MainCounterparty :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
        // Основний договір (посилання Договори контрагентів)
        MainContact :{ type: String },
        // Основний бануівській рахунок (посилання на Банківські рахунки)
        BankAccount :{ type: String }
    } },
    // Інші
    Others          :{ type: {
        // ІПН
        IPN         :{ type: String },
        // Код ЕДРПОУ
        EDRPOUCode      :{ type: String },
        // Паспорт 
        Passport        :{ type: String },
        // Номер свідотства ПДВ
        MPECertificate         :{ type: String },
        // Виділити послуги агенства
        AgencyServices  :{ type: Boolean }
    } },
    // Контакти
    Contacts        :{ type: {
        // Тип (перелік Адреса, Телефон, Адреса електронної пошти, Веб сторінка, Інше)
        ContactType     :{ type: String },
        // Вид (поки що вручну)
        Type            :{ type: String },
        // Представлення
        Representation  :{ type: String },
    } },
    // Фізичні особи (посилання на Фізичні особи) Потрібні поля: (Фізична особа, Коментар)
    IndividualsId  :{ type: String },
    // Послуги
    ServicesId     :{ type: {
        // Послуга (посилання на Види сервісів)
        ServiceId         :{ type: String },
        // Агентська винагорода
        AgentAward        :{ type: Number },
        // Процент банку
        BankPercent       :{ type: Number }
    } },
    //
    TouristServices     :{ type: {
        // Послуга
        Name    :{ type: String }
    } },
    // Коментар
    Comment         :{ type: String },
});

// Групи контрагентів
const ReferenceCounterpartiesGroupSchema = new Schema({
    // Найменування групи
    Name            :{ type: String }
});

const ReferenceCounterparty = mongoose.model('ReferenceCounterparty', ReferenceCounterpartySchema);
const ReferenceCounterpartiesGroup = mongoose.model('ReferenceCounterpartiesGroup', ReferenceCounterpartiesGroupSchema);

exports.ReferenceCounterparty = ReferenceCounterparty;
exports.ReferenceCounterpartiesGroup = ReferenceCounterpartiesGroup;
