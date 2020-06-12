export function addTaskFormComponent(addTaskHandler){
    let form = document.createElement('form');
    form.className = 'form form--addtask';
    form.setAttribute('autocomplete', 'off');
    form.innerHTML = 
            `<input type="text" placeholder="Add Task" class="form__input" name="task-title">
            <button type="submit" class="btn btn--primary">Add</button>`;
        
    form.addEventListener('submit', function(event){
        event.preventDefault();

        addTaskHandler(this);

    });

    return form;
        
}