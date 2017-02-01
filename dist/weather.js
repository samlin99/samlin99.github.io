System.register(["aurelia-dialog", "aurelia-framework"], function (_export, _context) {
		"use strict";

		var DialogController, bindable, _class, _temp, Weather;

		function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
						throw new TypeError("Cannot call a class as a function");
				}
		}

		return {
				setters: [function (_aureliaDialog) {
						DialogController = _aureliaDialog.DialogController;
				}, function (_aureliaFramework) {
						bindable = _aureliaFramework.bindable;
				}],
				execute: function () {
						_export("Weather", Weather = (_temp = _class = function () {
								function Weather(controller) {
										_classCallCheck(this, Weather);

										this.tgtLocation = "";

										this.controller = controller;
										this.controller.settings.lock = false;
								}

								Weather.prototype.activate = function activate(_ref) {
										var tgtLocation = _ref.tgtLocation,
										    lat = _ref.lat,
										    lot = _ref.lot;

										this.tgtLocation = tgtLocation;
										this.lat = lat;
										this.lot = lot;
								};

								return Weather;
						}(), _class.inject = [DialogController], _temp));

						_export("Weather", Weather);
				}
		};
});
//# sourceMappingURL=weather.js.map
