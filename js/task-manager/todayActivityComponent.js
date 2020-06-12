import { formatMinutes } from './utils.js';

export function todayActivityComponent(tasksToday, openPageHandler){
    let activity, activity_head, activity_body, h2, h3, taskList, todaytotal = 0;

    if(tasksToday.length){

        taskList = document.createDocumentFragment();
        
        for(let task of tasksToday){
            let item, info, time, h5, h4;
        
            item = document.createElement('div');
            item.className = 'activity-item';
            item.setAttribute('data-taskid', task.id);
            item.setAttribute('tabindex', '0');
        
                info = document.createElement('div');
                info.className = 'activity-item__info';
        
                    h5 = document.createElement('h5');
                    h5.textContent = task.status;
                    info.appendChild(h5);

                    h4 = document.createElement('h4');
                    h4.textContent = task.title.length > 27 ? task.title.substring(0, 27) + '...' : task.title;
                    info.appendChild(h4);
        
                item.appendChild(info);
        
                time = document.createElement('div');
                time.className = 'activity-item__time';
                time.textContent = formatMinutes(task.task_total_today);
                item.appendChild(time);

            item.addEventListener('click', function(){
                openPageHandler(task);
            });

            taskList.appendChild(item);

            todaytotal += task.task_total_today;
            
        }
    } else {
        taskList = document.createElement('span');
        taskList.textContent = 'No activity today';
    }

    activity = document.createElement('div');
    activity.className = 'activity';

        activity_head = document.createElement('div');
        activity_head.className = 'activity__head';

            h2 = document.createElement('h2')
            h2.textContent = 'Today Total Session';
            activity_head.appendChild(h2);

            h3 = document.createElement('h3');
            h3.textContent = formatMinutes(todaytotal);
            activity_head.appendChild(h3);

        activity.appendChild(activity_head);

        activity_body = document.createElement('div');
        activity_body.className = 'activity__body';
            
            activity_body.appendChild(taskList);
        
        activity.appendChild(activity_body);

    return activity;

}