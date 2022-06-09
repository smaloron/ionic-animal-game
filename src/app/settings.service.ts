import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings = {
    winMessage: 'Super tu as gagné',
    wrongMessage: 'Ce n\'est pas tout à fait ça essaie encore'
  };

  constructor() { }

  getSettings(){
    return this.settings;
  }
}
