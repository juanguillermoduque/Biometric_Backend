const XLSX = require('xlsx')

class ImportExcel{

    public readExcel(ruta:string):void{
        const workBook = XLSX.readFile(ruta);
        const workBookSheets = workBook.Shee
    } 
}
