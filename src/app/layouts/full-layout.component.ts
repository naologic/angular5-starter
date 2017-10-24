import { Component, OnDestroy, OnInit} from '@angular/core';
import { ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/mapTo';


@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {
    public subscriptions = { online: null, userData: null };
    public status: { isopen: boolean, online: boolean } = { isopen: false, online: true };

    constructor(
      private toasterService: ToasterService
    ) {
      // -->Network: detect
      this.subscriptions.online = Observable.merge(
              Observable.of(navigator.onLine),
              Observable.fromEvent(window, 'online').mapTo(true),
              Observable.fromEvent(window, 'offline').mapTo(false)
          ).subscribe(on => {
            // -->Show: notification
            if (this.status.online === true && on === false)
              this.toasterService.pop('warning', 'Warning', 'Lost Connection');
            if (this.status.online === false && on)
              this.toasterService.pop('info', 'Internet', 'Connection OK');

            // -->Set: status
            this.status.online = on;
          });
    }

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit() {
        console.log('init main component');
    }
    ngOnDestroy(): void {
      this.subscriptions.online.unsubscribe();
      this.subscriptions.userData.unsubscribe();
    }
}
