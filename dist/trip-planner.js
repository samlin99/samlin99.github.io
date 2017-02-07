System.register(['aurelia-framework', 'aurelia-dialog', './map', './weather', './reminder', 'eonasdan-bootstrap-datetimepicker', 'moment'], function (_export, _context) {
	"use strict";

	var bindable, DialogService, Map, Weather, Reminder, datetimepicker, moment, _class, _temp, TripPlanner;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			bindable = _aureliaFramework.bindable;
		}, function (_aureliaDialog) {
			DialogService = _aureliaDialog.DialogService;
		}, function (_map) {
			Map = _map.Map;
		}, function (_weather) {
			Weather = _weather.Weather;
		}, function (_reminder) {
			Reminder = _reminder.Reminder;
		}, function (_eonasdanBootstrapDatetimepicker) {
			datetimepicker = _eonasdanBootstrapDatetimepicker.datetimepicker;
		}, function (_moment) {
			moment = _moment.default;
		}],
		execute: function () {
			_export('TripPlanner', TripPlanner = (_temp = _class = function () {
				function TripPlanner(dialogService) {
					_classCallCheck(this, TripPlanner);

					this.currentIndex = null;
					this.trip = {
						state: 0,
						title: '',
						dest: '',
						category: 'None',
						startDate: '',
						endDate: '',
						duration: 0,
						todo: [],
						reminder: '',
						dismiss: false
					};
					this.trips = [];
					this.category = ['None', 'Business Trip', 'Vacation'];
					this.filters = [{ value: '', keys: ['title', 'dest', 'todo'] }, { value: '', keys: ['category'] }];
					this.snoozeCount = 0;

					this.dialogService = dialogService;
					this.geocoder = new google.maps.Geocoder();

					var tmpData = localStorage.getItem("tripPlannerData");
					if (tmpData) {
						this.trips = JSON.parse(tmpData);
					} else {
						this.trips = [];
					}
				}

				TripPlanner.prototype.attached = function attached() {
					var defaultConf = {
						minDate: new Date(),
						defaultDate: new Date(),
						format: 'MM/DD/YYYY',
						showTodayButton: true,
						stepping: 5
					};
					$('#txtStartDate').datetimepicker(defaultConf);
					$('#txtEndDate').datetimepicker($.extend(defaultConf, { useCurrent: false }));
					defaultConf.format = "MM/DD/YYYY hh:mm A";
					delete defaultConf.minDate;
					delete defaultConf.defaultDate;
					$('#txtReminder').datetimepicker($.extend(defaultConf, { useCurrent: false }));

					$("#txtStartDate").on("dp.change", function (e) {
						$('#txtEndDate').data("DateTimePicker").minDate(e.date);

						if (!e.date.isBefore($('#txtEndDate').data("DateTimePicker").date())) {
							$('#txtEndDate').data("DateTimePicker").date(e.date);
						}
					});
					this.startReminder();
					this.startTimer(60000);
				};

				TripPlanner.prototype.detached = function detached() {
					clearInterval(intervalID);
				};

				TripPlanner.prototype.startReminder = function startReminder(doOpen) {
					var _this = this;

					if (!doOpen && this.snoozeCount >= 1 && this.snoozeCount <= 5) {
						this.snoozeCount++;
					} else {
						var localTrips = this.trips;

						var indexAry = [];
						var cNow = moment();
						for (var i in this.trips) {
							if (this.trips[i].reminder) {
								if (moment(this.trips[i].reminder).isBefore(cNow) && !localTrips[i].dismiss) {
									indexAry.push(i);
								}
							}
						}
						if (indexAry.length > 0 && !this.dialogService.hasActiveDialog || doOpen) {
							this.dialogService.open({ viewModel: Reminder, model: { indexAry: indexAry, localTrips: localTrips } }).then(function (response) {
								if (!response.wasCancelled) {
									_this.snoozeCount = 1;
								}
							});
						}
					}
				};

				TripPlanner.prototype.startTimer = function startTimer(duration) {
					var _this2 = this;

					this.intervalID = setInterval(function () {
						_this2.startReminder();
					}, duration);
				};

				TripPlanner.prototype.addTodo = function addTodo(e) {
					if (e.keyCode == 13 && this.txtTodo.value) {
						this.trip.todo.push({ 'status': false, 'desc': this.txtTodo.value });
						this.txtTodo.value = '';
					}
					return true;
				};

				TripPlanner.prototype.removeTodo = function removeTodo(i) {
					this.trip.todo = this.removeArray(this.trip.todo, i);
				};

				TripPlanner.prototype.selectRow = function selectRow(trip, index) {
					this.currentIndex = index;
					this.trip = JSON.parse(JSON.stringify(trip));

					$('#txtStartDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
					$('#txtStartDate').data("DateTimePicker").date(moment(this.trip.startDate));
					$('#txtEndDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
					$('#txtEndDate').data("DateTimePicker").date(moment(this.trip.endDate));

					if (this.trip.reminder) {
						$('#txtReminder').data("DateTimePicker").date(moment(this.trip.reminder));
					}
					this.tripTmp = trip;
				};

				TripPlanner.prototype.cancel = function cancel() {
					if (this.currentIndex) {
						this.trip = JSON.parse(JSON.stringify(this.tripTmp));
						$('#txtStartDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
						$('#txtStartDate').data("DateTimePicker").date(moment(this.trip.startDate));
						$('#txtEndDate').data("DateTimePicker").minDate(moment(this.trip.startDate));
						$('#txtEndDate').data("DateTimePicker").date(moment(this.trip.endDate));
						if (this.trip.reminder) {
							$('#txtReminder').data("DateTimePicker").date(moment(this.trip.reminder));
						} else {
							$('#txtReminder').data("DateTimePicker").date(null);
						}
					} else {
						this.resetData();
					}
				};

				TripPlanner.prototype.getDays = function getDays(t) {
					var cd = 24 * 60 * 60 * 1000,
					    ch = 60 * 60 * 1000,
					    d = Math.floor(t / cd),
					    h = Math.floor((t - d * cd) / ch),
					    m = Math.round((t - d * cd - h * ch) / 60000),
					    pad = function pad(n) {
						return n < 10 ? '0' + n : n;
					};
					if (m === 60) {
						h++;
						m = 0;
					}
					if (h === 24) {
						d++;
						h = 0;
					}
					return d;
				};

				TripPlanner.prototype.save = function save() {
					this.trip.startDate = $('#txtStartDate').data("DateTimePicker").date();
					this.trip.endDate = $('#txtEndDate').data("DateTimePicker").date();
					this.trip.reminder = $('#txtReminder').data("DateTimePicker").date();
					if (this.trip.startDate && this.trip.endDate) {
						this.trip.duration = this.getDays(new Date(this.trip.endDate).getTime() - new Date(this.trip.startDate).getTime());
					}

					if (this.trip.todo.length === 0) {
						this.trip.state = 0;
					} else {
						var state = true;
						for (var item in this.trip.todo) {
							state &= this.trip.todo[item].status;
						}
						this.trip.state = state ? 2 : 1;
					}

					if (this.currentIndex == null) {
						this.trips.push(this.trip);
						this.resetData();
					} else {
						for (var v in this.trip) {
							this.tripTmp[v] = this.trip[v];
						}
					}

					localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
				};

				TripPlanner.prototype.removeArray = function removeArray(arr, arrIndex) {
					return arr.slice(0, arrIndex).concat(arr.slice(arrIndex + 1));
				};

				TripPlanner.prototype.deleteTrip = function deleteTrip() {
					this.trips = this.removeArray(this.trips, this.currentIndex);
					this.resetData();
					localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
				};

				TripPlanner.prototype.openMap = function openMap(tgtLocation) {
					this.dialogService.open({ viewModel: Map, model: tgtLocation }).then(function (response) {
						if (!response.wasCancelled) {} else {}
					});
				};

				TripPlanner.prototype.openWeather = function openWeather(tgtLocation) {
					var selfDialogService = this.dialogService;
					this.geocoder.geocode({ 'address': tgtLocation }, function (results, status) {
						if (status === 'OK') {
							var lat = results[0].geometry.location.lat();
							var lot = results[0].geometry.location.lng();
							selfDialogService.open({ viewModel: Weather, model: { tgtLocation: tgtLocation, lat: lat, lot: lot } }).then(function (response) {
								if (!response.wasCancelled) {} else {}
							});
						} else {
							alert('Geocode was not successful for the following reason: ' + status);
						}
					});
				};

				TripPlanner.prototype.resetData = function resetData() {
					this.currentIndex = null;
					$('#txtStartDate').data("DateTimePicker").minDate(moment());
					$('#txtEndDate').data("DateTimePicker").minDate(moment());
					$('#txtStartDate').data("DateTimePicker").date(moment());
					$('#txtEndDate').data("DateTimePicker").date(moment());
					$('#txtReminder').data("DateTimePicker").date(null);
					$('#txtReminder').data("DateTimePicker").defaultDate(null);
					this.trip = {
						state: 0,
						title: '',
						dest: '',
						category: 'None',
						startDate: '',
						endDate: '',
						duration: 0,
						todo: [],
						reminder: '',
						dismiss: false
					};
				};

				TripPlanner.prototype.todoStatusCheck = function todoStatusCheck(mouseEvent, item) {
					item.status = mouseEvent.target.checked;
					return true;
				};

				return TripPlanner;
			}(), _class.inject = [DialogService], _temp));

			_export('TripPlanner', TripPlanner);
		}
	};
});
//# sourceMappingURL=trip-planner.js.map
