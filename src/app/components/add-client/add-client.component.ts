import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Client } from '../../models/Clients';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalance: boolean;
  constructor(
    public flash: FlashMessagesService,
    public router: Router,
    public clientService: ClientService,
    public settingService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalance = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean }) {
    if (this.disableBalance) {
      value.balance = 0;
    }
    if (!valid) {
      this.flash.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.clientService.createNewClient(value);
      this.flash.show('Client added successfully', {cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
