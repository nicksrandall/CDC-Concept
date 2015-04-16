'use strict';

/**
 * @ngdoc function
 * @name cdcApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the cdcApp
 */
angular.module('cdcApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.links = [{
      name: 'Diabetes Home',
      href: '#'
    }, {
      name: 'Data & Trends',
      href: '#'
    }, {
      name: 'Diabetes Data & Trends',
      href: '#'
    }, {
      name: 'Interactive Atlas',
      href: '#'
    }];

    $scope.social = [{
      name: 'facebook',
      href: '#'
    }, {
      name: 'twitter',
      href: '#'
    }, {
      name: 'instagram',
      href: '#'
    }, {
      name: 'google-plus',
      href: '#'
    }];
  });
