'use strict';

/**
 * @ngdoc service
 * @name cdcApp.hover
 * @description
 * # hover
 * Factory in the cdcApp.
 */
angular.module('cdcApp')
  .factory('hover', function (d3) {
    return function (eventType) {
      if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        d3.select('html').style({
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none'
        });
        switch (eventType) {
          case 'mouseover':
            return 'touchstart';
          case 'mouseout':
            return 'touchend';
          case 'mouseenter':
            return 'touchstart';
          case 'mouseleave':
            return 'touchend';
          default:
            return eventType;
        }
      } else {
        return eventType;
      }
    };
  });
