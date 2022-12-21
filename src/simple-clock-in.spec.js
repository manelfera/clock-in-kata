import assert from 'assert';
import { sendClockIn } from './send-clockin';

describe('time tracking', () => {

  context('Only time tracking', () => {

    it ('should track time', (done) => {
      sendClockIn(1).then(function(res) {
        assert(res === "OK");
        done();
      });
    });

    it ('try track time but error', (done) => {
      sendClockIn().then(() => {
        assert(false);
      }).catch(function(res) {
        assert(res === "KO");
        done();
      });
    });

  });

});

