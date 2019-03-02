// Built-in library
import fs from 'fs';
// Installed library
import ejs from 'ejs';
import pdf from 'html-pdf';
// Personal library


export class PDFServiceBase{
    /**
     * Description:
     * Method receive path to html document form include name 
     * 
     * @param {String} path_to_file 
     */
    async _get_html_form(path_to_file){
        let read_opt = {
            encoding: 'utf8'
        }
        // Read file and return it as string
        let file_content = await this._read_file_async(path_to_file, read_opt);
        if(!file_content){
            // Throw exception
            console.log(`File ${path_to_file} was not read.`);
            return null;
        }
        return file_content;
    }

    /**
     * Description:
     * Method receive html forms as string and data as object and return compiled form
     * 
     * @param {String} form 
     * @param {Object} data 
     */
    async _compile_form(form, data){
        let compiled_fn = ejs.compile(form, data)
        let compiled_form = compiled_fn(data)
        return compiled_form;
    }

    /**
     * Description:
     * Method receive string data and generate pdf document
     * 
     * @param {String} form 
     */
    async _generate_pdf_document(form, options){
        let opt = {
            "width": "210mm",
            "height": "297mm",
            "type": "pdf",
            "quality": "75",
            "border": 0,
            "header": {
                "height": "10mm",
            },
            "footer": {
                "height": "10mm",
            },
        }
        let doc_buf = await this._create_pdf_async(form, opt);
        
        if(!doc_buf){
            // throw error
            console.log(`PDF was not created.`);
            return null;
        }

        return doc_buf;
    }

    _create_pdf_async(form, options){
        return new Promise((resolve, reject) => {
            pdf.create(form, options).toBuffer((err, res) => {
                if(err){
                    // throw err
                }

                resolve(res);
            });
        });
    }

    _read_file_async(path_to_file, read_opt){
        return new Promise((resolve, reject) => {
            console.log(`Print file ${path_to_file}`);
            
            fs.readFile(path_to_file, read_opt, (err, data) => {
                if(err){
                    console.log(`Error ocurred`, err);
                    return;
                    // throw err
                }
                data = data.toString();                
                resolve(data);
            });
        });
    }
}