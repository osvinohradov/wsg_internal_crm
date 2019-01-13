import mongoose from 'mongoose';

import { BaseModel } from '../lib';

const GroupInvoiceSchema = new BaseModel();
  
const GroupInvoiceModel = mongoose.model("GroupInvoice", GroupInvoiceSchema);
  
export default GroupInvoiceModel;