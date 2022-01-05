const lapsBaseUrl = 'http://localhost:3000/api/driverGokarts'

export function getLapApiCall(){
    const promise = fetch(lapsBaseUrl)
    return promise;
}

// export  function getLapByIdApiCall(lapId){
//     const url = `${driversBaseUrl}/${driverId.driverId}`;
//     const promise = fetch(url);
//     return promise;
// }