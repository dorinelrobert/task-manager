import { createDateComponent } from './createdDateComponent.js';
import { navComponent } from "./navComponent.js";
import { completedComponent } from './completedComponent.js';
import { mobileTabNav } from './mobileTabNav.js';
import { editFormComponent } from './editFormComponent.js';
import { timeLimitComponent } from './timeLimitComponent.js';
import { timeFormComponent } from './timeFormComponent.js';
import { timeTotalComponent } from './timeTotalComponent.js';
import { sessionContainerComponent } from './sessionsComponent.js';
import { taskPageComponent } from './taskPageComponent.js';


export function TaskPage(){
    this.page = null;
    this.nav = null;
    this.titleForm = null;
    this.descForm = null;
    this.timeLimit = null;
    this.setTimeLimit = null;
    this.timeTotal = null;
    this.addSession = null;
    this.sessionContainer = null;
}

TaskPage.prototype.render = function(
    task, 
    completeHandler, 
    deleteHandler, 
    closeHandler, 
    updateTitleHandler, 
    updateDescHandler, 
    setTimeLimitHandler, 
    addSessionHandler,
    deleteSessionHandler,
    openPanelOnMobile
){
    
    this.createdDate        = createDateComponent(task.date);
    this.nav                = navComponent(task.status, completeHandler, deleteHandler, closeHandler);

    this.completed          = completedComponent(task.date_completed);

    this.mobileTabNav       = mobileTabNav(openPanelOnMobile);
    
    this.titleForm          = editFormComponent(task.title, 'taskpage__title', '', updateTitleHandler);
    this.descForm           = editFormComponent(task.description, 'taskpage__description', 'This task has no description', updateDescHandler);

    this.timeLimit          = timeLimitComponent(task.time_limit);
    this.setTimeLimit       = timeFormComponent(setTimeLimitHandler, 'Set time limit');
    this.timeTotal          = timeTotalComponent(task.getTotalSession(), task.time_limit);
    this.addSession         = timeFormComponent(addSessionHandler, 'Add a session');
    this.sessionContainer   = sessionContainerComponent(task.sessions, deleteSessionHandler);

    
    this.page = taskPageComponent(
        task,
        this.createdDate,
        this.nav,
        this.completed,
        this.mobileTabNav,
        this.titleForm,
        this.descForm,
        this.timeLimit,
        this.setTimeLimit,
        this.timeTotal,
        this.addSession,
        this.sessionContainer 
    );

    return this.page;
    
}

TaskPage.prototype.updateDOMpage = function(
    task, 
    completeHandler, 
    deleteHandler, 
    closeHandler, 
    updateTitleHandler, 
    updateDescHandler, 
    setTimeLimitHandler, 
    addSessionHandler,
    deleteSessionHandler,
    openPanelOnMobile
){
    let old = this.page;
    return this.page.parentNode.replaceChild(this.render(
        task, 
        completeHandler, 
        deleteHandler, 
        closeHandler, 
        updateTitleHandler, 
        updateDescHandler, 
        setTimeLimitHandler, 
        addSessionHandler,
        deleteSessionHandler,
        openPanelOnMobile
    ), old);1
}

TaskPage.prototype.updateDOMtitle = function(task, updateTitleHandler){
    let oldTitleForm = this.titleForm;
    this.titleForm = editFormComponent(task.title, 'taskpage__title', '', updateTitleHandler);
    return oldTitleForm.parentNode.replaceChild(this.titleForm, oldTitleForm);
}

TaskPage.prototype.updateDOMdesc = function(task, updateDescHandler){
    let oldDescForm = this.descForm;
    this.descForm = editFormComponent(task.description, 'taskpage__description', 'This task has no description', updateDescHandler);
    return oldDescForm.parentNode.replaceChild(this.descForm, oldDescForm);
}

TaskPage.prototype.updateDOMsetTimeLimit = function(task){
    this.timeLimit = timeLimitComponent(task.time_limit);
    return this.setTimeLimit.parentNode.replaceChild(this.timeLimit, this.setTimeLimit);
}

TaskPage.prototype.updateDOMsessions = function(task, deleteSessionHandler){
    let old = this.sessionContainer;
    this.sessionContainer = sessionContainerComponent(task.sessions, deleteSessionHandler);
    return old.parentNode.replaceChild(this.sessionContainer, old);
}

TaskPage.prototype.updateDOMtimeTotal = function(task){
    let old = this.timeTotal;
    this.timeTotal = timeTotalComponent(task.getTotalSession(), task.time_limit);
    return old.parentNode.replaceChild(this.timeTotal, old);
}