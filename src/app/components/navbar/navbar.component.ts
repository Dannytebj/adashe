import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn: boolean;
loggedInUser: string;
showRegister: boolean;
  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    public settingService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
     this.showRegister = this.settingService.getSettings().allowRegistration;
    });
  }

  onLogoutClick() {
    this.authService.logOut();
    this.flashMessages.show('You have logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
  }

}
