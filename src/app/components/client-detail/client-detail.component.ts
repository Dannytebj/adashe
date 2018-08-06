import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from './../../models/Clients';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
id: string;
client: Client;
hasBalance: boolean;
showBalanceUpdateInput: boolean;
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
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }
  updateBalance(id: string) {
    this.clientService.updateClient(id, this.client);
    this.flashMessage.show('Balance updated successfully', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/client/' + this.id]);
  }

}
