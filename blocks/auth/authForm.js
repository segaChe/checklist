'use strict';

class AuthForm {

	constructor (options) {
		this.elem = options.elem;
		this.initEvents('submit', this.onSubmit);
	}

	/**
	 * Ставим обработчик формы
	 * @param  {string} nameEvent - Имя обработчика
	 * @param  {function} handler - Обработчик
	 */
	initEvents (nameEvent, handler) {
		this.elem.addEventListener(nameEvent, handler.bind(this));
	}

	/**
	 * Обработчик события - 
	 * @param  {object} event - объект события
	 */
	onSubmit (event) {
		event.preventDefault();
		this.trigger('entry', this.data);
	}

	/**
	 * Геттер для данных формы
	 * @return {object} возвращает введенные в форму данные
	 */
	get data () {
		return {
			email: document.getElementById('email_auth').value,
			password: document.getElementById('password_auth').value,
			// password_2: document.getElementById('password2').value
		};
	}

	/**
	 * [trigger description]
	 * @param  {[type]} name [description]
	 * @param  {[type]} data [description]
	 */
	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});
		this.elem.dispatchEvent(widgetEvent);
	}

}

//export {AuthForm};