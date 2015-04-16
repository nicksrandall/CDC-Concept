'use strict';

describe('Directive: metricCard', function () {

  // load the directive's module
  beforeEach(module('cdcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<metric-card></metric-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the metricCard directive');
  }));
});
