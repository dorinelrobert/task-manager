export function completedComponent(date_completed){
    let completed = document.createElement('div');
    completed.className = 'taskpage__full completed';

    completed.innerHTML = 
            `<span class="completed__icon icon-check"></span>
            <div class="completed__info">
                <h4>Completed</h4>
                <h5>on ${date_completed}</h5>
            </div>`;

    return completed;

}