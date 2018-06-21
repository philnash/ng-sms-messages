import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @Input('phoneNumber') phoneNumber: string;
  @Output() send: EventEmitter<any> = new EventEmitter();

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const phoneNumber = this.form.value.phoneNumber || this.phoneNumber;
    const body = this.form.value.body;
    this.messageService.sendMessage(phoneNumber, body).subscribe(result => {
      this.form.reset();
      this.send.emit();
      this.router.navigateByUrl(`/messages/${phoneNumber}`);
    });
  }

}
