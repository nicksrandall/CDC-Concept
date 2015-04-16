'use strict';

/**
 * @ngdoc directive
 * @name cdcApp.directive:bigChart
 * @description
 * # bigChart
 */
angular.module('cdcApp')
  .directive('bigChart', function (d3, $state, hover) {
    return {
      template: [
        '<div class="col-sm-6 metric-card">',
          '<div class="card-container">',
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
        var svg = d3.select(element.get(0)).select('.svg');
        var container = svg.select('.area-chart');

        var color = d3.scale.ordinal()
          .range(scope.metric.color);

        var x = d3.time.scale()
          .range([0, 500]);

        var y = d3.scale.linear()
          .range([450, 0]);

        var init = d3.svg.line()
          .interpolate('basis')
          .x(function(d) { return x(new Date(+d.Year, 1, 1)); })
          .y(220);

        var voronoi = d3.geom.voronoi()
          .x(function(d) { return x(new Date(+d.Year, 1, 1)); })
          .y(function(d) { return y(+d.Number); })
          .clipExtent([[0, 0], [500, 500]]);

        var line = d3.svg.line()
          .interpolate('basis')
          .x(function(d) { return x(new Date(+d.Year, 1, 1)); })
          .y(function(d) { return y(+d.Number); });

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

        var legend = container.append('g')
          .attr('class', 'legend')
          .attr('transform', 'translate(15, 15)');

        var voronoiGroup = container.append('g')
          .attr('class', 'voronoi');

        d3.json(scope.metric.data, function(error, data) {
          if (error) {console.log(error);}
          color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'Year'; }));

          var metrics = color.domain().map(function(name) {
            var arr = [];
            data.forEach(function(d) {
              if (d[name]) {
                arr.push({
                  Year: +d.Year,
                  Number: +d[name]
                });
              }
            });
            return {
              name: name,
              values: arr
            };
          });

          var timeRange = d3.extent(data, function(d) { return new Date(+d.Year, 1, 1); });
          x.domain(timeRange);
          y.domain([
            d3.min(metrics, function(c) { return d3.min(c.values, function(v) { return v.Number; }); }),
            d3.max(metrics, function(c) { return d3.max(c.values, function(v) { return v.Number; }); }) * 1.1
          ]);
          var diff = timeRange[1].getFullYear() - timeRange[0].getFullYear();
          var farLeft = timeRange[0].getFullYear() + (diff / 4);
          var farRight = timeRange[1].getFullYear() - (diff / 4);

          var lines = g.selectAll('path')
            .data(metrics);

          var linesEnter = lines.enter().append('path')
            .attr('class', 'area')
            .attr('d', function (d) { return init(d.values); })
            .style('fill', 'none')
            .style('stroke', function (d) { return color(d.name); })
            .style('stroke-width', 2);


          var cats = legend.selectAll('g.cat').data(metrics);
          var catsEnter = cats.enter().append('g').attr('class', 'cat');
          catsEnter.append('rect')
            .attr({
              x: 0,
              y: function (d,i) { return 30*i; },
              width: 20,
              height: 20
            })
            .style('fill', function (d) { return color(d.name); });

          catsEnter.append('text')
            .attr({
              x: 30,
              dy: 18,
              y: function (d,i) { return 30*i; },
            })
            .style('fill', '#555')
            .style('font-size', '20px')
            .text(function (d){ return d.name; });

          lines
              .transition()
              .duration(500)
              .delay(100)
              .attr('d', function (d) { return line(d.values); });

          voronoiGroup.selectAll('path')
            .data(voronoi(d3.nest()
              .key(function(d) { return x(d.Year) + ',' + y(d.Number); })
              .rollup(function(v) { return v[0]; })
              .entries(d3.merge(metrics.map(function(d) { return d.values; })))
              .map(function(d) { return d.values; })))
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
