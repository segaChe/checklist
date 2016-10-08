'use strict';

function formatDate(date) {
	//TODO полиморфный прием данных
	let _date = new Date(Date.parse(date));
	let _dateNow = new Date();
	let rezult = '';

	let d1 = '' + _date.getFullYear() + _date.getMonth() + _date.getDate();
	let d2 = '' + _dateNow.getFullYear() + _dateNow.getMonth() + _dateNow.getDate();

	if ( d1 === d2 ) {
		rezult = 'сегодня';
	} else {
		rezult = _date.toLocaleString("ru", {month: 'long', year: 'numeric', day: 'numeric'});
	}
	console.log(d1 + d2);
	return rezult;
}