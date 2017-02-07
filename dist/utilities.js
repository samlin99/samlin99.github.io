System.register(['moment'], function (_export, _context) {
	"use strict";

	var moment, DateFormatValueConverter, StateFormatValueConverter;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_moment) {
			moment = _moment.default;
		}],
		execute: function () {
			_export('DateFormatValueConverter', DateFormatValueConverter = function () {
				function DateFormatValueConverter() {
					_classCallCheck(this, DateFormatValueConverter);
				}

				DateFormatValueConverter.prototype.toView = function toView(value) {
					if (value) {
						return moment(value).format('MM/DD/YYYY hh:mm A');
					}
					return '';
				};

				return DateFormatValueConverter;
			}());

			_export('DateFormatValueConverter', DateFormatValueConverter);

			_export('StateFormatValueConverter', StateFormatValueConverter = function () {
				function StateFormatValueConverter() {
					_classCallCheck(this, StateFormatValueConverter);
				}

				StateFormatValueConverter.prototype.toView = function toView(value) {
					if (value === 2) {
						return 'Ready';
					} else if (value === 1) {
						return 'In Progress';
					} else {
						return 'Created';
					}
				};

				return StateFormatValueConverter;
			}());

			_export('StateFormatValueConverter', StateFormatValueConverter);
		}
	};
});
//# sourceMappingURL=utilities.js.map
