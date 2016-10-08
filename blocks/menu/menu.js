'use strict';

class Menu {
	/**
	 * @constructor
	 * @param  {object} options 
	 * @param {HTMLElement} elem - Элемент формы
	 */
	constructor (options) {
		this.elem = options.elem;
		this.initEvents('click', this.pickItem);
	}

	/**
	 * Ставим обработчик формы
	 * @param  {string} nameEvent - Имя обработчика
	 * @param  {function} handler - Обработчик
	 */
	initEvents (nameEvent, handler) {
		this.elem.addEventListener(nameEvent, handler.bind(this));
	}

	 pickItem (event) {
	 	if ( event.target.classList.contains('menu__item__header') ) {
	 		event.target.nextElementSibling.classList.toggle("pick");
	 	}
	}
}

//export {Menu};