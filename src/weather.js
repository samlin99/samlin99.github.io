import {DialogController} from 'aurelia-dialog';
import {bindable} from "aurelia-framework";

export class Weather {
  static inject = [DialogController];
  tgtLocation = "";
	lat;
	lot;
	
  constructor(controller){
    this.controller = controller;
    this.controller.settings.lock = false;
  }
	
  activate({tgtLocation, lat, lot}){
    this.tgtLocation = tgtLocation;
		this.lat = lat;
		this.lot = lot;			
  }
}