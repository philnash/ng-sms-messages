import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { resolve } from 'q';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages = [];
  loaded = false;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getInbox().subscribe((res) => {
      this.messages = res;
      console.log(this.messages);
      this.loaded = true;
    });
  }

}
