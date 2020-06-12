export function navComponent(status, completeHandler, deleteHandler, closeHandler){
    let nav, navItem, dropdown, button, dropdown_menu, ul, li, a;

    nav = document.createElement('ul');
    nav.className = 'taskpage__nav';

        // nav item
        navItem = document.createElement('li')
        navItem.className = 'taskpage__nav-item';

            // dropdown
            dropdown = document.createElement('div');
            dropdown.className = 'dropdown';

                //button
                button = document.createElement('button');
                button.className = 'btn dropdown__toggle';
                button.setAttribute('type', 'button');
                button.innerHTML = `<span class="icon-more"></span>`;
                dropdown.appendChild(button);

                // dropdown__menu
                dropdown_menu = document.createElement('div');
                dropdown_menu.className = 'dropdown__menu';

                    // ul
                    ul = document.createElement('ul');
                        
                        // li
                        li = document.createElement('li');

                            // a
                            a = document.createElement('a');
                            a.setAttribute('tabindex', '0');
                            a.addEventListener('click', function(event){
                                event.preventDefault();

                                completeHandler();         

                            });
                            if(status !== 'completed'){
                                a.innerHTML = `<span class="icon-check-empty"></span> Complete`;
                            } else {
                                a.innerHTML = `<span class="icon-out"></span> Restore`;
                            }
                            
                            li.appendChild(a);
                        
                        ul.appendChild(li);
                        
                        //li
                        li = document.createElement('li');
                            
                            // a
                            a = document.createElement('a');
                            a.setAttribute('tabindex', '0');
                            a.addEventListener('click', function(event){
                                event.preventDefault();

                                deleteHandler();

                            });
                            a.innerHTML = `<span class="icon-trash"></span> Delete this task`;
                            li.appendChild(a);
                        
                        ul.appendChild(li);
                
                    dropdown_menu.appendChild(ul);
                
                dropdown.appendChild(dropdown_menu);
            
            navItem.appendChild(dropdown);

        nav.appendChild(navItem);

        // nav item
        navItem = document.createElement('li');
        navItem.className = 'taskpage__nav-item';
               
            // button
            button = document.createElement('button');
            button.className = 'btn';
            button.setAttribute('type', 'button');
            button.addEventListener('click', function(event){
                event.preventDefault();

                closeHandler();
            });
            button.innerHTML = `<span class="icon-close"></span>`;
            navItem.appendChild(button);
        
        nav.appendChild(navItem);

        return nav;

}