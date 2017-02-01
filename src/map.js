import {DialogController} from 'aurelia-dialog';

export class Map {
  static inject = [DialogController];
  tgtLocation = "";
	
  constructor(controller){
    this.controller = controller;
    this.controller.settings.lock = false;
  }

	/*
	Purpose: activate() is part of aurelia structure. In here, we will activate dialog when we have required params to pass in
	Params: tgtLocation for location 
	*/	
  activate(tgtLocation){
    this.tgtLocation = encodeURIComponent(tgtLocation);
  }
}