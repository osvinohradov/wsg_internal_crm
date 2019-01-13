import mongoose from 'mongoose';

import { BaseModel } from '../lib';

const AviaInvoiceSchema = new BaseModel();
  
const AviaInvoiceModel = mongoose.model("AviaInvoice", AviaInvoiceSchema);
  
export default AviaInvoiceModel;