import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  clientesCollection: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesCollection = db.collection('control-clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getClientes(): Observable<Cliente[]> {
    // Obtenemos Resultado de Clientes de la BD
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientesCollection.add(cliente);
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`control-clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map( accion => {
        if(accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  clientEdition(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`control-clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  clientDelete(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`control-clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }

}
