import { BaseModel } from './base_model';

export class CounterpartyReference extends BaseModel{
    _id: string = undefined;
    // Найменування
    Name: string = null;
    // Загальні
    General: any = null;
    /*
    {
        Person :{ type: String },
        IsResident :{ type: Boolean },
        FullName :{ type: String },
        GroupId :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
        MainCounterparty :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
        MainContact :{ type: String },
        BankAccount :{ type: String }
    }
    */
    // Інші
    Other: any = null;
    /*
    {
        IPN         :{ type: String },
        EDRPOUCode      :{ type: String },
        Passport        :{ type: String },
        MPECertificate         :{ type: String },
        AgencyServices  :{ type: Boolean }
    }
    */
    // Контакти
    Contacts: any = null;
    /*
    {
        ContactType     :{ type: String },
        Type            :{ type: String },
        Representation  :{ type: String },
    }
    */
    // Фізичні особи (посилання на Фізичні особи) Потрібні поля: (Фізична особа, Коментар)
    IndividualsId: any =null;
    // Послуги
    Services: any = null;
    /*
    {
        ServiceId         :{ type: String },
        AgentAward        :{ type: Number },
        BankPercent       :{ type: Number }
    }
    */
    // 
    TouristServices: any = null;
    /*
    {
        Name    :{ type: String }
    }
    */
    // Коментар
    Comment: string = null;
}