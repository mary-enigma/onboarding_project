<template>
    <div style="width:100%;height:100%">
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
// debugger
          //make tooltips
        var tooltip = d3.select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

          d3.selectAll(`.${this.propID}_tooltip`).remove()

          //make svg
        var svg = d3.select(selection_string).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var data = this.dataModel.children
          var xKey = "name"
          var keys = Object.keys(data[0]).filter(el => el !== xKey)
          // debugger

          //set x, y axis and color
          var x = d3.scaleBand()
          //width leaves room for legend
            .range([0, width - 25], .1)
            .padding(0.1);

          var y = d3.scaleLinear()
            .range([height, 0]);
// debugger
          var colors = ["D770AD", "#4A89DC"]
                  // var parseDate = d3.timeParse(this.d3Time[this.dateFormat])
          var stack = d3.stack()
              .keys(keys)
              .order(d3.stackOrderNone)
              .offset(d3.stackOffsetNone);

          var layers = stack(data);
          x.domain(data.map(function (d) {
            return d.name;
          }));
           y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[1]; }) ]).nice();
          // debugger
          var ticks = data.map(function (d) {
            // debugger
            return d.name;
          })
          if (ticks.length > 11) {
            ticks = ticks.filter(function(t, i) { return i % 6 === 0; })
          }
// debugger
          //make x and y axises
          var xAxis = d3.axisBottom()
            .scale(x)
            .tickValues(ticks)
          var yAxis = d3.axisLeft()
            .scale(y)
            .tickSizeInner(-width+25, 0, 0)
            .ticks(6)
            .tickFormat( function(d,i) {
              if (i == 0) {
                return "0"
              } else {
                // debugger
                return d3.format(".2s")(d);
              }
            });

            // debugger
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
              .text("Number of Workers");
// debugger
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
              .text("Occupation");

            var layer = svg.selectAll(".stack")
              .data(layers)
              .enter().append("g")
              .attr("class", function (d, i) {return 'stack' + i;})
              .style("fill", function (d, i) {return colors[i];});

                      //create the stacks
            layer.selectAll("rect")
              .data(function (d) {return d;})
              .enter()
              .append("rect")
              .attr("class", "stackedBar")
              .attr("x", function (d) {return x(d.data.name)})
              .attr("y", function (d) {return y(d[1])})
              .attr("height", function (d) {return y(d[0]) - y(d[1])})
              .attr("width", x.bandwidth())
              .on("mouseover", function() { tooltip.style("display", null); })
              .on("mouseout", function() { tooltip.style("display", "none"); })
              .on("mousemove", function(d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.data.name);
              });

            //   //tooltips
            // .on("mouseover", function(d) {
            //   localThis.$emit('jsc_mouseover', d)
            //   // find the amount by subtracting the two values in array
            //   var difference = d[1] - d[0];
            //   // debugger
            //   tooltip.transition()
            //       .duration(100)
            //   .style("opacity", 1);
            //         tooltip.html("Amount: " + "<b>" + d.data + "</b>" +
            //           "<br>" + "Amount" + ": " + "<b>" + difference + "</b>")
            //       .style("left", (d3.event.pageX + 5) + "px")
            //       .style("top", (d3.event.pageY - 28) + "px");
            //     })
            //   .on("mouseout", function(d) {
            //     tooltip.transition()
            //       .duration(300)
            //       .style("opacity", 0);
            //   })

            tooltip.append("rect")
              .attr("width", 30)
              .attr("height", 20)
              .attr("fill", "white")
              .style("opacity", 0.5);

            tooltip.append("text")
              .attr("x", 15)
              .attr("dy", "1.2em")
              .style("text-anchor", "middle")
              .attr("font-size", "12px")
              .attr("font-weight", "bold");

        // Draw legend
          var legend = svg.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(30," + i * 25 + ")"; });
          legend.append("rect")
            .attr("x", width - 50)
            .attr("width", 25)
            .attr("height", 25)
            .attr("class", function(d, i) {return 'stack' + (keys.length - 1 - i);})
            .style("fill", function(d, i) {return colors.slice().reverse()[i];});
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
