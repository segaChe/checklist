'use strict';

/**
 * @class Task
 */
class Tasks {

	/**
	 * @constructor 
	 * @param  {object} options - Объект с данными:
	 * @param {object} data - Данные для шаблона
	 * @param {HTMLElement} element - Елемент на странице, который служит контейнером для задач
	 * @param {string} tmpl - селектор id шаблона
	 */
	constructor (options) {
		this.data = options.data;
		this.elem = options.elem;
		this._tmpl = document.querySelector(options.tmpl).innerHTML;

		this.render(this.data);
		this.initEvents('click', this._click);
	}

	/**
	 * Выводим на страницу все задачи
	 * @param  {Array} data массив задач
	 */
	render (data) {
		this.data = data;
		this.elem.innerHTML = '';

		if (this.data.length) {
			for (let i = 0; i < this.data.length; i++) {
				this.renderTask(this.data[i], i);
			}
		}
	}

	/**
	 * Выводим на страницу одну задачу
	 * @param  {object} task данные задачи (имя, описание, статус)
	 * @param {number} i index
	 */
	renderTask (task, i) {
		let container = document.createElement('div');
		let iter = '' + i;
		container.setAttribute('data-index', iter);
		container.classList.add('newTask');
		container.innerHTML = TemplateEngine(this._tmpl, task);
		this.elem.appendChild( container );
		
	}

	/**
	 * Добавляем в массив задач новую задачу
	 * @param  {object} task данные задачи (имя, описание, статус) 
	 */
	addTask (task) {
		this.data.push(task);
		this.render(this.data);
	}

	/**
	 * Ставит обработчик события
	 * @param  {[type]} nameEvent [description]
	 * @param  {[type]} handler   [description]
	 */
	initEvents (nameEvent, handler) {
		this.elem.addEventListener(nameEvent, handler.bind(this));
	}

	/**
	 * Обработчик для Tasks
	 * @param  {object} event Объект события
	 */
	_click (event) {
		let target = event.target;

		if ( target.classList.contains('newTask__ok') ) {
			this.trigger('changeState', target);
		}

		if ( target.classList.contains('newTask__delete') ) {
			//this.deleteTask(target);
			this.trigger('delete', target);
		}
	}

	/**
	 * Удаление задачи
	 * @param  {HTMLElement} elem - целевой элемент
	 */
	deleteTask (elem) {
		let indexTask = parseInt(elem.parentNode.dataset.index, 10);

		this.data = this.data.filter((elem, index) => {
			return index !== indexTask;
		});

		this.render(this.data);
	}

	/**
	 * Изменение состояния задачи
	 * @param  {HTMLElement} elem - целевой элемент
	 */
	changeState (elem) {
		let indexTask = parseInt(elem.parentNode.dataset.index, 10);

		for (let i = 0; i < this.data.length; i++) {
			if ( i === indexTask) {
				this.data[i].state = 'done';
			}
		}

		this.render(this.data);
	}

	_sort (data) {
		data.sort(function(a, b) {
			if (a.state < b.state) return 1;
			if (a.state > b.state) return -1;
		});
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

//export {Tasks};