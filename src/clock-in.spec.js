import assert from 'assert';
import sinon from 'sinon';
import { sendClockIn, sendPositionClockIn } from './send-clockin';

import server from './server'
function availableGpsCoordinates() {
  return "02.02"
}

const gpsIsAvailable = new Promise((resolve, reject) => {
  resolve(availableGpsCoordinates);
});

const gpsIsNotAvailable = new Promise((resolve, reject) => {
  reject();
});

describe('time tracking', () => {

  let isServerAvailable;

  before(() => {
    isServerAvailable = sinon.stub(server, 'isServerAvailable');
  });

  context('Only time tracking', () => {

    it('should track time', (done) => {
      isServerAvailable.returns(true);      
      sendClockIn().then(function (res) {
        assert(res === "OK");
        done();
      });
    });

    it('try track time but error', (done) => {
      isServerAvailable.returns(false);
      sendClockIn().then(() => {
        assert(false);
      }).catch(function (res) {
        assert(res === "KO");
        done();
      });
    });

  });

  // context('GPS is optional', () => {

  //   context('GPS is available', () => {

  //     context('Server is available', () => {

  //       it('should clock-in with GPS data', done => {
  //         sendPositionClockIn(1, gpsIsAvailable).then(function (res) {
  //           assert(res === "GPS");
  //           done();
  //         });
  //         sendPositionClockIn.returns
  //         commitTime.returns(testScheduler.createColdObservable('-a'));
  //       });

  //     });

  //     context('Server is not available', () => {

  //       it('should report an error', done => {
  //         sendPositionClockIn(0, gpsIsAvailable).then(() => {
  //           assert(false);
  //         }).catch(function (res) {
  //           assert(res === "KO");
  //           done();
  //         });
  //       });

  //     });

  //   });

  //   context('GPS is not available', () => {

  //     context('Server is available', () => {

  //       it('should clock-in with a GPS warning', done => {
  //         sendPositionClockIn(1, gpsIsNotAvailable).then(function (res) {
  //           assert(res === "NOTGPS");
  //           done();
  //         });

  //       });

  //     });

  //     context('Server is not available', () => {

  //       it('should report an error and a GPS warning', done => {

  //         sendPositionClockIn(0, gpsIsNotAvailable).then(() => {
  //           assert(false);
  //         }).catch(function (res) {
  //           assert(res === "KO");
  //           done();
  //         });
  //       });

  //     });

  //   });

  // });
});

