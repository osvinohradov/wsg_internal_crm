import { BaseModel } from './base_model';

export class CounterpartyNameModel {
    _id: string = null;
    name: string = '';
}         

export class CounterpartyModel extends BaseModel{
    _id: string = null;;
    name: string = '';
    general: any = null;
    other: any = null;
    contacts: Array<any> = null;
    individuals_id: any = null;
    services: Array<any> = null;
    tourist_service: Array<any> = null
    comment: string ='';

    checking_accounts_ids: any = null;
    counterparty_contracts_ids: any = null;

    updated_at: Date = null;
    created_at: Date = null;
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

