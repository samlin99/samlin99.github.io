import moment from 'moment';

/*
Purpose: this is utility function which can be use in HTML template. This function will help to convert date/time value into right format. 
Params: value for datetime string format
*/
export class DateFormatValueConverter {
  toView(value) {
		if (value) {
			return moment(value).format('MM/DD/YYYY hh:mm A');
		}
		return '';
  }
}

/*
Purpose: this is utility function which can be use in HTML template. This function will help to translate state value into meaningful string. 
Params: value for datetime string format
*/
export class StateFormatValueConverter {
  toView(value) {
		if(value === 2) {
			return 'Ready';
		} else if(value === 1) {
			return 'In Progress';
		} else {
			return 'Created';
		}
  }
}
