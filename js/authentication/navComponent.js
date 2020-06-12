import { userComponent } from './userComponent.js';
import { logoutComponent } from './logoutComponent.js';

export function navComponent(username, logoutHandler){
    let nav, nav_item;

    nav = document.createElement('ul');
        
        nav_item = document.createElement('li');
        
            nav_item.appendChild(userComponent(username));

        nav.appendChild(nav_item);

	    nav_item = document.createElement('li');
			
		    nav_item.appendChild(logoutComponent(logoutHandler));

        nav.appendChild(nav_item);

    return nav;
}