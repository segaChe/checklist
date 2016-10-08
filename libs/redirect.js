'use strict';

function redirect () {
		document.location.href = 'main.html';
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		redirect();
	} else {
		console.log('no user');
	}
});