import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  messages: Message[];
  phoneNumber: string;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.phoneNumber = params.phoneNumber;
      this.getMessages();
    });
  }

  onMessageSend() {
    this.getMessages();
  }

  getMessages() {
    this.messageService.getConversation(this.phoneNumber)
    .subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    })
  }
}
