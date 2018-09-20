import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AviaTicketXMLSchema = new Schema({
    RecordLocator :{ type: String },
    CreationDate :{ type: String },
    OfficeidBooking :{ type: String },
    AgentSignBooking :{ type: String },
    ChangeDate :{ type: [String] },
    LastTransactionDate :{ type: [String] },
    NameElement :{ type: [Object] }
});

const AviaTicketXML = mongoose.model('AviaTicketXML', AviaTicketXMLSchema)

export { AviaTicketXML }