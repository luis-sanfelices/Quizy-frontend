import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, NotificationsService } from '../../_services';
import { Router } from '@angular/router';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<any>;
  notifications;
  notificationsNumber;

  constructor(
    private authService: AuthenticationService,
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(isloggedin => {
      if (isloggedin.auth) {
        this.notificationsService.startGetNotifications();
        this.notifications = this.notificationsService.getNotificationsObservable()
        .subscribe(notifications => {
          this.notificationsNumber = notifications.length;
          console.log(notifications)
        });
      }
    })
  }

  onLogout() {
    this.authService.logout();
    this.notificationsService.stopGetNotifications();
    this.notifications.unsubscribe();
    this.router.navigate([`/login`]);
  }

}
