class BaseModel{
    static serialize_from_json(json_obj: any, type: any){
        let tmp_airport = type

        for (let key in json_obj) {
            if (tmp_airport.hasOwnProperty(key)) {
                tmp_airport[key] = json_obj[key];
            }
        }
        
        return tmp_airport;
    };

    static clone(item) {
        if (!item) { return item; } // null, undefined values check
    
        let types = [ Number, String, Boolean ];
        let result;
    
        // normalizing primitives if someone did new String('aaa'), or new Number('444');
        types.forEach(function(type) {
            if (item instanceof type) {
                result = type(item);
            }
        });
    
        if (typeof result == "undefined") {
            if (Object.prototype.toString.call( item ) === "[object Array]") {
                result = [];
                item.forEach(function(child, index, array) { 
                    result[index] = BaseModel.clone(child);
                });
            } 
            else if (typeof item == "object") {
                // testing that this is DOM
                if (item.nodeType && typeof item.cloneNode == "function") {
                    result = item.cloneNode( true );    
                } 
                else if (!item.prototype) { // check that this is a literal
                    if (item instanceof Date) {
                        result = new Date(item);
                    } 
                    else {
                        // it is an object literal
                        result = {};
                        for (var i in item) {
                            result[i] = BaseModel.clone( item[i] );
                        }
                    }
                } 
                else {
                    // depending what you would like here,
                    // just keep the reference, or create new object
                    if (false || item.constructor) {
                        // would not advice to do that, reason? Read below
                        result = new item.constructor();
                    }
                    else {
                        result = item;
                    }
                }
            }
            else {
                result = item;
            }
        }
        return result;
        
    }
    
}

export class AirportReference extends BaseModel{
    _id: string = null;
    // Код
    Code: string = null;
    // Найменування
    Name: string = null;
    // Найменування на російській
    NameRus: string = null;
    // Найменування на англійській
    NameEng: string = null;
    // Найменування на українській
    NameUkr: string = null;
    // Місце на російській
    PlaceRus: string = null;
    // Місце на англійській
    PlaceEng: string = null;
    // Місце на українській
    PlaceUkr: string = null;
    // Країна на російській
    CountryRus: string = null;
    // Країна на англійській
    CountryEng: string = null;
    // Країна на українській
    CountryUkr: string = null;
    //
    latitude: number = 0;
    //
    longitude: number = 0;   
}


