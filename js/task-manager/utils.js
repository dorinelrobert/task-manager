export function getDateTime(){

    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear(),
        hours = (date.getHours()+'').padStart(2, '0'),
        minutes = (date.getMinutes()+'').padStart(2, '0');

    return `${month} ${day}, ${year} ${hours}:${minutes}`; 

}

export function getDate(date){
    date = new Date(date);

    return date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear();
}

export function formatMinutes(minutes){
    return `${Math.floor( minutes / 60)}h : ${(Math.floor( minutes % 60) + '').padStart(2,'0')}m`;
}