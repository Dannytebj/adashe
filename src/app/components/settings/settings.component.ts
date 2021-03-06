import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
settings: Settings;
  constructor(
    public settingService: SettingsService,
    public flashMessages: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }

  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.flashMessages.show('Settings Saved', {cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/settings']);
  }
  }
