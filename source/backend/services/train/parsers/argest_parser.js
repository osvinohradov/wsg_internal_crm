import xml_parser from 'xml-parser';

export function parse_ticket_from_argest(xml_ticket){
    let section = {};

    for (let i = 0; i < xml_ticket.length; i++) {
        const element = xml_ticket[i];
        // Если элемент содержит дочерние элементы, нужно сделать перебор дочерних элементов
        if(element.children.length != 0){
            section[element.name] = parse_ticket(element.children);
            continue;
        }
        section[element.name] = element.content;        
    }
    return section;
}