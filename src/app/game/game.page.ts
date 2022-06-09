import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {SettingsService} from "../settings.service";

interface AnimalInterface {
  title: string;
  image: string;
  desc: string;
  file: string;
  playing: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public animalDatabase: AnimalInterface[] = [
    {
      title: 'Vache',
      image: 'img/animals/cow-icon.png',
      desc: 'Meugle',
      file: '/sounds/cow.mp3',
      playing: false
    },
    {
      title: 'Dauphin',
      image: 'img/animals/dolphin-icon.png',
      desc: 'Siffle',
      file: '/sounds/dolphin.mp3',
      playing: false
    },
    {
      title: 'Grenouille',
      image: 'img/animals/frog-icon.png',
      desc: 'Coasse',
      file: '/sounds/frog.mp3',
      playing: false
    },
    {
      title: 'Oiseau',
      image: 'img/animals/bird-icon.png',
      desc: 'Chante',
      file: '/sounds/bird.mp3',
      playing: false
    },
    {
      title: 'Cochon',
      image: 'img/animals/pig-icon.png',
      desc: 'Grogne',
      file: '/sounds/pig.mp3',
      playing: false
    },
    {
      title: 'Chien',
      image: 'img/animals/puppy-icon.png',
      desc: 'Aboie',
      file: '/sounds/dog.mp3',
      playing: false
    },
    {
      title: 'Chat',
      image: 'img/animals/black-cat-icon.png',
      desc: 'Miaule',
      file: '/sounds/cat.mp3',
      playing: false
    },
    {
      title: 'Cheval',
      image: 'img/animals/horse-icon.png',
      desc: 'Hennit',
      file: '/sounds/horse.wav',
      playing: false
    },
    {
      title: 'Ane',
      image: 'img/animals/donkey-icon.png',
      desc: 'Brait',
      file: '/sounds/donkey.wav',
      playing: false
    }
  ];

  public animalList: AnimalInterface[] = [];

  public pickedAnimal: AnimalInterface = null;

  public audio: HTMLAudioElement = null;

  public reorder = false;

  private settings;

  constructor(
    private toastCtrl: ToastController,
    private settingsService: SettingsService
    ) {
    this.animalList = JSON.parse(JSON.stringify(this.animalDatabase));
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit() {
  }

  play(){

    if(this.audio && ! this.audio.ended){
      this.audio.pause();
    }

    // Sélection d'un animal au hasard
    if(this.pickedAnimal === null){
      const index = Math.floor(Math.random() * this.animalList.length);
      this.pickedAnimal = this.animalList[index];
    }

    // Lecture du cri de l'animal
    this.audio = new Audio('/assets' + this.pickedAnimal.file);
    this.audio.load();
    this.audio.play();

  }

  reorderAnimal(ev){
    const animal = this.animalList[ev.detail.from];
    // suppression de l'animal à la position de départ
    this.animalList.splice(ev.detail.from, 1);
    // insertion de l'animal à la position d'arrivée
    this.animalList.splice(ev.detail.to, 0, animal);

    ev.detail.complete();

    console.log(this.animalList);

  }

  async guess(animal){
    let message = '';

    if(! this.pickedAnimal){
      message = 'Tu dois cliquer sur jouer en bas avant de choisir un animal';
    } else if(this.pickedAnimal.title !== animal.title){
      message = this.settings.wrongMessage;
      const index = this.animalList.findIndex((item) => item.title === animal.title);
      this.animalList.splice(index, 1);
    } else {
      message = this.settings.winMessage;
      this.pickedAnimal = null;
      this.audio = null;
      this.animalList = JSON.parse(JSON.stringify(this.animalDatabase));
    }

    const toast = await this.toastCtrl.create({
      message,
      position: 'middle',
      duration: 1000
    });

    toast.present();
  }

}
