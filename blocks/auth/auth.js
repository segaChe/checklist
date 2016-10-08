'use strict';
// import {AuthForm} from "./authForm";
// import {RegForm} from "./regForm";

let regForm = new RegForm({
	elem: document.querySelector('.regForm')
	});

let authForm = new AuthForm({
	elem: document.querySelector('.authForm')
});

regForm.elem.addEventListener('entry', function(event) {
	firebase.auth().createUserWithEmailAndPassword(event.detail.email, 
		event.detail.password).catch(function(error) {
			// Handle Errors here.
        	var errorCode = error.code;
        	var errorMessage = error.message;
        	// [START_EXCLUDE]
        	if (errorCode == 'auth/weak-password') {
        	  alert('The password is too weak.');
        	} else {
        	  alert(errorMessage);
        	}
        	console.log(error);
        	// [END_EXCLUDE]
    });
});

authForm.elem.addEventListener('entry', function(event) {
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(event.detail.email, 
    	event.detail.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      
      // [END_EXCLUDE]
    });

	if (firebase.auth().currentUser) {
    
    	redirect();
	} 
});