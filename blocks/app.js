'use strict';

// import {showNotice} from "./note/note.js";
// import Menu from "./menu/menu.js";
// import {Form} from "./menu/addingTask/addingTask.js";
// import {Calendar} from "./menu/calendar/calendar.js";
// import {Tasks} from "./tasks/tasks.js";
// import {Model} from "./model/model.js";
// import {Signout} from "./user/signout.js";

let BASE_URL;

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		if (user !== null) {
			let _ID = user.uid,
				email = user.email;

			BASE_URL = 'https://checklist-6c8c4.firebaseio.com/users/' + _ID + '/';

			let emailElem = document.querySelector('.user__email');
			emailElem.innerHTML = email;
//		
//   Модули
//
		//создаем модуль для задач
		let tasks = new Tasks({
			data: [],
			elem: document.querySelector('.task__container'),
			tmpl: '#newTask'
		});
		
		//создаем модуль для меню
		let menu = new Menu({
			elem: document.querySelector('.menu')
		});
		
		//создаем модуль для формы
		let form = new Form({
			elem: document.querySelector('.menu__form')
		});
		
		//Создаем модуль Календарь
		let calendar = new Calendar({
			elem: document.querySelector('.menu__calendar_wrap'),
		});
		
		//создаем модуль для запросов на сервер
		let model = new Model({
			data: {},
			date: calendar.formatDate(calendar.date),
			url: BASE_URL
		});
		
		calendar.elem.parentNode.addEventListener('loadTasks', function (event) {
			let headerDate = document.querySelector('.header__date');
			headerDate.innerHTML = formatDate(event.detail);
			
			model.date = event.detail;
			model.fetch(model.date, tasks.render.bind(tasks));
		});
		
		//добавляем новую задачу 
		form.elem.addEventListener('add', function (event) {
			tasks.addTask(event.detail);
			tasks._sort(tasks.data);
			tasks.render(tasks.data);
			model.save(model.date, tasks.data);
			showNotice("Задача ждет решения");
		});
		
		//Удаляем задачу 
		tasks.elem.addEventListener('delete', function (event) {
			tasks.deleteTask(event.detail);
			model.save(model.date, tasks.data);
			showNotice("Задача удалена");
		});
		
		//Изменяем состояние задачи и переносим выполненную вниз списка
		tasks.elem.addEventListener('changeState', function (event) {
			tasks.changeState(event.detail);
			tasks._sort(tasks.data);
			tasks.render(tasks.data);
			model.save(model.date, tasks.data);
			showNotice("Задача решена");
		});
		
		//Загружаем задачи
		model.fetch(model.date, tasks.render.bind(tasks));

		}

	} else {
		console.log('no user');
	}
});

//Выход
let signout = new Signout();