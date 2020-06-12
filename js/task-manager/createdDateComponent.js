export function createDateComponent(date){
    let created = document.createElement('div');
    created.className = 'created';
    created.innerHTML =
            `<div class="created__icon">
                <span class="icon-plus"></span>
            </div>
            <div class="created__body">
                <h5>Created</h5>
                <p>${date}</p>
            </div>`;
    
    return created;
}