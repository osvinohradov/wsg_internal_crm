import moment from 'moment';
import mongoose from 'mongoose';

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
  // Set by system user
  // t.payment_date = date;
  t.tickets_count = 1;

  let client = await Ref.ReferenceCounterpartyModel.findOne({ name: DEFAULT_COUNTERPARTY_NAME });

  t.client_id = client ? client._id : null;  
  t.service_date = date; // возможно заменить (спросить у Игоря)

  t.is_void = false;
  t.is_returned = false;
  t.is_paid = false;
  t.group_invoice_id = null;

  let currency = await Ref.ReferenceUnitClassifierModel.findOne({ name: 'ГРН' });
  currency = currency._id || null;

  t.offer_currency_id = currency;
  t.total_currency_id = currency;
  t.provider_id = null;
  t.taxes_payment = null;
  t.curator_id = null;
  t.currency_exchange_id = null;
  t.service_type_id = null;
  t.checking_account_id = null;
  t.comment = '';
  t.responsible_agent_id = null;
  t.agent_id = null;
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

  let st_code = tfx.departureStationCode ? new RegExp(`.*2${tfx.departureStationCode}.*`, 'i') : '';
  
  let departure = await Ref.RefRailwayStationModel.findOne({ $or: [{ name_eng: tfx.departureStation }, { station_code : st_code } ]});
  if(departure){
    t.detail_info.departure_station_id = departure._id;
  }

  st_code = tfx.arrivalStationCode ? new RegExp(`.*2${tfx.arrivalStationCode}.*`, 'i') : '';
  let arrival = await Ref.RefRailwayStationModel.findOne({ $or: [{ name_eng: tfx.arrivalStation }, { station_code : st_code } ]});
  
  if(arrival){
    t.detail_info.arrival_station_id = arrival._id;
  }

  // Дата отправления
  t.detail_info.departure_dt = _get_date_time(tfx.departureDate);
  
  // Дата и время прибытия
  t.detail_info.arrival_dt = _get_date_time(tfx.arrivalDate);
  
  // Дата покупки у поставщика
  t.payment_provider_dt = _get_date_time(additional_params.timeStamp)
  // Фамилия
  let individual = {
    last_name_native: tfx.passenger.lastName,
    first_name_native: tfx.passenger.firstName
  }

  let individual_counterparty = await Ref.ReferenceIndividualCounterpartiesModel.findOne(individual);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@ Individual counterparty @@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(individual_counterparty);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');


  if(!individual_counterparty){
    individual_counterparty = new Ref.ReferenceIndividualCounterpartiesModel(individual);
    individual_counterparty = await individual_counterparty.save();
    console.log('========================== Individual counterparty ==========================');
    console.log(individual_counterparty);
    console.log('=============================================================================');
    t.detail_info.surname_id = individual_counterparty._id;
  }
  t.detail_info.surname_id = individual_counterparty._id;

  
  // номер билета
  t.detail_info.ticket_number = tfx.confirmationNumber;
  
  // Стоимость поставщика
  t.detail_info.supplier_cost = {};
  t.detail_info.supplier_cost.sum = parse_number(tfx.documentsPrice);
  t.detail_info.supplier_cost.mpe = 0;
  t.detail_info.supplier_cost.currency_id = currency;

  // // Секція "Комісія постачальника"
  t.detail_info.supplier_commision = {};
  t.detail_info.supplier_commision.sum = 0;
  t.detail_info.supplier_commision.mpe = 0;
  t.detail_info.supplier_commision.percent = 0;
  t.detail_info.supplier_commision.currency_id = currency;

  // Секція "Штраф"
  t.detail_info.forfeit = {};
  t.detail_info.forfeit.sum = 0;
  t.detail_info.forfeit.mpe = 0;
  t.detail_info.forfeit.currency_id = currency;

  // Секція "Послуги агенції"
  t.detail_info.agency_services = {};
  t.detail_info.agency_services.sum = 0;
  t.detail_info.agency_services.mpe = 0;
  t.detail_info.agency_services.percent = 0;
  t.detail_info.agency_services.bank_percent = 0;
  t.detail_info.agency_services.currency_id = currency;

  // Секція "Інші послуги"
  t.detail_info.other_services = {};
  t.detail_info.other_services.sum = 0;
  t.detail_info.other_services.mpe = 0;
  t.detail_info.other_services.currency_id = currency;

  // Other service sum
  let vfrc = parse_number(tfx.vatFromRemitCommission);
  let vfm = parse_number(tfx.vatFromMarkup);
  let oss =
    parse_number(tfx.remitCommission) + vfrc + parse_number(tfx.markup) + vfm;
  let osm = vfrc + vfm;

  t.detail_info.other_services.sum = oss;
  // Other service mpe  
  t.detail_info.other_services.mpe = osm;


  // TODO: Add forfeit
  // Секція "Всього"
  t.detail_info.total_amount = {};
  t.detail_info.total_amount.sum = t.detail_info.supplier_cost.sum +  t.detail_info.supplier_commision.sum + 
      t.detail_info.agency_services.sum + t.detail_info.other_services.sum;
  
  t.detail_info.total_amount.mpe = t.detail_info.supplier_cost.mpe + t.detail_info.supplier_commision.mpe +
      t.detail_info.agency_services.mpe + t.detail_info.other_services.mpe;

  t.detail_info.total_amount.currency_id = currency;

  t.detail_info.additional_info = '';
  t.detail_info.total_amount_ucop = 0;
  t.detail_info.ucop_mpe = 0;

  return t;
}

function _get_date_time(dt_string){
  let value = moment(dt_string, ['YYYY-MM-DDTHH:mm:ss', 'DD.MM.YYYY HH:mm:ss']);
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
