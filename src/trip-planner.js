import {bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Map} from './map';
import {Weather} from './weather';
import {Reminder} from './reminder';
import {datetimepicker} from 'eonasdan-bootstrap-datetimepicker';
import moment from 'moment';

export class TripPlanner {
	static inject = [DialogService];
	currentIndex = null;
	tripTmp;
	/*
		state: 0 created, 1 In progress, 2 ready
	*/
	trip = {
		state:0,
		title:'',
		dest:'',
		category:'None',
		startDate:'',
		endDate:'',
		duration:0,
		todo: [],
		reminder: '',
		dismiss: false
	};
	trips = [];
	category = ['None','Business Trip','Vacation'];

	filters = [
		{value: '', keys: ['title', 'dest', 'todo']},
		{value: '', keys: ['category']}
	];
	snoozeCount = 0;

	/*
	Purpose: Class constrauctor. Loads once per instance initiates
	Params: dialogService for aurelia-dialog. 
	*/	
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
	Purpose: This method gets called when the View is attached to the DOM. Here is where you will do your DOM manipulation, wrap elements in jQuery objects or whatever you like. All work with the DOM (especially plugins) should be done within this method.
	Params: none
	*/
	attached() {
		let defaultConf = {
			minDate: new Date,
			defaultDate: new Date,
			format: 'MM/DD/YYYY',
			showTodayButton: true,
			stepping: 5
		};
		$('#txtStartDate').datetimepicker(defaultConf);
		$('#txtEndDate').datetimepicker(
			$.extend(defaultConf,{useCurrent: false})
			);
		defaultConf.format = "MM/DD/YYYY hh:mm A";
		delete defaultConf.minDate;
		delete defaultConf.defaultDate;
		$('#txtReminder').datetimepicker(
			$.extend(defaultConf,{useCurrent: false})
		);
		
		$("#txtStartDate").on("dp.change", function (e) {
			// reset endDate's minDate when user modifies startDate 
			$('#txtEndDate').data("DateTimePicker").minDate(e.date);
			// if startDate is after endDate then reset endDate to be same as startDate
			if(!e.date.isBefore($('#txtEndDate').data("DateTimePicker").date())) {
				$('#txtEndDate').data("DateTimePicker").date(e.date);
			}
		});
		this.startReminder();
		this.startTimer(60000);
	}

	/*
	Purpose: This method is called when the View is detached from the DOM. If you registered events in the attached method, you would probably unbind them in here. This is your chance to free up some memory and clean the slate.
	Params: none
	*/	
	detached() {
		clearInterval(intervalID);
	}

	/*
	Purpose: Open reminder dialog if there are trips to reminder user
	Params: doOpen for open up reminder dialog regardless snoonze or timer logic
	*/
	startReminder(doOpen) {
		if (!doOpen && this.snoozeCount >= 1 && this.snoozeCount <= 5) {
			this.snoozeCount++;
		} else {
			let localTrips = this.trips;
			// save target reminder trips index location to indexAry
			// this will shorten looping when generating view in reminder dialog
			let indexAry = [];
			let cNow = moment();
			for(let i in this.trips) {
				if(this.trips[i].reminder) {
					if(moment(this.trips[i].reminder).isBefore(cNow) && !localTrips[i].dismiss) {
						indexAry.push(i);
					}
				}
			}
			if((indexAry.length > 0 && !this.dialogService.hasActiveDialog) || doOpen) {
				this.dialogService.open({ viewModel: Reminder, model: {indexAry, localTrips}}).then(response => {
					if (!response.wasCancelled) {
						this.snoozeCount = 1;
					}
				});						
			}
		}
	}

	/*
	Purpose: Starting reminder timer
	Params: duration for executing function at specified interval
	*/
	startTimer(duration) {
		this.intervalID = setInterval(() => {
			this.startReminder();
			},
			duration
		);
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
		// data may be older than current datere 
		// resetting start and end date miniDate & current date. 
		$('#txtStartDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
		$('#txtStartDate').data("DateTimePicker").date(moment(this.trip.startDate));
		$('#txtEndDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
		$('#txtEndDate').data("DateTimePicker").date(moment(this.trip.endDate));

		if(this.trip.reminder) {
			$('#txtReminder').data("DateTimePicker").date(moment(this.trip.reminder));			
		}
		this.tripTmp = trip; //keep original value
	}	

	/*
	Purpose: To cancel editing trip planner action
	Params: none
	*/	
	cancel() {
		// currentIndex is not nulll means that user is modifying existing trip
		// otherwise, user is creating new trip but like to cancel
		if(this.currentIndex === null) {
			this.resetData();
		} else {
			this.trip = JSON.parse(JSON.stringify(this.tripTmp));
			$('#txtStartDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
			$('#txtStartDate').data("DateTimePicker").date(moment(this.trip.startDate));
			$('#txtEndDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
			$('#txtEndDate').data("DateTimePicker").date(moment(this.trip.endDate));
			if(this.trip.reminder) {
				$('#txtReminder').data("DateTimePicker").date(moment(this.trip.reminder));
			} else {
				$('#txtReminder').data("DateTimePicker").date(null);
			}			
		} 
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
		this.trip.startDate = $('#txtStartDate').data("DateTimePicker").date(); 
		this.trip.endDate = $('#txtEndDate').data("DateTimePicker").date(); 
		this.trip.reminder = $('#txtReminder').data("DateTimePicker").date(); 
		if(this.trip.startDate && this.trip.endDate) {
			this.trip.duration = this.getDays(((new Date(this.trip.endDate)).getTime() - 
												(new Date(this.trip.startDate)).getTime()));
		}

		if(this.trip.todo.length === 0) {
			this.trip.state = 0;
		} else {
			let state = true
			for(let item in this.trip.todo) {
				state &= this.trip.todo[item].status;
			}
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
		// save trips data into browser localStorage
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
	Purpose: To reset trip planner input fields if user likes to create new one
	Params: 
	*/	
	resetData() {
		this.currentIndex = null;
		$('#txtStartDate').data("DateTimePicker").minDate(moment());
		$('#txtEndDate').data("DateTimePicker").minDate(moment());
		$('#txtStartDate').data("DateTimePicker").date(moment());
		$('#txtEndDate').data("DateTimePicker").date(moment());
		$('#txtReminder').data("DateTimePicker").date(null);
		$('#txtReminder').data("DateTimePicker").defaultDate(null);
		this.trip = {
			state:0,
			title:'',
			dest:'',
			category:'None',
			startDate:'',
			endDate:'',
			duration:0,
			todo: [],
			reminder: '',
			dismiss: false
		};
	}

	/*
	Purpose: When user clicks checkbox, this function will update todo item status. 
	Params: state: 0 created, 1 In progress, 2 ready
	*/
	todoStatusCheck(mouseEvent, item) {
		item.status = mouseEvent.target.checked;
		return true;
	}

}