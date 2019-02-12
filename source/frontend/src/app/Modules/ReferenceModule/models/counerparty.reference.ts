import { BaseModel } from './base_model';

export class RefCounterpartyNameModel {
    _id: string = null;
    name: string = '';
}

export class CounterpartyReference extends BaseModel{
    _id: string = undefined;
    // 
    Number: string = "";

    // Найменування
    Name: string = null;
    // Загальні
    General: General = null;
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
    Other: Other = null;
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
    Contacts: Contacts = null;
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
    constructor(){
        super();
        this.General = new General();
        this.Other = new Other();
        this.Contacts = new Contacts();
    }
}

class General{
    Person: string = "";
    IsResident: boolean = false;
    FullName: string = "";
    GroupId: CounterpartyGroup = null;
    MainCounterparty: CounterpartyGroup = null;
    MainContact: string = "";
    BankAccount: string = "";

    constructor(){
        this.GroupId = new CounterpartyGroup();
        this.MainCounterparty = new CounterpartyGroup();
    }
}

class CounterpartyGroup{
    _id: string = "";
    Name: string = "";
}

class Other{
    IPN: string = "";
    EDRPOUCode: string = "";
    Passport: string = "";
    MPECertificate: string = "";
    AgencyServices: boolean = false;
}

class Contacts{
    ContactType: string = "";
    Type: string = "";
    Representation: string = "";
}