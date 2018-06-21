import { Injectable } from '@angular/core';
import idb from 'idb';

@Injectable({
  providedIn: 'root'
})
export class MessageStoreService {
  private dbPromise: Promise<any>;

  constructor() {
    console.log(idb);
    this.dbPromise = idb.open('outbox-store', 1, upgradeDb => {
      upgradeDb.createObjectStore('outbox', { keyPath: "id", autoIncrement: true });
    });
  }

  saveMessage(phoneNumber: string, body: string) {
    return this.dbPromise.then(db => {
      const tx = db.transaction('outbox', 'readwrite');
      tx.objectStore('outbox').add({
        phoneNumber: phoneNumber,
        body: body
      });
      return tx.complete;
    });
  }
}
