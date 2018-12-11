
import xml_parser from 'xml-parser';

export function parse_ticket(xml_ticket){
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

// let train_file_path = path.join(__dirname, "train_xml_test.xml");
let train_file_path = path.join(__dirname, "my_ticket.xml");

fs.readFile(train_file_path, (err, data) => {
    if(err){
        console.log(`Залізничний білет не прочитано: ${train_file_path}`);
        console.error(err);
        return;
    }
    data = data.toString();
    //let ticket = parse_train_ticket(data);
    let json_ticket = parse_ticket( xml_parser(data).root.children);

    console.dir(json_ticket, {
        colors: true,
        depth: Infinity
    });
   
});