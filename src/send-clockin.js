const gps = require('./gps');
const server = require('./server');

module.exports = {
    sendClockIn,
    sendPositionClockIn
}

function sendClockIn() {

    let myPromise = new Promise(function (myResolve, myReject) {        
        if (server.isServerAvailable()){
            myResolve("OK");
        } else {
            myReject("KO");
        }
    });

    myPromise.then(
        function (value) { value },
        function (error) { error }
    );

    return myPromise
}

function sendPositionClockIn(){
    let myPromise = new Promise(function (myResolve, myReject) {

        if (gps.isGpsAvailable()){
            if (server.isServerAvailable()){
                myResolve("OK");
            } else {
                myReject("KO");
            }
        } else {
            if (server.isServerAvailable()){
                myResolve("OK + GPS WARN");
            } else {
                myReject("KO + GPS WARN");
            }
        }        
    });

    myPromise.then(
        function (value) { value },
        function (error) { error }
    );

    return myPromise
}