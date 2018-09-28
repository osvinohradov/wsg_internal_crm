import { BaseModel } from './base_model';

export class CuratorReference extends BaseModel{
    _id: string = null;
    Name: string = null;
    // Клієнт (посилання на контагентів)
    ClientId: any = null;       // { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' }
}


