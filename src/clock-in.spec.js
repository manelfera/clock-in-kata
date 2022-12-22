import assert from 'assert';
import sinon from 'sinon';
import { sendClockIn, sendPositionClockIn } from './send-clockin';
import server from './server'
import gps from './gps'

describe('time tracking', () => {

  let isServerAvailable;
  let isGpsAvailable;

  before(() => {
    isServerAvailable = sinon.stub(server, 'isServerAvailable');
    isGpsAvailable = sinon.stub(gps, 'isGpsAvailable');
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

  context('GPS is optional', () => {

    context('GPS is available', () => {

      context('Server is available', () => {

        it('should clock-in with GPS data', done => {
          
          isGpsAvailable.returns(true);
          isServerAvailable.returns(true);

          sendPositionClockIn().then(function (res) {
            assert(res === "OK");
            done();
          });
          
        });

      });

      context('Server is not available', () => {

        it('should report an error', done => {
          isGpsAvailable.returns(true);
          isServerAvailable.returns(false);
          sendPositionClockIn().then(() => {
            assert(false);
          }).catch(function (res) {
            assert(res === "KO");
            done();
          });
        });

      });

    });

    context('GPS is not available', () => {

      context('Server is available', () => {

        it('should clock-in with a GPS warning', done => {
          isGpsAvailable.returns(false);
          isServerAvailable.returns(true);
          sendPositionClockIn().then(function (res) {
            assert(res === "OK + GPS WARN");
            done();
          });

        });

      });

      context('Server is not available', () => {

        it('should report an error and a GPS warning', done => {
          isGpsAvailable.returns(false);
          isServerAvailable.returns(false);
          sendPositionClockIn().then(() => {
            assert(false);
          }).catch(function (res) {
            assert(res === "KO + GPS WARN");
            done();
          });
        });

      });

    });

  });
});

