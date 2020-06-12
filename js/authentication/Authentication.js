import { navComponent } from './navComponent.js';
import { errorsComponent } from './errorsComponent.js';

export function Authentication(loginPath, homePath){
	this.loginPath = loginPath || '/login.html';
	this.homePath = homePath || '/index.html';

	this.init();
}

Authentication.prototype = (function(){

	let userData;
	let errors = [];

	const DOM = {
		errorContainer: document.getElementById('js-auth-errors'),
		authNavContainer: document.getElementById('js-auth-nav')
	}
	
	function displayErrors(){
		DOM.errorContainer.innerHTML = errorsComponent(errors);
	}

	function logout(){
		localStorage.removeItem('userData');
		userData = null;
		if(location.pathname !== this.loginPath){
			location.replace(this.loginPath);
		}
	}

	function login(username, password){
		
		if(userData){
			throw new Error('An user is already logged in. Please logout.');
		}

		fetch('/users.json')
		.then(response => response.json())
		.then(data => {
		
			userData = data.find( item => {
				return item.username === username && item.password === password 
			});

			if(userData){
				localStorage.setItem('userData', JSON.stringify(userData));
				if(location.pathname === this.loginPath){
					location.replace(this.homePath);
				}
			} else {
				errors.push('Login Failed');
				displayErrors();
			}
			
		})
		.catch(error => {
			errors.push('Login Failed');
			displayErrors();
		});

	}

	function getUserData(){
		return userData;
	}

	function isLoggedIn(){
		return !!userData;
	}

	function init(){
		try{
			userData = JSON.parse(localStorage.getItem('userData'));
		} catch (error) {
			userData = null;
		}
		
		if( !userData ){
			logout.call(this);
		} else {
			if(location.pathname === this.loginPath){
				location.replace(this.homePath);
			}

			DOM.authNavContainer.appendChild(navComponent(userData.username, logout.bind(this)));
		}
		
		
	}

	return {
		login: login,
		getUserData: getUserData,
		isLoggedIn: isLoggedIn,
		init: init
	}

})();

