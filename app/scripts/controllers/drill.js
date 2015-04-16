'use strict';

/**
 * @ngdoc function
 * @name cdcApp.controller:DrillCtrl
 * @description
 * # DrillCtrl
 * Controller of the cdcApp
 */
angular.module('cdcApp')
  .controller('DrillCtrl', function (d3, $state, $rootScope, cdcData) {
    var drill = this;

    drill.metric = cdcData.getter();

    drill.back = function () {
      $state.go('main');
    };

    d3.json(drill.metric.data, function (err, data) {
      var height = angular.element('.metric-card').height();
      angular.element(document.getElementsByClassName('grid')[0]).css('height', height + 'px');
      drill.data = data;
    });

    angular.element(window).resize(function() {
      var height = angular.element('.metric-card').height();
      angular.element(document.getElementsByClassName('grid')[0]).css('height', height + 'px');
    });

    $rootScope.direction = 'right';
  });
