import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MessageListComponent } from './message-list/message-list.component';
import { HttpModule } from '@angular/http';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { NewMessageComponent } from './new-message/new-message.component';
import { ConversationComponent } from './conversation/conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageComponent,
    NewMessageComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
