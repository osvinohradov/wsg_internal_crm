import { BaseModel } from './base_model';

export class NomenclatureReference extends BaseModel{
    _id: string = undefined;
    //
    Code: number = 0;
    // Група Номенлатури
    NomenclatureGroupId: any = null;
    // Коротка назва
    NameShort: string = null;
    // Повна назва
    NameFull: string = null;
    // Артикул
    Article: string = null;
    // Послуга
    Service: boolean = false;
    // Транспортна послуга
    TransportService: boolean = null;
    // Банк суворої звітності
    ReportingBank: boolean = null;
    // Враховується по номінальній вартості
    NominalCost: boolean = null;
    // Базова одиниця виміру
    BaseUnitId: any = null; // ref: 'ReferenceUnitClassifier'
    // Ставка ПДВ (пеерчислення: 0%, 20%, 7%, Без ПДВ, Не ПДВ)
    RateOfMPE: string = null;
    // Льгота з ПДВ
    MPEPrivilege: string = null;
    // Код ПН (по умовчю)
    PNCode: string = null;
    // Вимірюєтья тільки в сумовому виразі
    LongExpression: boolean = null;
    // Текст для друка у колонці кількість податкової Накладної
    InvoiceCount: string = null;
    // Стаття витрат (посилання на статтю)
    EmbezzlementId: any = null;   // ref: 'ReferenceEmbezzlement'
}