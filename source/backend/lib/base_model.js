import { Schema } from 'mongoose';

export class BaseModel extends Schema{
    constructor(definition, options){
        super(definition, options);
    }
}