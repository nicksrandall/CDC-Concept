'use strict';

describe('Controller: DrillCtrl', function () {

  // load the controller's module
  beforeEach(module('cdcApp'));

  var DrillCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrillCtrl = $controller('DrillCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
