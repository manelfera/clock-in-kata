module.exports = {
    sendClockIn
}

function sendClockIn(duration) {

    let myPromise = new Promise(function (myResolve, myReject) {
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