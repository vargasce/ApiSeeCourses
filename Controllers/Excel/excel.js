'use strict'

const excel = require('../../Custom/excel/exportToExcel');
const excelService = require('../../Services/Excel/excel');

const controller = {
  
  exportToExport : async ( req, res ) =>{
    
    let tabla = req.body.tabla;
    let header = req.body.header;
    
    try{
      let data = await excelService.getDataObj( tabla );
      let url  = await excel.CreateExcel( data, header, tabla );
      return res.status(200).send({ 'error' : '', 'url' : url });
    }catch( error ){
      return res.status(500).send({ 'error' : error });
    }

  },

 /** RETORNA ARCHIVO
  * @Observations : Retorna archivo xlsx
  * @param {*} req 
  * @param {*} res 
  */
  getFile: function(req , res){        
    var file = req.params.image;
    var path_file = './uploads/'+file;
     fs.exists(path_file,(exists)=> {
       if(exists){
          return res.sendFile(path.resolve(path_file));
       }else{
           return res.status(200).send({message : "File not found"});
       }
     });
  }

}

module.exports = controller;
