import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: MessageListComponent, data: { box: 'inbox' } },
  { path: 'outbox', component: MessageListComponent, data: { box: 'outbox' } },
  { path: 'messages/new', component: NewMessageComponent },
  { path: 'messages/:phoneNumber', component: ConversationComponent },
  { path: 'settings', component: SettingsComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
