var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./templates/act_1.html', 'utf8');
var options = { format: 'Letter' };
 
pdf.create(html, options).toFile('./test_doc.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});