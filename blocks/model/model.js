'use strict';

class Model {

	constructor (options) {
		this.data = options.data;
		this.date = options.date;
		this.url = options.url;
		//TODO: authentication
	}

	/**
	 * Получает данные с сервера и БД
	 * @param  {string} date дата в формате 'гггг-мм-чч', за какое число получить данные
	 * @param  {function} resolve функция обратного вызова для обработки полученных данных
	 */
	fetch (date, resolve) {
		let req = this._makeRequest('GET', date, function(xhr) {
			let data = JSON.parse(xhr.responseText);
			
			if (data) {
				resolve(data.tasks);
			} else {
				data = {};
				data.tasks = [];
				resolve(data.tasks);
			}
		});

		req.send();
	}

	/**
	 * Сохраняет данные на сервер
	 * @param  {string} date дата в формате 'гггг-мм-чч'
	 * @param  {object} data данные о задаче
	 */
	save (date, data) {
		let req = this._makeRequest('PUT', date, function(xhr) {
			//console.log(xhr.responseText);
		});

		this.data.tasks = data;

		let body = JSON.stringify(this.data);
		req.send(body);
	}

	/**
	 * [_makeRequest description]
	 * @param  {string} method формат запроса
	 * @param  {string} date дата в формате 'гггг-мм-чч'
	 * @param  {function} callbackFunc функция обратного вызова
	 */
	_makeRequest (method, date, callbackFunc) {
		let xhr = new XMLHttpRequest();

		let url = this._getUserURL(date);

		xhr.open(method, url);

		xhr.onreadystatechange = function() {
			if (xhr.readyState !== 4) return;

			if (xhr.status !== 200) {
				alert(xhr.status + ':' + xhr.statusText);
			} else {
				callbackFunc(xhr);
			}
		};

		return xhr;
	}

	/**
	 * получить URL пользователя
	 * @param  {string} date дата в формате 'гггг-мм-чч'
	 * @return {string} url пользователя с учетом даты, на которую поступал запрос
	 */
	_getUserURL (date) {
		let url = this.url + date + '.json';
		return url; 
	}
}

//export {Model};