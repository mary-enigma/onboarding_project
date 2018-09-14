<template>
    <div style="width:100%;height:100%">
      <panel-heading v-if='title' :headerText='title'></panel-heading>
      <!-- <resize-observer @notify="resizeSVG"></resize-observer> -->
      <div :id="propID" style="width:100%;height:100%" class="stackedBarChart"/>
    </div>
</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  // import { ResizeObserver } from 'vue-resize';

  export default {
    name: 'bar-chart',
    components: {
      'resize-observer': ResizeObserver,
    },

    props: {
      dataModel: {
        type: Object,
        default: ()=>{return {}}
      },
      propID: {
    		 type: String,
    		 default: 'stackedBarChart'
  	  }
    },
    data: function() {
        return {
  		      name: "bar-chart",
        }
    },
  	watch: {
  		dataModel: function(data) {
  			// console.log('BarChart dataModel changed')
  			if (this.internalData.length === 0) {
  				this.update = false
  			} else {
  				this.update = true
  			}
  			this.internalData = data
  			this.drawStackedBarChart(data)
  		}
  	},
    mounted: function() {
  		this.dataModel.length !== 0 ? this.drawStackedBarChart(
        this._props.dataModel,
        this._props.propID
      ) : null
  	},
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      /**
      * @function resizeSVG - redraws the SVG on window resize
      */
      resizeSVG: function(){
        this.dataModel.length !== 0 ? this.drawStackedBarChart() : null;
      },
      drawStackedBarChart: function (
        data = this.dataModel,
        id = this._props.propID
      ) {
        // debugger
        var timeKey;
        let localThis = this
        var data = [{"month":"January", "A":20, "B": 5,  "C": 10}];
        Object.keys(data[0]).includes('month') ? timeKey = 'month' : timeKey = 'date';
        var keys = Object.keys(data[0]).filter(el => el !== timeKey)
        d3.selectAll(`.${this.propID}_tooltip`).remove()

        let selection_string = "#" + id;
        if ($(selection_string + " svg") != null) {
          $(selection_string + " svg").remove();
        }
        var element = $(selection_string);
        //set margins
        //leave room in right margin for legend
        var margin = {top: 30, right: 60, bottom: 30, left: 40},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;

          //make tooltips
        var tooltip = d3.select("body")
          .append("div")
          .attr("class", `d3_visuals_tooltip ${this.propID}_tooltip`)
          .style("opacity", 0);
          //make svg
        var svg = d3.select(selection_string).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          //set x, y axis and color
          var x = d3.scaleBand()
          //width leaves room for legend
            .range([0, width - 25], .1)
            .padding(0.1);
          var y = d3.scaleLinear()
            .range([height, 0]);
          // var colors = ["#98abc5", "#8a89a6", "#7b6888"]
          //var colors = ["#4F1E71", "#A93B8D", "#F38595"]
          var colors = ["#081A4E", "#1A649F",  "#2DA8C9", "#9AD5CD"].slice(0,keys.length)
          var parseDate = d3.timeParse(this.d3Time[this.dateFormat])
          var stack = d3.stack()
              .keys(keys)
              .order(d3.stackOrderNone)
              .offset(d3.stackOffsetNone);
          var layers = stack(data);
          x.domain(data.map(function (d) {
            return parseDate(d[timeKey]);
          }));
          y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[1]; }) ]).nice();
          var ticks = data.map(function (d) {
            return parseDate(d[timeKey]);
          })
          if (ticks.length > 11) {
            ticks = ticks.filter(function(t, i) { return i % 6 === 0; })
          }
            //make x and y axises
            var xAxis = d3.axisBottom()
              .scale(x)
              .tickValues(ticks)
              .tickFormat(d3.timeFormat(this.d3Time[this.dateFormat]))
            var yAxis = d3.axisLeft()
              .scale(y)
              .tickSizeInner(-width+25, 0, 0)
              .ticks(6)
              .tickFormat( function(d) { return d } );
            //append x and y axises
            svg.append("g")
              .attr("class", "y axis axis-stacked")
              .call(yAxis)
              .append('text')
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .attr("font-size", "16px")
                .text(this.yAxisLabel);
            svg.append("g")
              .attr("class", "x axis axis-stacked")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .append("text")
                .attr("x", (width / 2))
                .attr("y", 10)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .attr("font-size", "16px")
                .style("text-color", 'black')
                .text(this.xAxisLabel);
            var layer = svg.selectAll(".stack")
              .data(layers)
              .enter().append("g")
              .attr("class", function (d, i) {return 'stack' + i;})
              // .style("fill", function (d, i) {return colors[i];});
              //create the stacks
              layer.selectAll("rect")
                .data(function (d) {return d;})
                .enter()
                .append("rect")
                .attr("class", "stackedBar")
                .attr("x", function (d) {return x(parseDate(d.data[timeKey]))})
                .attr("y", function (d) {return y(d[1])})
                .attr("height", function (d) {return y(d[0]) - y(d[1])})
                .attr("width", x.bandwidth())
                //tooltips
                .on("mouseover", function(d) {
                  localThis.$emit('jsc_mouseover', d)
                  // find the amount by subtracting the two values in array
                  var difference = d[1] - d[0];
                  tooltip.transition()
                      .duration(100)
                  .style("opacity", 1);
                        tooltip.html("Date: " + "<b>" + d.data[timeKey] + "</b>" +
                          "<br>" + "Amount" + ": " + "<b>" + difference + "</b>")
                      .style("left", (d3.event.pageX + 5) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                    })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                })
                .on("click", function(d){
                  localThis.$emit("jsc_click", d)
                })
                // Draw legend
                var legend = svg.selectAll(".legend")
                  .data(colors)
                  .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
                legend.append("rect")
                  .attr("x", width - 50)
                  .attr("width", 25)
                  .attr("height", 25)
                  .attr("class", function(d, i) {return 'stack' + (keys.length - 1 - i);});
                legend.append("text")
                  .attr("x", width - 20)
                  .attr("y", 9)
                  .attr("dy", ".35em")
                  .style("text-anchor", "start")
                  .text(function(d, i) {
                    return keys[i].slice(0,1).toUpperCase() + keys[i].slice(1)
                  });

        }
      }
    }
</script>

<style>
  /* .legend {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
  }
  .axis-stacked {
    font-size: 14px;
  }
  .stack0 {
    fill: var(--first);
  }
  .stack1 {
    fill: var(--third);
  }
  .stack2 {
    fill: var(--fifth);
  }
  .stack3 {
    fill: var(--seventh);
  }
  .tick line {
    fill: none;
  } */
  svg {
    font: 10px sans-serif;
    shape-rendering: crispEdges;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
  }

  path.domain {
    stroke: none;
  }

  .y .tick line {
    stroke: #ddd;
  }
</style>
