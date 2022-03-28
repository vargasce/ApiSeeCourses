'use strinct'

const md5 = require('md5');
const dt = require('../../Custom/dates/dates');

class usuario {
  constructor( data ){
    if( data ){
      this.id = data.id;
      this.usuario = data.usuario;
      this.pass = data.pass;
      this.fecha_alta = data.fecha_alta;
      this.activo = data.activo;
    }
  }

  getId(){ return this.id; }
  getUsuario(){ return this.usuario; }
  getPass(){ return this.pass; }
  getFechaAlta(){ return this.fecha_alta; }
  getActivo(){ return this.activo; }

  setId( id ){ this.id = id; }
  setUsuario( usuario ){ this.usuario = usuario; }
  setPass( pass ){ this.pass = pass; }
  setFechaAlta( fecha_alta ){ this.fecha_alta = fecha_alta; }
  setActivo( activo ){ this.activo = activo; }

  /** GET SQL STRING INSERT
   * @Observations : Retorna string sql para realizar un insert en la base .
   * @returns { string } => string con la consulta.
   */
  getSqlString(){

    let sql = `
      INSERT INTO usuario (
        usuario,
        pass,
        fecha_alta,
        activo
      )
      VALUES(
        '${this.getUsuario()}',
        '${md5( this.getPass() )}',
        '${dt.getDateCurrentStringCustom()}',
        ${true}
      ) RETURNING *;
    `;

    return sql;
  }

  /** GET SQL STRING UPDATE
   * @Observations : Retorna sql string para ralizar un update en la tabla.
   * @returns { string } => string con la consulta.
   */
  getSqlStringUpdate(){

    let sql = `
      UPDATE usuario SET
        usuario = '${this.getUsuario()}',
        pass = '${ md5( this.getPass() ) }'
      WHERE id = ${this.getId()} ;
    `;

    return sql;
  }

  /** GET SQL STRING UPDATE ACTIVE.
   * @Observations : Retorna string sql para actualizar el estado del usuario.
   * @returns { string } => string con la consulta.
   */
  getSqlStringUpdateActive(){
    
    let sql = `
      UPDATE usuario SET
        activo = ${this.getActivo()}
      WHERE id = ${this.getId()} ;
    `;

    return sql;
  }

  getSqlStringValidateUser( name ){
    let sql = `SELECT * FROM usuario WHERE usuario = '${name}' ;`;
    return sql;
  }

}

module.exports = usuario;
