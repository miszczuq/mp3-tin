const driversBaseUrl = 'http://localhost:3000/api/drivers'

export function getDriverApiCall(){
    const promise = fetch(driversBaseUrl)
    return promise;
}

export  function getDriverByIdApiCall(driverId){
    console.log("driver id w api call: ",driverId.driverId)
    console.log("typ: ",typeof driverId.driverId)
    const url = `${driversBaseUrl}/${driverId.driverId}`;
    const promise = fetch(url);
    return promise;
}