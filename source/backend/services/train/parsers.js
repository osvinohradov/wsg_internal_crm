import fs  from "fs";
import path from 'path';
import xml_parser from 'xml-parser';

export function parse_train_ticket(xml_ticket){
    let json_ticket = xml_parser(xml_ticket).root.children;
    let ticket = {};

    for (let index = 0; index < json_ticket.length; index++) {
        let element = json_ticket[index];
        if(element.name == "travel"){
            console.log(`Parse travel section...`);
            ticket[element.name] = parse_travel_section(element.children);
            continue;
        }
        else if(element.name == "sold_seats"){
            console.log(`Parse sold_seats section...`);
            ticket[element.name] = parse_sold_seats_section(element.children);
            continue;
        }
        else if(element.name == "price"){
            console.log(`Parse price section...`);
            ticket[element.name] = parse_sold_seats_price_section(element.children);
            continue;
        }
        else if(element.name == "counterparts"){
            console.log(`Parse counterparts section...`);
            ticket[element.name] = parse_counterparts_section(element.children);
            continue;
        }
        ticket[element.name] = element.content;
    }
    console.dir(ticket, {
        colors: true,
        depth: Infinity
    });
    return ticket;
}

function parse_travel_section(data){
    if(!data){
        console.log(`Travel section must be not null`)
        return;
    }
    let travel = {};

    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        
        if(element.name == "src"){
            console.log(`Parse src section...`);
            travel[element.name] = parse_section(element.children);
            continue;
        }
        else if(element.name == "dst"){
            console.log(`Parse dst section...`);
            travel[element.name] = parse_section(element.children);
            continue;
        }
        else if(element.name == "trip"){
            console.log(`Parse trip section...`);
            travel[element.name] = parse_trip_section(element.children);
            continue;
        }
        travel[element.name] = element.content;
    }
    return travel;
}

/**
 * 
 * @param {*} data 
 */
function parse_section(data){
    if(!data){
        console.log(`Travel section must be not null`)
        return;
    }
    let result = {};
    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        result[element.name] = element.content;
    }

    return result;
}

/**
 * 
 * @param {*} data 
 */
function parse_trip_section(data){
    if(!data){
        console.log(`Trip section must be not null`)
        return;
    }
    let trip = {};

    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        if(element.name == "src"){
            console.log(`Parse trip src section...`);
            trip[element.name] = parse_section(element.children); // function
            continue;
        }
        else if(element.name == "dst"){
            console.log(`Parse trip dst section...`);
            trip[element.name] = parse_section(element.children); // function
            continue;
        }
        trip[element.name] = element.content;
    }
    return trip;
}

/**
 * 
 * @param {*} data 
 */
function parse_sold_seats_section(data){
    if(!data){
        console.log(`Sold_seats section must be not null`)
        return;
    }
    let sold_seats = {};

    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        if(element.name == "passenger"){
            console.log(`Parse sold_seats src section...`);
            sold_seats[element.name] = parse_section(element.children); // function
            continue;
        }
        else if(element.name == "price"){
            console.log(`Parse sold_seats dst section...`);
            sold_seats[element.name] = parse_sold_seats_price_section(element.children); // function
            continue;
        }
        sold_seats[element.name] = element.content;
    }
    return sold_seats;
}

/**
 * 
 * @param {*} data 
 */
function parse_sold_seats_price_section(data){
    if(!data){
        console.log(`Sold_seats section must be not null`)
        return;
    }

    let price = {};
    let price_articles = [];

    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        if(element.name == "articles"){
            let tmp_article = parse_section(element.children);
            price_articles.push(tmp_article);
            price[element.name] = price_articles;
            continue;
        }
        price[element.name] = element.content;
    }
    
    return price;
}

/**
 * 
 * @param {*} data 
 */
function parse_counterparts_section(data){
    if(!data){
        console.log(`Counterparts section must be not null`)
        return;
    }

    let counterparts = {};

    for (let index = 0; index < data.length; index++) {
        let element = data[index];
        if(element.name == "transporter"){
            counterparts[element.name] = parse_section(element.children);
            continue;
        }
        else if(element.name == "insurer"){
            counterparts[element.name] = parse_section(element.children);
            continue;
        }
        counterparts[element.name] = element.content;
    }
    
    return counterparts;
}

let train_file_path = path.join(__dirname, "train_xml_test.xml");

console.log("Train ticket parser");


fs.readFile(train_file_path, (err, data) => {
    if(err){
        console.log(`Залізничний білет не прочитано: ${train_file_path}`);
        console.error(err);
        return;
    }
    data = data.toString();
    let ticket = parse_train_ticket(data);
   
});