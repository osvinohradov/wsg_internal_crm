import { BaseModel } from './base_model';

export class CuratorReference extends BaseModel{
    _id: string = null;
    //
    Number: string = "";


    Name: string = null;
    // Клієнт (посилання на контагентів)
    ClientId: string = null;       // { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' }
}


