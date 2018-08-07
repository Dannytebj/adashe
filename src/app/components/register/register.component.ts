import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
email: string;
password: string;
  constructor(
    private authServce: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authServce.register(this.email, this.password)
      .then((response) => {
        this.flashMessage.show('New user registered!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.flashMessage.show(error.message, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      });
  }

}
