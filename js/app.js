import { Authentication } from './authentication/Authentication.js';
import { TaskManager } from './task-manager/TaskManager.js';
import { DropDown } from './dropdown.js';

// dropdown
let dropdown = new DropDown();


// login
let auth = new Authentication();

let authForm = document.forms['auth-form'];

if(authForm){
    authForm.addEventListener('submit', function(event){
        event.preventDefault();
    
        auth.login(this.username.value, this.password.value);
    });
}


// taskmanager
if(auth.isLoggedIn()){
    let taskmanager = new TaskManager(auth.getUserData().username);
}

