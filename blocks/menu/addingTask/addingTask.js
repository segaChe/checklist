'use strict';
//import {showNotice} from "../note/note.js";

/**Форма для добавления задачи
 * @class Form
 */
class Form {

	/**
	 * @constructor
	 * @param  {object} options 
	 * @param {HTMLElement} elem - Элемент формы
	 */
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
	 * Обработчик события - добавляет задачу к ...
	 * @param  {object} event - объект события
	 */
	onSubmit (event) {
		event.preventDefault();

		if ( this.data.name || this.data.description) {
			this.trigger('add', this.data);
		} else {
			showNotice('Задача не поставлена');
		}

		event.target.reset();
	}

	/**
	 * Геттер для данных формы
	 * @return {object} возвращает данные из формы
	 */
	get data () {
		let nameTask = document.querySelector('#nameTask');
		let descriptionTask = document.querySelector('#descriptionTask');

		return {
			name: nameTask.value,
			description: descriptionTask.value,
			state: 'not'
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

//export {Form};