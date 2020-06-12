export function mobileTabNav(openPanelOnMobile){
    let mobile_tab_nav, button;

    mobile_tab_nav = document.createElement('div');
    mobile_tab_nav.className = 'mobile-tab-nav';

        button = document.createElement('button');
        button.className = 'btn mobile-tab-nav__btn mobile-tab-nav__btn--active';
        button.setAttribute('type', 'button');
        button.setAttribute('data-panel', 'details');
        button.textContent = 'Task Info';

        button.addEventListener('click', function(){
            openPanelOnMobile(this);
        });

        mobile_tab_nav.appendChild(button);

        button = document.createElement('button');
        button.className = 'btn mobile-tab-nav__btn';
        button.setAttribute('type', 'button');
        button.setAttribute('data-panel', 'time-tracking');
        button.textContent = 'Time Tacking';
        
        button.addEventListener('click', function(){
            openPanelOnMobile(this);
        });
        
        mobile_tab_nav.appendChild(button);

    return mobile_tab_nav;
}