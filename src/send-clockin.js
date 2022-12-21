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

function sendPositionClockIn(duration, position){
    let myPromise = new Promise(function (myResolve, myReject) {
        if (position){
            myResolve("GPS");
        } else {
            myReject("NOTGPS");
        }
        if (duration > 0) {        
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