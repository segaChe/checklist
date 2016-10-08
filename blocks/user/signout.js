'use strict';

class Signout {
	constructor() {
		this.elem = document.querySelector('.user__signout');
		this.initEvents('click', this.exit);
	}

	/**
	 * Ставим обработчик формы
	 * @param  {string} nameEvent - Имя обработчика
	 * @param  {function} handler - Обработчик
	 */
	initEvents (nameEvent, handler) {
		this.elem.addEventListener(nameEvent, handler.bind(this));
	}

	exit () {
		if (firebase.auth().currentUser) {
         	// [START signout]
         	firebase.auth().signOut();
        	// [END signout]
    	}

    	document.location.href = 'index.html';
	} 
}

//export {Signout};