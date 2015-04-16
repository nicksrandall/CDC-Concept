'use strict';

/**
 * @ngdoc function
 * @name cdcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cdcApp
 */
angular.module('cdcApp')
  .controller('MainCtrl', function ($rootScope, cdcData) {
    var main = this;
    var key;

    // Load All Metrics for charts
    for (key in cdcData) {
      main[key] = cdcData[key];
    }

    $rootScope.direction = 'left';
  });
