import {DialogController} from 'aurelia-dialog';

export class Map {
  static inject = [DialogController];
  tgtLocation = "";
	
  constructor(controller){
    this.controller = controller;
    this.controller.settings.lock = false;
  }
	
  activate(tgtLocation){
    this.tgtLocation = encodeURIComponent(tgtLocation);
  }

  testDelegate () {
    alert("Delegation worked");
  }
}