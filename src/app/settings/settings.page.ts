import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from "../settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public settings;

  constructor(private router: Router,
              private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit() {
  }

  validate(){
    this.router.navigateByUrl('/game');
  }

}
