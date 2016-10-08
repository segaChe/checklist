'use strict';

//import {AuthForm} from "./authForm";

class RegForm extends AuthForm {
	constructor(options) {
		super(options);
	}

	get data () {
		return {
			email: document.getElementById('email_reg').value,
			password: document.getElementById('password_reg').value,
			password_2: document.getElementById('password_reg2').value
		};
	}
}

//export {RegForm};
