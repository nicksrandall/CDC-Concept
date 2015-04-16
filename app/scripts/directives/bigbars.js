'use strict';

/**
 * @ngdoc directive
 * @name cdcApp.directive:bigChart
 * @description
 * # bigChart
 */
angular.module('cdcApp')
  .directive('bigBars', function (d3, $state, hover) {
    return {
      template: [
        '<div class="col-sm-6 metric-card">',
          '<div class="card-container">',
            '<div class="visualization">',
              '<svg class="svg" viewBox="0 0 500 500">',
                '<g class="area-chart">',
                '</g>',
                '<g class="vis-footer">',
                  '<rect class="rect" x="0" y="420" width="500" height="80"></rect>',
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
        var container = svg.select('.area-chart').attr('transform', 'translate(30,20)');

        var width = 440;
        var height = 400;

        var x0 = d3.scale.ordinal()
          .rangeRoundBands([0, width], 0.1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
          .range([height, 0]);

        var color = d3.scale.ordinal()
          .range(scope.metric.color);

        var xAxis = d3.svg.axis()
          .scale(x0)
          .orient('bottom');

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left')
          .tickFormat(d3.format('.2s'));

        d3.json(scope.metric.data, function(error, data) {
          var metrics = d3.keys(data[0]).filter(function(key) { return key !== 'Group'; });

          data.forEach(function(d) {
            d.metrics = metrics.map(function(name) { return {Group: name, Number: +d[name]}; });
          });

          x0.domain(data.map(function(d) { return d.Group; }));
          x1.domain(metrics).rangeRoundBands([0, x0.rangeBand()]);
          y.domain([0, d3.max(data, function(d) { return d3.max(d.metrics, function(d) { return d.Number; }); })]);

          var xGroup = container.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis);

          xGroup.selectAll('text')
            .style('text-anchor', 'start')
            .attr('transform', 'rotate(45)');

          var group = container.selectAll('.state')
              .data(data)
            .enter().append('g')
              .attr('class', 'g')
              .attr('transform', function(d) { return 'translate(' + x0(d.Group) + ',0)'; });


          var bars = group.selectAll('rect')
              .data(function(d) { return d.metrics; });

          bars.enter().append('rect')
              .attr('width', x1.rangeBand())
              .attr('x', function(d) { return x1(d.Group); })
              .attr('y', function(d) { return y(d.Number); })
              .attr('height', function(d) { return height - y(d.Number); })
              .style('fill', function(d) { return color(d.Group); })
              .on(hover('mouseenter'), function (d) {
                labels.filter(function (datum) {
                  return d.Group === datum.Group;
                })
                .style('opacity', 1);
                bars.filter(function (datum) {
                  return d.Group !== datum.Group;
                }).style('fill', '#e5e5e5');
              })
              .on(hover('mouseleave'), function (d) {
                labels.filter(function (datum) {
                  return d.Group === datum.Group;
                })
                .style('opacity', 0);
                bars.style('fill', function(d) { return color(d.Group); });
              });

          var labels = group.selectAll('text')
            .data(function(d) { return d.metrics; });

          labels.enter().append('text')
              .attr('x', function(d) { return x1(d.Group);})
              .attr('dx', x1.rangeBand()/2)
              .attr('x', function(d) { return x1(d.Group); })
              .attr('y', function(d) { return y(d.Number) - 10; })
              .style('text-anchor', 'middle')
              .style('fill', '#555')
              .style('opacity', 0)
              .style('font-size', '16px')
              .text(function (d) { return d.Number; });

          var legend = container.selectAll('.legend')
              .data(metrics.slice().reverse())
            .enter().append('g')
              .attr('class', 'legend')
              .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

          legend.append('rect')
              .attr('x', width - 18)
              .attr('width', 18)
              .attr('height', 18)
              .style('fill', color);

          legend.append('text')
              .attr('x', width - 24)
              .attr('y', 9)
              .attr('dy', '.35em')
              .style('text-anchor', 'end')
              .text(function(d) { return d; });

        });


      }
    };
  });
