import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  loaded = false;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.messageService.getMessages(data['box']).subscribe((res) => {
        this.messages = res;
        console.log(this.messages);
        this.loaded = true;
      });
    });
  }
}
