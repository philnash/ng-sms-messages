import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  pushEnabled: boolean = false;
  pushSubscription: PushSubscription;

  constructor(
    private swPush: SwPush,
    private http: Http
  ) { }

  ngOnInit() {
    this.swPush.subscription
      .subscribe(pushSubscription => {
        if (pushSubscription) {
          this.pushEnabled = true;
          this.pushSubscription = pushSubscription;
        }
      });
  }

  onActivatePush() {
    console.log(this.swPush);
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.webPushPublicKey
      }).then(subscription => {
        // this.pushSubscription = subscription;
        return this.http.post('/api/subscription', subscription.toJSON()).toPromise();
      }).then(result => {
        // this.pushEnabled = true;
        console.log(result);
      })
    }
  }

  onUnsubscribePush() {
    if (this.swPush.isEnabled) {
      this.swPush.unsubscribe().then(() => {
        this.pushEnabled = false;
        delete this.pushSubscription;
        return this.http.post('/api/subscription', {}).toPromise();
      });
    }
  }

}
