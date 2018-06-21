import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MessageListComponent } from './message-list/message-list.component';
import { HttpModule } from '@angular/http';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { NewMessageComponent } from './new-message/new-message.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageComponent,
    NewMessageComponent,
    ConversationComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
