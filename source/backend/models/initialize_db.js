import * as models from './index';
import { OrganizationModel } from './lib';
import { DEFAULT_COUNTERPARTY_NAME,
         DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE,
         DEFAULT_TRAIN_ARGEST_SERVICE_TYPE } from '../constants/common';

async function init_db(){
    console.log('#################################### Initialize DB ####################################');
    

    if(await models.UserModel.countDocuments() == 0){
        console.log('======== Create new user ========');
        let user = new model.UserModel(user_obj);
        await user.save();
    }

    if(await models.References.AirportModel.countDocuments() == 0){
        console.log('======== Create Reference Airport ========');
        let reference_airport = new models.References.AirportModel(reference_airport_obj);
        await reference_airport.save();
    }
    
    if(await models.References.AviaCompanyModel.countDocuments() == 0){
        console.log('======== Create Reference Avia Company ========');
        let reference_avia_company = new models.References.AviaCompanyModel(reference_avia_company_obj);
        await reference_avia_company.save();
    }

    if(await models.References.CityModel.countDocuments() == 0){
        console.log('======== Create Reference City ========');
        let reference_city = new models.References.CityModel(reference_city_obj);
        await reference_city.save();
    }

    if(await models.References.CounterpartyModel.countDocuments() == 0){
        console.log('======== Create Reference Counterparty ========');
        let reference_counterparty = new models.References.CounterpartyModel(reference_counterparty_obj);
        await reference_counterparty.save();
    }

    if(await models.References.CounterpartyGroupModel.countDocuments() == 0){
        console.log('======== Create Reference Counterparty Group ========');
        let reference_counterparty_group = new models.References.CounterpartiesGroupModel(reference_counterparty_group_obj);
        await reference_counterparty_group.save();
    }

    if(await models.References.ServiceTypeModel.countDocuments() == 0){
        console.log('======== Create Reference Service Type ========');
        let reference_service_type = new models.References.ServiceTypeModel(reference_service_type_obj);
        await reference_service_type.save();
    }

    if(await models.References.UnitClassifierModel.countDocuments() == 0){
        console.log('======== Create Reference Unit Classifier ========');
        let reference_unit_classifier = new models.References.UnitClassifierModel(reference_unit_classifier_obj);
        await reference_unit_classifier.save();
    }

    if(await OrganizationModel.countDocuments() == 0){
        console.log('======== Create Organization ========');
        let organization = new OrganizationModel(organization_obj);
        await organization.save();
    }

    if((await models.References.CounterpartyModel.find({ name: DEFAULT_COUNTERPARTY_NAME })).length == 0){
        console.log('======== Create Counterparty ========');
        let reference_individual_counterparty = new models.References.CounterpartyModel(reference_individual_counterparty_obj);
        await reference_individual_counterparty.save();
    }

    if((await models.References.ServiceTypeModel.find({ name: DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE })).length == 0){
        console.log('======== Create Amageus Service Type ========');
        let reference_service_type = new models.References.ServiceTypeModel({ name: DEFAULT_TRAIN_AMADEUS_SERVICE_TYPE });
        await reference_service_type.save();
    }

    if((await models.References.ServiceTypeModel.find({ name: DEFAULT_TRAIN_ARGEST_SERVICE_TYPE })).length == 0){
        console.log('======== Create Argest Service Type ========');
        let reference_service_type = new models.References.ServiceTypeModel({ name: DEFAULT_TRAIN_ARGEST_SERVICE_TYPE });
        await reference_service_type.save();
    }

    console.log('#######################################################################################');
}
let user_obj = {
    first_name: 'Ігор',
    last_name: 'Дзуєнко'
};

let reference_airport_obj = {
    name: 'KSX',
    name_rus: 'Ясуру',
    name_eng: 'Yasuru',
    name_ukr: '',
    place_rus: 'Ясуру',
    place_eng: 'Yasuru',
    place_ukr: '',
    country_rus: 'Папуа- Новая Гвинея',
    country_eng: '',
    country_ukr: '',
    latitude : 10,
    longitude: 20
}

let reference_avia_company_obj = {
    name: 'Adria Airways',
    code: '165',
    iata: 'JP'
}

let reference_city_obj = {
    station_code: '',
    name_rus: '',
    name_eng: '',
    name_ukr: ''
}

let reference_service_type_obj = {
    name: 'Залізничний квиток',
    provider_id: null, //  Залізниця П-З   :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    additional_provider_id: null, // УЦОП-Відокремленний підрозділ    :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    nomenclature_catalog_id: null, // Залізничні квитки     :{ type: Schema.Types.ObjectId, ref: 'ReferenceNomenclatureGroup' },
    ticket_short_name: 'Зал. квиток',
    ticket_full_name: '',
    nomenclature_as_service_id: null, // Послуги агенства    :{ type: Schema.Types.ObjectId, ref: 'ReferenceNomenclature' },
    main_services: '',
    agency_services: '',
    other_services: '',
    forfeit: 0,
    mpe: 0
}

let reference_counterparty_obj = {
    name: 'Залізниця П-З',
    // Загальні
    general: {
        person: 'Юр. особа', // ['Юр. особа', 'Фіз. особа']
        is_resident: false,
        full_name: `Державне територіально-галузеве об'єднання "ПІВДЕННО-ЗАХІДНА ЗАЛІЗНИЦЯ"`,
        group_id: null, // Контрагенты  { type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
        main_counterparty: null, // Залізниця П-З { type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
        main_contract_id : null, // reference to Договори контрагентів
        bank_account_id : null // Банківські рахунки
    },
    // Інші
    other: {
        ipn: '045789416154',
        // Код ЕДРПОУ
        EDRPOUCode: '789465499',
        passport: '',
        mpe_certificate: '',
        agency_services: false
    },
    // Контакти
    contacts: null, //        :{ type: [{
    //     // Тип (перелік Адреса, Телефон, Адреса електронної пошти, Веб сторінка, Інше)
    //     contact_type     :{ type: String },
    //     // Вид (поки що вручну)
    //     type            :{ type: String },
    //     // Представлення
    //     representation  :{ type: String },
    // }] },
    // Фізичні особи (посилання на Фізичні особи) Потрібні поля: (Фізична особа, Коментар)
    individuals_id: null,
    // Послуги
    services: null, //     :{ type: [{
    //     // Послуга (посилання на Види сервісів)
    //     service_id         :{ type: String },
    //     // Агентська винагорода
    //     agent_awark        :{ type: Number },
    //     // Процент банку
    //     bank_percent       :{ type: Number }
    // }] },
    //
    tourist_service: [
        { name: 'Some service'}
    ],
    // Коментар
    comment: 'Коментар',
}

let reference_counterparty_group_obj = {
    name: 'Залізниця П-З'
}

let reference_unit_classifier_obj = {
    name: 'ГРН'
}

let organization_obj = {
    name: 'ВОРЛДСЕРВІС ГРУП'
}

let reference_individual_counterparty_obj = {
    name: 'ФІЗИЧНА ОСОБА'
}


init_db();