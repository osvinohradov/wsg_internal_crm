import { Train } from "../../models";

export function map_ticket_from_argest(ticket_from_xml) {
  let tfx = ticket_from_xml;
  let t = new Train();
  // Add payment provider date field
  t.payment_form = get_payment_form(tfx.paymentGateway);
  t.detail_info.ticket_number = tfx.confirmationNumber;
  t.detail_info.train_number = tfx.trainNumber;
  t.detail_info.carriage_number = tfx.wagonNumber;
  t.detail_info.place = tfx.seats;
  t.detail_info.service_type = tfx.wagonType;
  t.detail_info.arrival_dt = parse_date_time(tfx.wagonType);
  t.detail_info.departure_dt = parse_date_time(tfx.departureDate);
  t.detail_info.departure_station = tfx.departureStation;
  t.detail_info.arrival_dt = parse_date_time(tfx.arrivalDate);
  // Дата покупки у поставщика
  // ticket.detail_info.payment_provider_dt =
  t.detail_info.departure_station = tfx.arrivalDate.departureStation;
  t.detail_info.arrival_station = tfx.arrivalDate.arrivalStation;
  t.detail_info.surname = tfx.arrivalDate.arrivalStation;
  t.detail_info.ticket_number = tfx.arrivalDate.arrivalStation;

  t.detail_info.supplier_cost.sum = parse_number(tfx.documentsPrice);
  // Other service sum
  let vfrc = parse_number(tfx.vatFromRemitCommission);
  let vfm = parse_number(tfx.vatFromMarkup);
  let oss =
    parse_number(tfx.remitCommission) + vfrc + parse_number(tfx.markup) + vfm;
  t.detail_info.other_services.sum = oss;
  // Other service mpe
  let osm = vfrc + vfm;
  t.detail_info.other_services.mpe = osm;

  return t;
}

function get_payment_form(value) {
  if (!value) {
    return "";
  }
  let payment_form = "";
  switch (value) {
    case "non-cash": {
      payment_form = "Безготівковий розрахунок";
    }
  }
  return payment_form;
}

function parse_date_time(date_string) {
  if (!date_string) return null;
  let date = new Date();
  // date_string[0] = "30.01.2018"; date_string[1] = "18:05:00"
  try {
    date_string = date_string.split(" ");
    let date_arr = date_string[0].split(".");
    date_arr.map(x => parseInt(x));
    date.setDate(date_arr[0]);
    date.setMonth(date_arr[1] + 1);
    date.setFullYear(date_arr[2]);

    let time_arr = date_string[1].split(":");
    date.setHours(time_arr[0]);
    date.setMinutes(time_arr[1]);
    date.setSeconds(time_arr[2]);
  } catch (err) {
    console.log(`При перетворенні рядка до об'єкта дати виникла помилка!`);
    console.log(err);
    date = null;
  }
  return date;
}

function parse_number(number, flag = 0) {
  parse = flag ? parseInt : parseFloat;

  if (!number) return 0;
  try {
    let n = parse(number);
  } catch (err) {
    console.log(`При перетворенні рядка до числа виникла помилка!`);
    console.log(err);
    n = 0;
  }
  return n;
}
