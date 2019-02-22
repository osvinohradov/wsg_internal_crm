const xml_parser = require('xml-parser');
const fs = require('fs');
const util = require('util');

fs.readFile('./several_pass.xml', { encoding: 'utf8' }, (err, data) => {
    if(err){
        console.log(err);
        return;
    }

    let result = data.toString();
    let xml = xml_parser(result);
    console.log(util.inspect(xml, true, Infinity, true));

    let invoice = {};
    let o = xml.root.children[0];

    invoice.creation_date = o.attributes.Timestamp;
    parser(o.children);
});

function parser(arr){
    let inv = {};

    for(let i = 0; i < SVGPathSegCurvetoQuadraticRel.length; i++){
        const elem = arr[i];
    }

}

function parse_ticket_from_argest(xml_ticket){
    let section = {};

    for (let i = 0; i < xml_ticket.length; i++) {
        const element = xml_ticket[i];
        // Если элемент содержит дочерние элементы, нужно сделать перебор дочерних элементов
        if(element.children.length != 0){
            section[element.name] = parse_ticket_from_argest(element.children);
            continue;
        }
        section[element.name] = element.content;        
    }
    return section;
}
