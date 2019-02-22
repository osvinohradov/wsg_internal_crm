// Built-in library
import path from 'path';

// Personal library
import { PDFServiceBase } from '../../lib';


class PDFService extends PDFServiceBase {
    constructor(){
        super();
    }
    // Method receive invoice object and return pdf document.
    async get_act_pdf_form(form_name, invoice){
        let sep = path.sep;
        let path_to_form = `${__dirname}${sep}templates${sep}${form_name}`;
        
        let form = await this._get_html_form(path_to_form);
        let compiled_form = await this._compile_form(form, invoice);
        console.log('Compiled form data: ', compiled_form);
        let pdf_file = await this._generate_pdf_document(compiled_form);
        return pdf_file;
    }
}

export default new PDFService();