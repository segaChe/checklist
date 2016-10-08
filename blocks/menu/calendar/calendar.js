'use strict';
/**
 * class Calendar
 */
class Calendar {

	/**
	 * @constructor 
	 * @param  {object} options [description]
	 * @param {HTMLElement} options.elem - Елемент на страници, в который вставляем календарь
	 */
	constructor (options) {
		this.elem = options.elem;
		this.date = this.defineCurrentDate();

		this.createCalendar();
		this.initEvents('click', this.changeDate);
	}

	/**
	 * Ставим обработчик события
	 * @param  {string} nameEvent - Название обработчика
	 * @param  {Function} handler - Функция-обработчик
	 */
	initEvents(nameEvent, handler) {
		this.elem.parentNode.addEventListener(nameEvent, handler.bind(this));
	}

	/**
	 * Обработчик календаря (меняет месяц, выбирает дату с задачами и отображает их)
	 * @param  {object} event - Объект события
	 */
	changeDate(event) {
		let target = event.target;

		if ( target.classList.contains('menu__calendar__arrow_left') ) {
			this.date.setMonth(this.date.getMonth() - 1);
			this.createCalendar();
		}

		if ( target.classList.contains('menu__calendar__arrow_right') ) {
			this.date.setMonth(this.date.getMonth() + 1);
			this.createCalendar();
		}

		if ( target.classList.contains('menu__calendar__date') ) {
			
			this.trigger('loadTasks', target.dataset.date);
		}
	}

	/**
	 * Создаем календарь на месяц
	 */
	createCalendar () {
		//Текущая дата
		const DATE = new Date();
		//Дата установленного месяца, которую будем увеличивать с 1 числа
      	let date = new Date(this.date);
      	date.setDate(1);

      	//Устанавливаем месяц для сравнения, 
      	let date2 = new Date(this.date),
      		mon = date2.getMonth(),
      		//Устанавливаем месяц и год для вывода
      		monthName = date2.toLocaleString("ru", {month: 'long'}),
      		year = date2.toLocaleString("ru", {year: 'numeric'});

      	let table ='<span>' + monthName + ' ' + year + '</span><table>' +
      	'<tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

      	// заполнить первый ряд от понедельника
      	// * * * | 1  2  3  4
      	for (let i = 0; i < this.getDay(date); i++) {
        	table += '<td></td>';
      	}

      	// ячейки календаря с датами
      	while (date.getMonth() == mon) {

      		let dataDate = this.formatDate(date);

      		if (date.getMonth() === DATE.getMonth() && date.getDate() === DATE.getDate()) {
      			//для выделения текущей даты
      			table += '<td class="menu__calendar__date button now" data-date="' + 
      			dataDate + '">' + date.getDate() + '</td>';
      		} else {
        		table += '<td class="menu__calendar__date button" data-date="' + 
        		dataDate + '">' + date.getDate() + '</td>';
        	}

        	if (this.getDay(date) % 7 == 6) { // вс, последний день - перевод строки
          	table += '</tr><tr>';
        	}

        	date.setDate(date.getDate() + 1);
      	}

      	// добить таблицу пустыми ячейками, если нужно
      	if (this.getDay(date) !== 0) {
        	for (let i = this.getDay(date); i < 7; i++) {
          		table += '<td></td>';
        	}
      	}

      	// закрыть таблицу
      	table += '</tr></table>';

      	//присваивание innerHTML
      	this.elem.innerHTML = table;
	}

	/**
	 * Устанавливаем день недели
	 * @param  {object} date [description]
	 * @return {number} номер дня недели
	 */
	getDay(date) {
		let day = date.getDay();
		if (day === 0) day = 7;
		return day - 1;
	}

	/**
	 * Определяем текущую дату
	 */
	defineCurrentDate () {
		let date = Date.now();
		return new Date(date);
	}

	/**
	 * Форматируем тату 
	 * @param  {object} date - объект Date
	 * @return {string} Дата в формате 'yyyy-mm-dd'
	 */
	formatDate (date) {
		let _date;

		if ( typeof date === 'object') {
			_date = date;
		}

		let day = _date.getDate(),
			month = _date.getMonth() + 1,
			year = _date.getFullYear(),
			rezult = '';

		if (month < 10) month = '0' + month;
		if (day < 10) day = '0' + day;

		return rezult += year + '-' + month + '-' + day; 
	}

	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});
		this.elem.parentNode.dispatchEvent(widgetEvent);
	}
}

//export {Calendar};