export function logoutComponent(logoutHandler){
    let logout = document.createElement('button');
    logout.className = "btn";
    logout.innerHTML = '<span class="icon-out"></span> <span class="text">Log Out</a>';
    logout.addEventListener('click', event => {
        event.preventDefault();

        logoutHandler();
    });

    return logout;
}