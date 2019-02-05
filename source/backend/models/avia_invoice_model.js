import mongoose from 'mongoose';

import { BaseModel } from '../lib';

const AviaInvoiceSchema = new BaseModel({}, { minimize: false, versionKey: false, collection: 'avia_invoice' });
  
const AviaInvoiceModel = mongoose.model("AviaInvoice", AviaInvoiceSchema);
  
export default AviaInvoiceModel;