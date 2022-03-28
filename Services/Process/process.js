'use strict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const dt = require('../../Custom/dates/dates');
const CronJob = require('cron').CronJob;
const hora = process.env.timeHora;
const min = process.env.timeMinutos;

class Process {

    constructor(){ }

    start(){
        new CronJob(`${min} ${hora} * * *`, ()=>{ this.process() } , this.processEnd , true);        
    }

    process(){
        this.verifyDateFinalice();
    }

    /** ACTUALIZA FECHA FINALIZADAS.
     * @Observations => Consulta a la fecha todos los cursos, en caso de fechas pasadas,
     * los actualiza, actualiza el campo finalizado de curso a true, esto permite que los cursos
     * que estan finalizados no sean visibles en las busquedas.
     */
    async verifyDateFinalice(){

        let fecha = dt.getDateCurrentStringCustom();
        let sql = this.getSqlStringFechas( fecha );

        try{

            await QueryAwait('BEGIN');
            let result = await QueryAwait( sql );
            let data = this.getDatesUpdate( result.rows );

            await Promise.all( data.map( async ( value ) =>{

                let sqlUpdate = this.getSqlStringUpdateStatus( value.id );
                console.log( `Curso con id : ${ value.id } => Finalizado.` );
                await QueryAwait( sqlUpdate );

            })).catch( error => { throw error; });

            let ok = await QueryAwait('COMMIT');
            if( ok ) console.log('[+] Cursos Actualizados.');

        }catch( error ){
            console.log('[-] Cursos no actualizados con exito. Execute Rollback.');
            await QueryAwait('ROLLBACK');
            throw error;
        }
    }

    processEnd(){
        console.log(`[+] Process End!!!`);
    }

    /** GET DATE UPDATE
     * @Observarions => Realiza un reduce de la consulta, obteniendo los cursos que no esten finalizados.
     * @param { Array } data => Array a realizar el reduce, si [void] retorna [void] (Reduce retonar un nuevo array igual o menos array dado).
     * @returns { Array } => [ ... ] or [] => void .
     */
    getDatesUpdate( data ){

        let reduceData = data.reduce( ( acc, current ) =>{
            if( current.finalizado == false ){
                acc.push( current );
                return acc;
            }else{
                return acc;
            }
        }, []);

        return reduceData;
    }

    getSqlStringUpdateStatus( id ){
        let sql = `
            UPDATE itinerario SET finalizado = true WHERE id = ${id} ;
        `
        return sql;
    }

    getSqlStringFechas( fecha ){
        let sql = `
            SELECT id, finalizado FROM itinerario WHERE fecha_itinerario BETWEEN '2018-01-01' AND '${fecha}' ORDER BY id DESC
        `;
        return sql;
    }


}

module.exports = new Process();

