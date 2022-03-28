'use stric'

const excel = require('excel4node');

const Excel = {
  /** CREAR EXCEL
   * @Observation : Exporta excel y retorna acceso para la descarga.
   * @param { string } data => Objeto a exportar.
   * @param { string } header => Cabecera para agregar al excel Ej: (name1,name2,name3).
   * @param { string } tabla => nombre de la tabla consultada para armar nombre de file.
   * @returns { string } => Retorna URL de la direccion para descargar el excel.
   */
  CreateExcel : ( data, header = null, tabla = null ) =>{
    return new Promise( ( resolve, reject ) =>{

      let titleFile = createNameFile( tabla );
      let wb = new excel.Workbook();
      let ws = wb.addWorksheet('Sheet1');
      var fila = 0;

      if( header != null ){
        fila++;
        let head = getHeader(header);
        let lenColumn = head.length;
        let styleHead = wb.createStyle({
                    font: {
                      color: '#4b7395',
                      size: 13,
                      name: 'Calibri',
                      bold: true
                    },
              numberFormat: '$#,##0.00; ($#,##0.00); -',
        });

        for( let i = 1; i <= lenColumn; i ++ ){
          ws.cell( fila, i ).string( head[i -1] ).style(styleHead);
        }
      }

      data.forEach( ( value, index, arr ) =>{
        fila++;
        let column = 1;
        for( const [ key, valor ] of Object.entries(value) ){
          ws.cell( fila, column ).string(valor);
          column++;
        }
      });

      wb.write(`../../File_up/${titleFile}.xlsx`, ( err, stats )=>{
        if( err ){
          reject(`Error en carga : ${err}`);
        }else{
          resolve(`${titleFile}`);
        }
      });

    });

  }

};

module.exports = Excel;

const getHeader = ( header )=>{
  let headerSend = header.split(',');
  return headerSend;
}


const createNameFile = ( titulo ) =>{

  let fecha = new Date();
  let dia = fecha.getDate();
  let mes = fecha.getMonth()+1;
  let anio = fecha.getFullYear();
  let nameFile = `${titulo}-${dia}-${mes}-${anio}`;

  return nameFile;
}
