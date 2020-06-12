import { formatMinutes } from './utils.js';

export function sessionComponent(session, deleteHandler){
    let item, span, button; 
    
    item = document.createElement('li');
    item.className = 'sessions__item';
    item.id = session.id;
    item.innerText = formatMinutes(session.time);

        span = document.createElement('span');
        span.innerText = session.date;
        item.appendChild(span);

        button = document.createElement('button');
        button.className = 'sessions__del';
        button.setAttribute('type', 'button');
        button.innerHTML = '<span class="icon-close"></span>';
        button.addEventListener('click', function(event){
            event.preventDefault();
            deleteHandler(item);
        });
        item.appendChild(button);

    return item;

}

export function sessionContainerComponent(sessions, deleteHandler){
    let sessionsContainer, sessionList;

    sessionsContainer = document.createElement('div');
    sessionsContainer.className = 'sessions';

    sessions.sort( (a, b) => {
        return (a.id * 1) < (b.id * 1) ? 1 : -1;
    });

        sessionList = document.createElement('ul');

            for(let item of sessions ){
                sessionList.appendChild(sessionComponent(item, deleteHandler));
            }
        
        sessionsContainer.appendChild(sessionList);

    return sessionsContainer;
}