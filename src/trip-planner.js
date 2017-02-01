import {bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Map} from './map';
import {Weather} from './weather';

export class TripPlanner {
	static inject = [DialogService];
	currentIndex = null;
	@bindable tripTmp;
	/*
		state: 0 created, 1 In progress, 2 ready
	*/
	@bindable trip = {
		state:0,
		title:'',
		dest:'',
		category:'',
		startDate:'',
		endDate:'',
		duration:0,
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
			this.trip.todo.push({'status':false,'desc':this.txtTodo.value});
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
		this.currentIndex = index;
		this.trip = JSON.parse(JSON.stringify(trip));
		this.tripTmp = trip; //keep original value
		let tmpTrip = this.trip;
		$.each(['#txtStartDate','#txtEndDate','#txtReminder'], function(i, value) {
			$(value).on("changeDate", function(val){
				if(i == 0) {
					tmpTrip.startDate = this.value;
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
	Purpose: Covert milliseconds to days
	Params: none
	*/
	getDays(t){
			var cd = 24 * 60 * 60 * 1000,
					ch = 60 * 60 * 1000,
					d = Math.floor(t / cd),
					h = Math.floor( (t - d * cd) / ch),
					m = Math.round( (t - d * cd - h * ch) / 60000),
					pad = function(n){ return n < 10 ? '0' + n : n; };
		if( m === 60 ){
			h++;
			m = 0;
		}
		if( h === 24 ){
			d++;
			h = 0;
		}
		return d;
	}
	/*
	Purpose: To modify existing trip planner or add new trip planner
	Params: none
	*/	
	save() {
		if(this.trip.startDate && this.trip.endDate) {
			let duration = this.getDays(((new Date(this.trip.endDate)).getTime() - 
												(new Date(this.trip.startDate)).getTime()));
			
			this.trip.duration = duration;
		}

		if(this.trip.todo.length === 0) {
			this.trip.state = 0;
		} else {
			let state = true
			for(let item in this.trip.todo) {
				state &= this.trip.todo[item].status;
			}
			console.log(state);
			this.trip.state = state ? 2:1;
		}
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

	/*
	Purpose: When user clicks checkbox, this function will update todo item status. 
	Params: state: 0 created, 1 In progress, 2 ready
	*/
	todoStatusCheck(mouseEvent, item) {
		item.status = mouseEvent.target.checked;
		return true;
	}

	/*
	Purpose: To get state string
	Params: state: 0 created, 1 In progress, 2 ready
	*/		
	getStateStr(state) {
		if(state === 2) {
			return 'Ready';
		} else if(state === 1) {
			return 'In Progress';
		} else {
			return 'Created';
		}
	}

	/*
	Purpose: To check if today is reminder date
	Params: redminer for date string format and may be empty
	*/		
	getReminderCSS(reminder) {
		if(reminder) {
			let duration = this.getDays(((new Date()).getTime() - 
									(new Date(reminder)).getTime()));
			if (duration == 0) {
				return 'reminder';
			}
		}
		return '';
	}
}