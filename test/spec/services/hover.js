'use strict';

describe('Service: hover', function () {

  // load the service's module
  beforeEach(module('cdcApp'));

  // instantiate service
  var hover;
  beforeEach(inject(function (_hover_) {
    hover = _hover_;
  }));

  it('should do something', function () {
    expect(!!hover).toBe(true);
  });

});
