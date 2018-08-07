import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(
    private authServce: AuthService,
    private router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authServce.login(this.email, this.password)
      .then((response) => {
        this._flashMessage.show('You are logged in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this._flashMessage.show(error.message, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      });
  }

}
