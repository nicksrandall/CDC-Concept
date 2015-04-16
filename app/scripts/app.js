'use strict';

/**
 * @ngdoc overview
 * @name cdcApp
 * @description
 * # cdcApp
 *
 * Main module of the application.
 */
angular
  .module('cdcApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.grid',
    'ui.grid.autoResize',
  ])
  .constant('d3', d3)
  ..constant('WOW', WOW)
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('drill', {
        url: '/:title',
        templateUrl: 'views/drill.html',
        controller: 'DrillCtrl',
        controllerAs: 'drill'
      });
  })
  .run(function ($animate, WOW) {
    new WOW().init();
    $animate.enabled(false);
    setTimeout(function () {
      $animate.enabled(true);
    }, 500);
  });
