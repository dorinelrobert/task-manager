import { addTaskFormComponent } from './addTaskFormComponent.js';
import { todayActivityComponent } from './todayActivityComponent.js';

import { getDateTime, getDate, formatMinutes } from './utils.js';

import { Task } from './Task_module.js';
import { TaskPage } from './TaskPage_module.js';





export function TaskManager(username){
    this.username = username;

    this.init();
}
TaskManager.prototype = (function(){

    let tasks = [];
    let currentTask = null;
    let taskPage = null;

    const DOM = {
        taskForm:           document.getElementById('js-task-add'),
        taskList:           document.getElementById('js-task-list'),
        taskPageContainer:  document.getElementById('js-taskpage'),
        btnActivity:        document.getElementById('js-btn-activity'),
        todayActivity:      document.getElementById('js-today-activity')
    }
    
    // Storage functions
    function getAllTaks(){
        tasks = JSON.parse(localStorage.getItem(this.username)) || [];
        tasks = tasks.map(item => {
            return new Task(item);
        });
        tasks = tasks.sort( (a, b) => {
            return (a.id * 1) < (b.id * 1) ? 1 : -1;
        });
        return tasks;
    }

    function addTask(task){
        tasks.unshift(task);
        localStorage.setItem(this.username, JSON.stringify(tasks));
    }

    function getTask(id){
        return tasks.find(item => {
            return item.id === id;
        });
    }

    function updateTask(task){
        for(let index in tasks){
            if(tasks[index].id === task.id){
                tasks[index] = task;
                break;
            }
        }
        localStorage.setItem(this.username, JSON.stringify(tasks));
    }

    function deleteTask(id){
        tasks = tasks.filter( item => {
            return item.id !== id;
        });
        localStorage.setItem(this.username, JSON.stringify(tasks));
    }

    function getCurrentTask(){
        return currentTask;
    }

    function getTodayActivity(){

        return tasks.map( task => {
            
            let task_total_today = task.sessions.reduce( (acc, curr) => {
                if( getDate(curr.date) === getDate( Date.now() ) ){
                    return acc + curr.time;
                } else {
                    return acc;
                }

            }, 0);

            task.task_total_today = task_total_today;
             
            return task;
        
        }).filter( task => {
            return task.task_total_today !== 0;
        });
    
    }
    // end Storage functions


    // Event Handlers
    function addTaskHandler(formEl){
        if( !formEl['task-title'].value ){
            return false;
        }

        // new task
        let newTask = new Task( {title: formEl['task-title'].value} );

        // add new task
        this.addTask( newTask );

        // display new task
        DOM.taskList.insertBefore( 
            newTask.render(openTaskPageHandler.bind(this)), 
            DOM.taskList.firstChild
        );

        formEl.reset();
    }

    function openTaskPageHandler(task){

        currentTask = task;
        taskPage = new TaskPage();

        DOM.taskPageContainer.innerHTML = '';
        DOM.taskPageContainer.appendChild( 
            taskPage.render(
                currentTask, 
                completeHandler.bind(this), 
                deleteHandler.bind(this), 
                closeHandler, 
                updateTitleHandler.bind(this), 
                updateDescHandler.bind(this), 
                setTimeLimitHandler.bind(this), 
                addSessionHandler.bind(this),
                deleteSessionHandler.bind(this),
                openPanelOnMobile
            )  
        );
        DOM.taskPageContainer.classList.add('modal--visible');
        DOM.taskPageContainer.focus();

        document.getElementsByTagName('body')[0].classList.add('js-modal');
    }

    function completeHandler(){
        if( !currentTask.isCompleted()){
            currentTask.status = 'completed';
            currentTask.date_completed = getDateTime();
        } else {
            currentTask.status = 'in progress';
            currentTask.date_completed = '';
        }    
            
        this.updateTask(currentTask);

        currentTask.updateDOM(openTaskPageHandler.bind(this));
    
        taskPage.updateDOMpage(
            currentTask, 
            completeHandler.bind(this), 
            deleteHandler.bind(this), 
            closeHandler, 
            updateTitleHandler.bind(this), 
            updateDescHandler.bind(this), 
            setTimeLimitHandler.bind(this), 
            addSessionHandler.bind(this),
            deleteSessionHandler.bind(this),
            openPanelOnMobile
        );  
    }

    function deleteHandler(){
        let confirmation = confirm('Are you sure you want to delete this task?');
        if(confirmation){
            DOM.taskPageContainer.innerHTML = '';
            document.getElementsByTagName('body')[0].classList.remove('js-modal');
            DOM.taskPageContainer.classList.remove('modal--visible');

            if(currentTask.DOMNode.nextElementSibling){
                currentTask.DOMNode.nextElementSibling.focus();
            } else if(currentTask.DOMNode.previousElementSibling) {
                currentTask.DOMNode.previousElementSibling.focus();
            }
            
            currentTask.DOMNode.outerHTML = '';
            this.deleteTask(currentTask.id);
            currentTask = null;
        }
    }

    function closeHandler(){
        DOM.taskPageContainer.innerHTML = '';
        DOM.taskPageContainer.classList.remove('modal--visible');
        document.getElementsByTagName('body')[0].classList.remove('js-modal');
        currentTask.DOMNode.focus();
    }

    function updateTitleHandler(formEl){
        let val = formEl['editValue'].value;

        if(!val){
            val = currentTask.title;
        }

        currentTask.title = val;
        this.updateTask(currentTask);

        currentTask.updateDOM(openTaskPageHandler.bind(this));
        taskPage.updateDOMtitle(currentTask, updateTitleHandler.bind(this));
    }

    function updateDescHandler(formEl){
        let val = formEl['editValue'].value;

        currentTask.description = formEl['editValue'].value;
        
        this.updateTask(currentTask);

        taskPage.updateDOMdesc(currentTask, updateDescHandler.bind(this));
    }

    function setTimeLimitHandler(formEl){
        let minutes = (formEl['hours'].value * 60) + (formEl['minutes'].value * 1);

        if(!minutes || minutes > 59999 || minutes <= 0 ){
            formEl.reset();
            return false;
        }

        currentTask.time_limit = minutes;
        this.updateTask(currentTask);

        taskPage.updateDOMsetTimeLimit(currentTask);
    }

    function addSessionHandler(formEl){
        let minutes = (formEl['hours'].value * 60) + (formEl['minutes'].value * 1);

        if(minutes <= 0){
            return;
        }

        let session = {
            id: Date.now() + Math.random(),
            time: minutes,
            date: getDateTime()
        }

        currentTask.sessions.push(session);
        this.updateTask(currentTask);

        currentTask.updateDOM( openTaskPageHandler.bind(this) );

        taskPage.updateDOMsessions(currentTask, deleteSessionHandler.bind(this));
        taskPage.updateDOMtimeTotal(currentTask);
        
        formEl.reset();

    }

    function deleteSessionHandler(sessionEl){

        let newSessions = currentTask.sessions.filter( item => {
            return item.id !== (sessionEl.id * 1);
        });

        currentTask.sessions = newSessions;

        this.updateTask(currentTask);
        currentTask.updateDOM( openTaskPageHandler.bind(this) );

        taskPage.updateDOMsessions(currentTask, deleteSessionHandler.bind(this));
        taskPage.updateDOMtimeTotal(currentTask);
    }

    // taskpage tabs on mobile   
    function openPanelOnMobile(btn){
        if(btn.parentNode.querySelector('.mobile-tab-nav__btn--active')){
            btn.parentNode.querySelector('.mobile-tab-nav__btn--active').classList.remove('mobile-tab-nav__btn--active');
        }

        let panelToShow = btn.getAttribute('data-panel');
        btn.classList.add('mobile-tab-nav__btn--active');

        document.querySelector('.mobile-panel--visible').classList.remove('mobile-panel--visible');
        document.getElementById(panelToShow).classList.add('mobile-panel--visible');
    }
    

    function init(){

        let obj = this;
        
        // display add task form
        DOM.taskForm.appendChild( addTaskFormComponent( addTaskHandler.bind(this) ) );

        // get all tasks of user from localstorage
        this.getAllTaks();

        // display all tasks
        let allTasksElem = tasks.reduce( (acc, curr) => {
            acc.appendChild( curr.render( openTaskPageHandler.bind(this) ) );
            return acc;
        }, document.createDocumentFragment());
        
        DOM.taskList.appendChild(allTasksElem);

        // display today activity        
        DOM.btnActivity.addEventListener('click', function(){
            DOM.todayActivity.innerHTML = '';
            DOM.todayActivity.appendChild( todayActivityComponent(getTodayActivity.call(obj), openTaskPageHandler.bind(obj)) );
        });
           
    }

    return {
        init: init,
        getAllTaks: getAllTaks,
        addTask: addTask,
        getTask: getTask,
        updateTask: updateTask,
        deleteTask: deleteTask,
        getCurrentTask: getCurrentTask
    }

})();
