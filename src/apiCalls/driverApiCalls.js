const driversBaseUrl = 'http://localhost:3000/api/drivers'

export function getDriverApiCall(){
    const promise = fetch(driversBaseUrl)
    return promise;
}

export  function getDriverByIdApiCall(driverId){
    const url = `${driversBaseUrl}/${driverId.driverId}`;
    const promise = fetch(url);
    return promise;
}