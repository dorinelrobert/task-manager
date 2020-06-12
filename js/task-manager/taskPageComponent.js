export function taskPageComponent(
    task, 
    createdDate,
    nav,
    completed,
    mobileTabNav,
    titleForm,
    descForm,
    timeLimit,
    setTimeLimit,
    timeTotal,
    addSession,
    sessionContainer
){
    let taskpage, head, body, sidebar, sidebar_section;
    
    taskpage = document.createElement('div');
    taskpage.className = 'taskpage modal__content';
    if(task.isCompleted()){
        taskpage.classList.add('taskpage--completed');
    }

        head = document.createElement('div');
        head.className = 'taskpage__head';

            head.appendChild(createdDate);
            head.appendChild(nav);

        taskpage.appendChild(head);

        if(task.isCompleted()){
            taskpage.appendChild(completed);
        }

        taskpage.appendChild(mobileTabNav);

        body = document.createElement('div');
        body.className = 'taskpage__body mobile-panel mobile-panel--visible';
        body.id = 'details'

            body.appendChild(titleForm);
            body.appendChild(descForm);

        taskpage.appendChild(body);

        sidebar = document.createElement('div');
        sidebar.className = 'taskpage__sidebar mobile-panel';
        sidebar.id = 'time-tracking';

            if( !task.isCompleted() ){
                sidebar_section = document.createElement('div');
                sidebar_section.className = 'taskpage__sidebar-section';

                    if(task.time_limit){
                        sidebar_section.appendChild(timeLimit);
                    } else {
                        sidebar_section.appendChild(setTimeLimit);
                    }

                sidebar.appendChild(sidebar_section);
            }

            sidebar_section = document.createElement('div');
            sidebar_section.className = 'taskpage__sidebar-section';
            
                sidebar_section.appendChild(timeTotal);
                
                if( !task.isCompleted() ){
                    sidebar_section.appendChild(addSession);
                    sidebar_section.appendChild(sessionContainer);
                }

            sidebar.appendChild(sidebar_section);
            

        taskpage.appendChild(sidebar);

    return taskpage;
}

