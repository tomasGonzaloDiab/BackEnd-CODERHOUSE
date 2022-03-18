import admin from 'firebase-admin';
import config from '../../config/index.js';
import moment from 'moment';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

export default class FirebaseContainer {
  constructor(collectionName) {
    this.coleccion = db.collection(collectionName);
  }

  async list(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`);
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async listAll() {
    try {
      const result = [];
      const snapshot = await this.coleccion.get();
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(newElement) {
    newElement.timestamp = moment(new Date()).format('DD/MM/YY HH:mm');
    try {
      const doc = await this.coleccion.add(newElement);
      return { ...newElement, id: doc.id };
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(id, newData) {
    newData.timestamp = moment(new Date()).format('DD/MM/YY HH:mm');
    try {
      const doc = await this.coleccion.doc(id).set(newData);
      return doc;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async delete(id) {
    try {
      const doc = await this.coleccion.doc(id).delete();
      return doc;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll(){
    try {
      const docs = await this.listAll()
      const ids = docs.map(doc=>doc.id)
      const deleteDocs = ids.map(id => this.delete(id))
      await Promise.allSettled(deleteDocs)
      
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }

}
