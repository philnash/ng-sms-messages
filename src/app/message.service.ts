import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: Http) { }

  getInbox() {
    return this.http.get('/api/inbox')
      .pipe(
        map(res => res.json())
      );
  }
}
