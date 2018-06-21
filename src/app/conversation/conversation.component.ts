import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  messages: Message[];
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.messageService.getConversation(params.phoneNumber)
        .subscribe(messages => {
          this.messages = messages;
          console.log(this.messages);
        })
    });
  }

}
