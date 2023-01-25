const PDFDocument = require('pdfkit');

function billPdf(dataCallback, endCallback, data){
    const doc = new PDFDocument();

    doc.on('data',dataCallback);
    doc.on('end',endCallback);

    doc.fontSize(25).text(`Restaurant Name : ${data.rname}`);
    doc.end();
}

module.exports = {billPdf}