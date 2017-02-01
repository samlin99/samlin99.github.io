import {DialogController} from 'aurelia-dialog';
import {bindable} from "aurelia-framework";

export class Weather {
  static inject = [DialogController];
  tgtLocation = "";
	lat
	lot;
	
  constructor(controller){
    this.controller = controller;
    this.controller.settings.lock = false;
  }

	/*
	Purpose: activate() is part of aurelia structure. In here, we will activate dialog when we have required params to pass in
	Params: tgtLocation for location 
					lat for latitude 
					lot for longitude 
	*/
  activate({tgtLocation, lat, lot}){
    this.tgtLocation = tgtLocation;
		this.lat = lat;
		this.lot = lot;			
  }
}