import {DialogController} from 'aurelia-dialog';

export class Reminder {
  static inject = [DialogController];
  trips = [];
	dismissAry = [];
	
  constructor(controller){
    this.controller = controller;
    this.controller.settings.lock = false;
  }

	/*
	Purpose: activate() is part of aurelia structure. In here, we will activate dialog when we have required params to pass in
	Params: ary for reminder array 
	*/
  activate({indexAry, localTrips}){
    this.trips = localTrips;
		this.indexAry = indexAry;
  }

	/*
	Purpose: when user clicks checkbox, this method will add/remove its index. We will use this saved dismissAry when user clicks "Dismiss" button
	Params: none
	*/	
	addRemoveDismiss(i, evt) {
		if(evt.target.checked) {
			this.dismissAry.push(i);
		} else {
			this.dismissAry.pop(i);
		}
		return true;
	}
	
	/*
	Purpose: Saving dismissed item into localStorage database. 
	Params: none
	*/		
	dismiss() {
		this.dismissAry.forEach((i) => {
				this.trips[i].dismiss = true;
			}
		);
		// save trips data into browser localStorage
		localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
		this.controller.cancel();
	}
}