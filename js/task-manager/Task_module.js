import { taskComponent } from './taskComponent.js';
import { getDateTime } from './utils.js';

export function Task(taskData){
    this.id             = taskData.id || Date.now() + Math.random() + '',
    this.title          = taskData.title,
    this.description    = taskData.description || '',
    this.date           = taskData.date || getDateTime(),
    this.date_completed = taskData.date_completed || '',
    this.time_limit     = taskData.time_limit || 0,
    this.status         = taskData.status || 'in progress',
    this.sessions       = taskData.sessions || [],
    this.DOMNode        = null
}

Task.prototype.getTotalSession = function(){
    return this.sessions.reduce((acc, curr) => {
        return acc + curr.time;
    }, 0);
}

Task.prototype.isCompleted = function(){
    return !!(this.status === 'completed');
} 

Task.prototype.render = function(openPageHandler){
    this.DOMNode = taskComponent(this, openPageHandler);
    return this.DOMNode;
}

Task.prototype.updateDOM = function(openPageHandler){
    let old = this.DOMNode;
    return this.DOMNode.parentNode.replaceChild(this.render(openPageHandler), old);
}