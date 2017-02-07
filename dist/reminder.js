System.register(["aurelia-dialog"], function (_export, _context) {
	"use strict";

	var DialogController, _class, _temp, Reminder;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaDialog) {
			DialogController = _aureliaDialog.DialogController;
		}],
		execute: function () {
			_export("Reminder", Reminder = (_temp = _class = function () {
				function Reminder(controller) {
					_classCallCheck(this, Reminder);

					this.trips = [];
					this.dismissAry = [];

					this.controller = controller;
					this.controller.settings.lock = false;
				}

				Reminder.prototype.activate = function activate(_ref) {
					var indexAry = _ref.indexAry,
					    localTrips = _ref.localTrips;

					this.trips = localTrips;
					this.indexAry = indexAry;
				};

				Reminder.prototype.addRemoveDismiss = function addRemoveDismiss(i, evt) {
					if (evt.target.checked) {
						this.dismissAry.push(i);
					} else {
						this.dismissAry.pop(i);
					}
					return true;
				};

				Reminder.prototype.dismiss = function dismiss() {
					var _this = this;

					this.dismissAry.forEach(function (i) {
						_this.trips[i].dismiss = true;
					});

					localStorage.setItem("tripPlannerData", JSON.stringify(this.trips));
					this.controller.cancel();
				};

				return Reminder;
			}(), _class.inject = [DialogController], _temp));

			_export("Reminder", Reminder);
		}
	};
});
//# sourceMappingURL=reminder.js.map
