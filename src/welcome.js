import {bindable, bindingMode} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Map} from './map';
import {Weather} from './weather';
//google weather api AIzaSyCt6nIHhh_y8SqEY5OBVKsn3lMd319sb6w

export class Welcome {
	static inject = [DialogService];
	currentIndex = null;
	@bindable tripTmp;
	@bindable trip = {
		title:'',
		dest:'',
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

	attached() {
		$.each(['#txtStartDate','#txtEndDate','#txtReminder'], function(index, value) {
			$(value).datepicker({
					autoclose: true,
					todayHighlight: true
			});		
		});
	}

	addTodo(e) {
		if (e.keyCode == 13 && this.txtTodo.value) {
			this.trip.todo.push(this.txtTodo.value);
			this.txtTodo.value = '';
		}
		return true;
	}
	
	removeTodo(i) {
		this.trip.todo = this.removeArray(this.trip.todo, i);
	}
	
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
	
	cancel() {
		this.trip = JSON.parse(JSON.stringify(this.tripTmp));
	}
	
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
	
	removeArray(arr,arrIndex) {
		return arr.slice(0,arrIndex).concat(arr.slice(arrIndex + 1));
	}
	
	deleteTrip() {
		this.trips = this.removeArray(this.trips, this.currentIndex);
		this.resetData();
		localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
	}
	
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
	
	resetData() {
		this.currentIndex = null;
		this.trip = {title:'',
			dest:'',
			startDate:'',
			endDate:'',
			todo: [],
			reminder: ''
		};;	
	}
}