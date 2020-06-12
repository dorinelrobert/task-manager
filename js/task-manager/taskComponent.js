export function taskComponent(task, openPageHandler){
    let taskEl, task_title;

    taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.setAttribute("id", task.id);
    taskEl.setAttribute("tabindex", '0');
    
    if(task.isCompleted()){        
        taskEl.classList.add('task--completed');
        taskEl.innerHTML = '<div class="task__head"><span class="icon-check-round"></span> Completed</div>';
    
    } else {
        if( task.time_limit > 0 && task.getTotalSession() > task.time_limit ){
            taskEl.classList.add('task--overdue');
            taskEl.innerHTML = `<div class="task__head"><span class="icon-calendar"></span> Overdue</div>`;
        }
    }
    
    task_title = document.createElement('div');
    task_title.className = 'task__title';
    task_title.textContent = task.title;
    taskEl.appendChild(task_title);

    taskEl.addEventListener('click', function(){
        openPageHandler(task);
    });
    
    taskEl.addEventListener('keypress', function(){
        if(event.keyCode === 13){
            openPageHandler(task);
        }
    });
    
    return taskEl;
}