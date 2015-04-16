'use strict';

describe('Directive: bigChart', function () {

  // load the directive's module
  beforeEach(module('cdcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<big-chart></big-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bigChart directive');
  }));
});
