'use strict';

/**
 * @ngdoc directive
 * @name cdcApp.directive:metricCard
 * @description
 * # metricCard
 */
angular.module('cdcApp')
  .directive('singleLineCard', function (d3, $state, hover, cdcData) {
    return {
      template: [
        '<div class="col-sm-6 col-md-4 col-lg-3 metric-card" ng-click="drill()">',
          '<div class="card-container">',
            '<div class="card-header">',
              '<span class="glyphicon glyphicon glyphicon-info-sign pull-right" aria-hidden="true"></span>',
              '<span class="card-name">{{metric.name}}</span>',
            '</div>',
            '<div class="visualization">',
              '<svg class="svg" viewBox="0 0 500 500">',
                '<g class="area-chart">',
                '</g>',
                '<g class="vis-footer">',
                  '<rect class="rect" x="0" y="450" width="500" height="50"></rect>',
                  '<text x="15" y="485" id="start" class="label"></text>',
                  '<text x="485" y="485" id="end" class="label"></text>',
                '</g>',
              '</svg>',
            '</div>',
          '</div>',
        '</div>'
      ].join(''),
      restrict: 'EA',
      scope: {
        metric: '=metric'
      },
      link: function postLink(scope, element, attrs) {
        scope.drill = function () {
          cdcData.setter(scope.metric);
          $state.go('drill', {title: _.camelCase(scope.metric.name)})
            .then(function () {
              angular.element('html, body').animate({
                scrollTop: 0
              }, 600);
            });
          return false;
        };
        var svg = d3.select(element.get(0)).select('.svg');
        var container = svg.select('.area-chart');

        var x = d3.time.scale()
          .range([0, 500]);

        var y = d3.scale.linear()
          .range([500, 0]);

        var voronoi = d3.geom.voronoi()
          .x(function(d) { return x(new Date(+d.Year, 1, 1)); })
          .y(function(d) { return y(+d.Number); })
          .clipExtent([[0, 0], [500, 500]]);

        var init = d3.svg.area()
          .interpolate('basis')
          .x(function(d) { return x(new Date(+d.Year, 1, 1)); })
          .y0(500)
          .y1(500);

        var area = d3.svg.area()
          .interpolate('basis')
          .x(function(d) { return x(new Date(+d.Year, 1, 1)); })
          .y0(500)
          .y1(function(d) { return y(+d.Number); });

        var g = container.append('g');

        var focus = container.append('g')
          .attr('transform', 'translate(-100,-100)')
          .attr('class', 'focus');

        focus.append('circle')
          .style('fill', '#555')
          .attr('r', 7.5);

        focus.append('text')
          .style('alignment-baseline', 'middle')
          .style('fill', '#555')
          .style('font-size', '20px');

        var voronoiGroup = container.append('g')
          .attr('class', 'voronoi');

        d3.json(scope.metric.data, function(error, data) {

          var timeRange = d3.extent(data, function(d) { return new Date(+d.Year, 1, 1); });
          x.domain(timeRange);
          y.domain([0, d3.max(data, function(d) { return d.Number; }) * 1.1 ]);
          var diff = timeRange[1].getFullYear() - timeRange[0].getFullYear();
          var farLeft = timeRange[0].getFullYear() + (diff / 4);
          var farRight = timeRange[1].getFullYear() - (diff / 4);

          g.append('path')
            .datum(data)
            .attr('class', 'area')
            .attr('d', init)
            .style('fill', scope.metric.color[0])
              .transition()
              .duration(500)
              .delay(100)
              .attr('d', area);

          voronoiGroup.selectAll('path')
            .data(voronoi(data))
            .enter().append('path')
              .attr('d', function(d) { return 'M' + d.join('L') + 'Z'; })
              .datum(function(d) { return d.point; })
              .style('fill', '#fff')
              .style('opacity', '0')
              .on(hover('mouseover'), function (d) {
                focus.attr('transform', 'translate(' + x(new Date(+d.Year, 1, 1)) + ',' + y(+d.Number) + ')');
                focus.select('text')
                  .text(d.Year + ' | ' + d.Number)
                  // .transition()
                  .style('text-anchor', function () {
                    if (d.Year < farLeft) {
                      return 'start';
                    } else if (d.Year > farRight) {
                      return 'end';
                    } else {
                      return 'middle';
                    }
                  })
                  .attr('y', function () {
                    if (d.Year < farLeft) {
                      return 0;
                    } else if (d.Year > farRight) {
                      return 0;
                    } else {
                      return -25;
                    }
                  })
                  .attr('x', function () {
                    if (d.Year < farLeft) {
                      return 15;
                    } else if (d.Year > farRight) {
                      return -15;
                    } else {
                      return 0;
                    }
                  });
              })
              .on(hover('mouseout'), function () {
                focus.attr('transform', 'translate(-100, -100)');
              });

          svg.select('#start').text(timeRange[0].getFullYear());
          svg.select('#end').text(timeRange[1].getFullYear());
        });
      }
    };
  });
