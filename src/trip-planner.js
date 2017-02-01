import {bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Map} from './map';
import {Weather} from './weather';

export class TripPlanner {
	static inject = [DialogService];
	currentIndex = null;
	@bindable tripTmp;
	@bindable trip = {
		title:'',
		dest:'',
		category:'',
		startDate:'',
		endDate:'',
		todo: [],
		reminder: ''
	};
	@bindable trips = [];

	filters = [
		{value: '', keys: ['title', 'dest', 'todo']}
	];
	
	constructor(dialogService) {
		this.dialogService = dialogService;
		this.geocoder = new google.maps.Geocoder();	
		//localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
		let tmpData = localStorage.getItem("tripPlannerData");
		if(tmpData) {
			this.trips = JSON.parse(tmpData);
		} else {
			this.trips = [];
		}
	}	

	/*
	Purpose: This is Aurelia default structure. attached() will be called during page initiliazation
	Params: none
	*/
	attached() {
		$.each(['#txtStartDate','#txtEndDate','#txtReminder'], function(index, value) {
			$(value).datepicker({
					autoclose: true,
					todayHighlight: true
			});		
		});
	}

	/*
	Purpose: This function will help to add trip todo item
	Params: e for keyevent
	*/	
	addTodo(e) {
		if (e.keyCode == 13 && this.txtTodo.value) {
			this.trip.todo.push(this.txtTodo.value);
			this.txtTodo.value = '';
		}
		return true;
	}

	/*
	Purpose: To remove trip todo item
	Params: i for trip todo array position that user requests to remove
	*/	
	removeTodo(i) {
		this.trip.todo = this.removeArray(this.trip.todo, i);
	}

	/*
	Purpose: To select a row of trip planner list
	Params: trip for trip object 
	        index for trips array position that user selects
	*/	
	selectRow(trip, index) {
		console.log(trip.startDate);
		this.currentIndex = index;
		this.trip = JSON.parse(JSON.stringify(trip));
		this.tripTmp = trip; //keep original value
		let tmpTrip = this.trip;
		$.each(['#txtStartDate','#txtEndDate','#txtReminder'], function(i, value) {
			$(value).on("changeDate", function(val){
				if(i == 0) {
					tmpTrip.startDate = this.value;
					console.log(tmpTrip.startDate);
				} else if(i == 1) {
					tmpTrip.endDate = this.value;
				} else {
					tmpTrip.reminder = this.value;
				}
			});
		});
	}	

	/*
	Purpose: To cancel editing trip planner action
	Params: none
	*/	
	cancel() {
		this.trip = JSON.parse(JSON.stringify(this.tripTmp));
	}

	/*
	Purpose: To modify existing trip planner or add new trip planner
	Params: none
	*/	
	save() {
		if(this.currentIndex == null) {
			this.trips.push(this.trip);
			this.resetData();
		} else {
			for(let v in this.trip) {
				this.tripTmp[v] = this.trip[v];
			}		
		}
		localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
	}

	/*
	Purpose: Using array index to remove element
	Params: arr for array object
			    arrIndex for array position
	*/	
	removeArray(arr,arrIndex) {
		return arr.slice(0,arrIndex).concat(arr.slice(arrIndex + 1));
	}

	/*
	Purpose: To remove a trip planner and save into localStorage
	Params: none
	*/	
	deleteTrip() {
		this.trips = this.removeArray(this.trips, this.currentIndex);
		this.resetData();
		localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
	}

	/*
	Purpose: To open google map with target location
	Params: tgtLocation for location 
	*/	
  openMap(tgtLocation) {
    this.dialogService.open({ viewModel: Map, model: tgtLocation}).then(response => {
      if (!response.wasCancelled) {
        //console.log('good - ', response.output);
      } else {
        //console.log('bad');
      }
      //console.log(response.output);
    });
  }

	/*
	Purpose: To open weather info with target location
	Params: tgtLocation for location 
	*/	
  openWeather(tgtLocation) {
		let selfDialogService = this.dialogService
		this.geocoder.geocode({'address': tgtLocation}, function(results, status) {
			if (status === 'OK') {
				let lat = results[0].geometry.location.lat();
				let lot = results[0].geometry.location.lng();
				selfDialogService.open({ viewModel: Weather, model: {tgtLocation,lat,lot}}).then(response => {
					if (!response.wasCancelled) {
						//console.log('good - ', response.output);
					} else {
						//console.log('bad');
					}
					//console.log(response.output);
				});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});		
	}

	/*
	Purpose: To reset trip planner if user likes to create new one
	Params: 
	*/	
	resetData() {
		this.currentIndex = null;
		this.trip = {title:'',
			dest:'',
			startDate:'',
			category:'',
			endDate:'',
			todo: [],
			reminder: ''
		};;	
	}
}