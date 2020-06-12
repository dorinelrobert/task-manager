import { formatMinutes } from './utils.js';

export function timeLimitComponent(time_limit){
    let time = document.createElement('div');
    time.className = 'time-limit';
    time.innerHTML = 
            `<div class="time-limit__img">
                <img src="images/clock.png">
            </div>
            <div class="time-limit__body">
                <h5>Time Limit</h5>
                <p>${formatMinutes(time_limit)}</p>
            </div>`;

    return time;
}