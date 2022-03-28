'use strict'

const Paginador = require('../../Custom/paginador/paginador');

class Entidad{

  constructor( data = null ){

    if( data ){
      this.id = data.id;
      this.id_usuario = data.id_usuario;
      this.id_provincia = data.id_provincia;
      this.id_pais = data.id_pais;
      this.descripcion = data.descripcion;
      this.web = data.web;
      this.email = data.email;
      this.verificado = data.verificado;
			this.imagen = data.imagen;
      this.nombre = data.nombre;
      this.direccion = data.direccion;
      this.telefono = data.telefono;
      this.cuit = data.cuit;
      this.ciudad = data.ciudad;
      this.director = data.director;
      this.id_actividad = data.id_actividad;
    }

  }

  getId(){ return this.id; }
  getIdUsuario(){ return this.id_usuario; }
  getIdProvincia(){ return this.id_provincia; }
  getIdPais(){ return this.id_pais; }
  getDescripcion(){ return this.descripcion; }
  getWeb(){ return this.web; }
  getEmail(){ return this.email; }
  getVerificado(){ return this.verificado; }
  getNombre(){ return this.nombre; }
  getDireccion(){ return this.direccion; }
  getTelefono(){ return this.telefono; }
  getImagen(){ return this.imagen; }
  getCuit(){ return this.cuit; }
  getCiudad(){ return this.ciudad; }
  getDirector(){ return this.director; }
  getIdActividad(){ return this.id_actividad; }

  setId( id ){ this.id = id; }
  setIdUsuario( id_usuario ){ this.id_usuario = id_usuario; }
  setIdProvincia( id_provincia ){ this.id_provincia = id_provincia; }
  setIdPais( id_pais ){ this.id_pais = id_pais; }
  setDescripcion( descripcion ){ this.descripcion = descripcion; }
  setWeb( web ){ this.web = web; }
  setEmail( email ){ this.email = email; }
  setVerificado( verificado ){ this.verificado = verificado; }
  setNombre( nombre ){ this.nombre = nombre; }
  setDireccion( direccion ){ this.direccion = direccion; }
  setTelefono( telefono ){ this.telefono = telefono; }
  setImagen( imagen ){ this.imagen = imagen; }
  setCuit( cuit ){ this.cuit = cuit; }
  setCiudad( ciudad ){ this.ciudad = ciudad; }
  setDirector( director ){ this.director = director; }
  setIdActividad( id_actividad ){ this.id_actividad = id_actividad; }
  getSqlStringUpdateVerificado(){
    let sql = `UPDATE entidad SET verificado = ${this.getVerificado()} WHERE id = ${this.getId()} ;`;
    return sql;
  }

  getSqlString(){
    let sql = `
      INSERT INTO entidad (
        id_usuario,
        id_provincia,
        id_pais,
        descripcion,
        web,
        email,
        verificado,
        nombre,
        direccion,
        telefono,
				imagen,
        cuit,
        ciudad,
        director,
        id_actividad
      )
      VALUES(
        ${this.getIdUsuario()},
        ${this.getIdProvincia()},
        ${this.getIdPais()},
        '${this.getDescripcion()}',
        '${this.getWeb()}',
        '${this.getEmail()}',
        ${this.getVerificado()},
        '${this.getNombre()}',
        '${this.getDireccion()}',
        '${this.getTelefono()}',
				'${this.getImagen()}',
        '${this.getCuit()}',
        '${this.getCiudad()}',
        '${this.getDirector()}',
        ${this.getIdActividad()}
      ) RETURNING *;
    `;

    return sql;
  }

  getSqlStringUpdate(){
    let sql = `
      UPDATE entidad SET 
        id_usuario ${this.getIdUsuario()},
        id_provincia = ${this.getIdProvincia()},
        id_pais = ${this.getIdPais()},
        descripcion = '${this.getDescripcion()}',
        web = '${this.getWeb()}',
        email = '${this.getEmail()}',
        verificado = ${this.getVerificado()},
        nombre = '${this.getNombre()}',
        direccion = '${this.getDireccion()}',
        telefono = '${this.getTelefono()}' ,
        imagen = '${this.getImagen()}',
        cuit = '${this.getCuit()}',
        ciudad = '${this.getCiudad()}',
        director = '${this.getDirector()}',
        id_actividad = ${this.getIdActividad()}
      WHERE id = ${this.getId()}
    ;`;

    return sql;
  }

  getSqlStringList( data ){
    let pag;

    if( data.next == true ){
      pag = Paginador.nextPage( data );
    }else{
      pag = Paginador.backPage( data );
    }

    let sql = `SELECT * FROM entidad ORDER BY DESC LIMIT ${pag.countPage} OFFSET ${pag.finalPage} ;`;
    return {
      sql : sql,
      paginador : pag
    };
  }

  getSqlStringListPaginado( pag ){
    let sql = `SELECT 
              ent.id, ent.nombre, ent.descripcion, ent.web, ent.email, ent.verificado, ent.direccion, ent.telefono, ent.ciudad, ent.director,
              pa.descripcion AS pais_entidad,
              pro.descripcion AS provincia_entidad
              FROM entidad AS ent   
              INNER JOIN pais AS pa ON pa.id = ent.id_pais 
              INNER JOIN provincia AS pro ON pro.id = ent.id_provincia
              WHERE verificado = true 
              LIMIT ${pag.Take} OFFSET ${pag.Skip} ;`;
    return sql;
  }

  
  getSqlStringById(){
    let sql = `SELECT * FROM entidad WHERE id = ${this.getId()}`;
    return sql;
  }

  getSqlStringValidateCuit( cuit ){
    let sql = `SELECT * FROM entidad WHERE cuit = '${cuit}' ;`;
    return sql;
  }

}

module.exports = Entidad;
