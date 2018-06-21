import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';

const routes: Routes = [
  { path: '', component: MessageListComponent, data: { box: 'inbox' } },
  { path: 'outbox', component: MessageListComponent, data: { box: 'outbox' } }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
