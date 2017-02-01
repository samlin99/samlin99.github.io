System.register(['aurelia-framework', 'aurelia-dialog', './map', './weather'], function (_export, _context) {
	"use strict";

	var bindable, DialogService, Map, Weather, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp, TripPlanner;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
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
		}],
		execute: function () {
			_export('TripPlanner', TripPlanner = (_class = (_temp = _class2 = function () {
				function TripPlanner(dialogService) {
					_classCallCheck(this, TripPlanner);

					this.currentIndex = null;

					_initDefineProp(this, 'tripTmp', _descriptor, this);

					_initDefineProp(this, 'trip', _descriptor2, this);

					_initDefineProp(this, 'trips', _descriptor3, this);

					this.filters = [{ value: '', keys: ['title', 'dest', 'todo'] }];

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
					$.each(['#txtStartDate', '#txtEndDate', '#txtReminder'], function (index, value) {
						$(value).datepicker({
							autoclose: true,
							todayHighlight: true
						});
					});
				};

				TripPlanner.prototype.addTodo = function addTodo(e) {
					if (e.keyCode == 13 && this.txtTodo.value) {
						this.trip.todo.push(this.txtTodo.value);
						this.txtTodo.value = '';
					}
					return true;
				};

				TripPlanner.prototype.removeTodo = function removeTodo(i) {
					this.trip.todo = this.removeArray(this.trip.todo, i);
				};

				TripPlanner.prototype.selectRow = function selectRow(trip, index) {
					console.log(trip.startDate);
					this.currentIndex = index;
					this.trip = JSON.parse(JSON.stringify(trip));
					this.tripTmp = trip;
					var tmpTrip = this.trip;
					$.each(['#txtStartDate', '#txtEndDate', '#txtReminder'], function (i, value) {
						$(value).on("changeDate", function (val) {
							if (i == 0) {
								tmpTrip.startDate = this.value;
								console.log(tmpTrip.startDate);
							} else if (i == 1) {
								tmpTrip.endDate = this.value;
							} else {
								tmpTrip.reminder = this.value;
							}
						});
					});
				};

				TripPlanner.prototype.cancel = function cancel() {
					this.trip = JSON.parse(JSON.stringify(this.tripTmp));
				};

				TripPlanner.prototype.save = function save() {
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
					this.trip = { title: '',
						dest: '',
						startDate: '',
						category: '',
						endDate: '',
						todo: [],
						reminder: ''
					};;
				};

				return TripPlanner;
			}(), _class2.inject = [DialogService], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'tripTmp', [bindable], {
				enumerable: true,
				initializer: null
			}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'trip', [bindable], {
				enumerable: true,
				initializer: function initializer() {
					return {
						title: '',
						dest: '',
						category: '',
						startDate: '',
						endDate: '',
						todo: [],
						reminder: ''
					};
				}
			}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'trips', [bindable], {
				enumerable: true,
				initializer: function initializer() {
					return [];
				}
			})), _class));

			_export('TripPlanner', TripPlanner);
		}
	};
});
//# sourceMappingURL=trip-planner.js.map