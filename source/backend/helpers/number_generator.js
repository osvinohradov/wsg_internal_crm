
export function generate_random_number(){
    let current_date = Date.now().toString();
    let current_year = (new Date()).getFullYear().toString().substr(2);
    let number = `${current_year}000${current_date}`;
    console.log(number);
    return number;    
}