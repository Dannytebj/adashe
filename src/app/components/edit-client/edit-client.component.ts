import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from './../../models/Clients';
import { ClientService } from './../../services/client.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

id: string;
client: Client = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  balance: 0
};
disableBalance = true;
  constructor(
    public clientService: ClientService,
    public flashMessage: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id)
    .subscribe(client => {
      this.client = client;
    });
  }
  onSubmit({value, valid}: {value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessage.show('Client updated successfully', {cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
