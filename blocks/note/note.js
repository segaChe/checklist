'use strict';

/**
	 * Показывает и скрывает сообщение
	 * @param  {string} text текст о том что было сделано
	 */
function showNotice (text) {

	let noticeElem = document.querySelector('.notice');

	noticeElem.innerHTML = text;
	noticeElem.hidden = false;

	setTimeout( function () {noticeElem.hidden = true;}, 1500);
}

//export {showNotice};