import mongoose from 'mongoose';
import moment from 'moment';
import config from '../../config/index.js';

await mongoose.connect(`${config.mongodb.conexion}`);

//id de los productos 
let id = 0
export default class MongoContainer {

  constructor(collectionName, schema) {
    this.coleccion = mongoose.model(collectionName, schema);
  }

  async list(id) {
    try {
      const doc = await this.coleccion.find({id:parseInt(id)},{ __v: 0 });
      if (doc.length == 0) {
        throw new Error('producto no encontrado');
      } else {
        return doc;
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async listAll() {
    try {
      let docs = await this.coleccion.find({}, { __v: 0 });
      return docs;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(newElement) {
    newElement.timestamp = moment(new Date()).format(
      'DD/MM/YY HH:mm'
    )
    id++
    newElement.id=id
    newElement.products = []
    try {
        const newProd = await this.coleccion.create(newElement);
        return newProd
    } catch (error) {
        throw new Error(`Error al guardar: ${error}`)
    }
}


  async update(id, newData) {
    newData.timestamp = moment(new Date()).format(
      'DD/MM/YY HH:mm'
    )
    try {
      await this.coleccion.replaceOne( { id: parseInt(id) }, newData)
      const result = await this.coleccion.find({ id: parseInt(id)});
      return result 
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`)
    }

  }

  async delete(id) {
    try {
      const deletedDoc = await this.coleccion.deleteOne({id: parseInt(id) })
      return deletedDoc
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({})
      return "eliminado"
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }
}
