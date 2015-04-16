'use strict';

describe('Service: cdcData', function () {

  // load the service's module
  beforeEach(module('cdcApp'));

  // instantiate service
  var cdcData;
  beforeEach(inject(function (_cdcData_) {
    cdcData = _cdcData_;
  }));

  it('should do something', function () {
    expect(!!cdcData).toBe(true);
  });

});
