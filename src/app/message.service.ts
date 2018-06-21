import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Message } from './models/message.model';
import { MessageStoreService } from './message-store.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private http: Http,
    private messageStore: MessageStoreService
  ) {}

  getMessages(inOrOut: string) {
    return this.http
      .get(`/api/${inOrOut}`)
      .pipe(map(res => res.json()))
      .pipe(map(objs => objs.map(obj => new Message(obj))));
  }

  getConversation(phoneNumber: string) {
    return this.http
      .get(`/api/messages/${phoneNumber}`)
      .pipe(map(res => res.json()))
      .pipe(map(obj => obj.messages.map(obj => new Message(obj))));
  }

  sendMessage(phoneNumber: string, body: string) {
    return this.http
      .post('/api/messages', {
        phoneNumber: phoneNumber,
        body: body
      })
      .pipe(catchError((err) => {
        this.messageStore.saveMessage(phoneNumber, body).then(() => {
          return navigator.serviceWorker.ready;
        }).then(reg => reg.sync.register('outbox'));
        return throwError(err);
      }))
      .pipe(map(res => res.json()));
  }
}
