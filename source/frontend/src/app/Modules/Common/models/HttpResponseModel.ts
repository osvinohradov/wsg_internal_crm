import { BaseModel } from './BaseInvoiceModel';

export class HttpResponse extends BaseModel{
    success: boolean = false;
    fail: boolean = false;
    error: any = null;
    data: any = null;
    status: number = 0;
}


