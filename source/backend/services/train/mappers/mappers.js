import moment from 'moment';

import { TrainInvoiceModel, Ref } from "../../../models";
import { PAYMENT_FORMS } from '../../../constants/common';
import { generate_random_number } from '../../../helpers';
import { DEFAULT_COUNTERPARTY_NAME } from '../../../constants/common';

export async function map_ticket_from_argest(ticket_from_xml, additional_params) {
  let tfx = ticket_from_xml;
  let date = _get_date_time(additional_params.time_stamp);
  
  console.log('Date: ', date);
  
  let t = new TrainInvoiceModel();
  // Add payment provider date field
  t.number = generate_random_number();
  t.date = date;
  t.payment_form = PAYMENT_FORMS[tfx.paymentGateway]; // get_payment_form(tfx.paymentGateway);
  t.payment_date = date;
  t.tickets_count = 1;

  t.total_amount = 0;

  let client = await Ref.ReferenceCounterpartyModel.findOne({ name: DEFAULT_COUNTERPARTY_NAME });

  t.client_id = client ? client._id : null;  
  t.service_date = date; // возможно заменить (спросить у Игоря)

  t.is_void = false;
  t.is_returned = false;
  t.is_paid = false;
  t.group_invoice_id = null;
  t.offer_currency_id = null;
  t.total_currency_id = null;
  t.provider_id = null;
  t.taxes_payment = null;
  t.curator_id = null;
  t.currency_exchange_id = null;
  t.service_type_id = null;
  t.checking_account = null;
  t.comment = '';
  t.responsible_agent = null;
  t.agent = null;
  t.is_processed = false;
  t.returned_document = '';

  t.detail_info = {};
  // номер поезда
  t.detail_info.train_number = tfx.trainNumber;
  // номер вагона
  t.detail_info.carriage_number = tfx.wagonNumber;
  // номер места
  t.detail_info.place = tfx.seats;
  // Тип сервиса 
  t.detail_info.service_type = tfx.wagonType;
  // Дата отправления
  t.detail_info.departure_dt = _get_date_time(tfx.departureDate);
  t.detail_info.departure_station = tfx.departureStation;
  // Дата и время прибытия
  t.detail_info.arrival_dt = _get_date_time(tfx.arrivalDate);
  t.detail_info.arrival_station = tfx.arrivalStation;
  // Дата покупки у поставщика
  t.payment_provider_dt = _get_date_time(additional_params.timeStamp)
  // Фамилия
  let individual = {
    last_name_native: tfx.passenger.lastName,
    first_name_native: tfx.passenger.firstName
  }
  let individual_counterparty = new Ref.ReferenceIndividualCounterpartiesModel(individual);
  individual_counterparty = await individual_counterparty.save();
  t.detail_info.surname = individual_counterparty._id;
  // номер билета
  t.detail_info.ticket_number = tfx.confirmationNumber;
  
  // Стоимость поставщика
  t.detail_info.supplier_cost = {};

  t.detail_info.supplier_cost.sum = parse_number(tfx.documentsPrice);
  t.detail_info.supplier_cost.mpe = 0;
  t.detail_info.supplier_cost.currency_id = null;

  // // Секція "Комісія постачальника"
  t.detail_info.supplier_commision = {};
  t.detail_info.supplier_commision.sum = 0;
  t.detail_info.supplier_commision.mpe = 0;
  t.detail_info.supplier_commision.percent = 0;
  t.detail_info.supplier_commision.currency_id = null;

  // Секція "Штраф"
  t.detail_info.forfeit = {};
  t.detail_info.forfeit.sum = 0;
  t.detail_info.forfeit.mpe = 0;
  t.detail_info.forfeit.currency_id = null;

  // Секція "Послуги агенції"
  t.detail_info.agency_services = {};
  t.detail_info.agency_services.sum = 0;
  t.detail_info.agency_services.mpe = 0;
  t.detail_info.agency_services.percent = 0;
  t.detail_info.agency_services.bank_percent = 0;
  t.detail_info.agency_services.currency_id = null;

  // Секція "Інші послуги"
  t.detail_info.other_services = {};
  t.detail_info.other_services.sum = 0;
  t.detail_info.other_services.mpe = 0;
  t.detail_info.other_services.currency_id = null;

  // Секція "Всього"
  t.detail_info.total_amount = {};
  t.detail_info.total_amount.sum = 0;
  t.detail_info.total_amount.mpe = 0;
  t.detail_info.total_amount.currency_id = null;


  t.detail_info.additional_info = '';
  t.detail_info.total_amount_ucop = 0;
  t.detail_info.ucop_mpe = 0;

  // Other service sum
  let vfrc = parse_number(tfx.vatFromRemitCommission);
  let vfm = parse_number(tfx.vatFromMarkup);
  let oss =
    parse_number(tfx.remitCommission) + vfrc + parse_number(tfx.markup) + vfm;
  let osm = vfrc + vfm;

  t.detail_info.other_services.sum = oss;
  // Other service mpe
  
  t.detail_info.other_services.mpe = osm;

  return t;
}

function _get_date_time(dt_string){
  let value = moment(dt_string, ["YYYY-MM-DDTHH:mm:ss"]);
  return value.toDate();
}

function parse_number(number, flag = 0) {
  let parse = flag ? parseInt : parseFloat;
  let n = 0;

  try {
    n = parse(number);
    console.log(n)
  } catch (err) {
    console.log(`При перетворенні рядка до числа виникла помилка!`);
    console.log(err);
  }
  return n;
}
