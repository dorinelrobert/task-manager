import { formatMinutes } from './utils.js';

export function timeTotalComponent(time_total, time_limit){
    let timeTotal = document.createElement('div');

    
    if( (time_limit+'') !== '0' && (time_limit*1) < (time_total*1) ){
        timeTotal.className = 'total-time total-time__overdue';
    } else {
        timeTotal.className = 'total-time';
    }

    

    timeTotal.innerHTML = 
                    `<h3 class="total-time__val">${formatMinutes(time_total)}</h3>
                    <h5 class="total-time__label">Total session</h5>`;

    return timeTotal;
}