import moment from 'moment';

import { TrainInvoiceModel } from "../../../models";
import { PAYMENT_FORMS } from '../../../constants/common';
import { generate_random_number } from '../../../helpers';

export function map_ticket_from_argest(ticket_from_xml, additional_params) {
  let tfx = ticket_from_xml;
  let t = new TrainInvoiceModel();
  // Add payment provider date field
  t.number = generate_random_number();
  t.payment_form = PAYMENT_FORMS[tfx.paymentGateway] // get_payment_form(tfx.paymentGateway);
  
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
  t.detail_info.surname = `${tfx.passenger.lastName} ${tfx.passenger.firstName}`;
  // номер билета
  t.detail_info.ticket_number = tfx.confirmationNumber;
  
  // Стоимость поставщика
  t.detail_info.supplier_cost = {};
  t.detail_info.supplier_cost.sum = parse_number(tfx.documentsPrice);
  // Other service sum
  let vfrc = parse_number(tfx.vatFromRemitCommission);
  let vfm = parse_number(tfx.vatFromMarkup);
  let oss =
    parse_number(tfx.remitCommission) + vfrc + parse_number(tfx.markup) + vfm;
  t.detail_info.other_services = {}
  t.detail_info.other_services.sum = oss;
  // Other service mpe
  let osm = vfrc + vfm;
  t.detail_info.other_services.mpe = osm;

  return t;
}

function _get_date_time(dt_string){
  let value = moment(dt_string, "DD.MM.YYYY HH:mm:ss");
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
