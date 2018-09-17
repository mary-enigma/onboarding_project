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
        var margin = {top: 30, right: 60, bottom: 50, left: 40},
          width = element.width() - margin.left - margin.right,
          height = element.height() - margin.top - margin.bottom;
// debugger

          //make div for tooltips
          var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

          var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "12px sans-serif")
            .text("tooltip");

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

          //set x, y axis and color
          var x = d3.scaleBand()
          //width leaves room for legend
            .range([0, width - 25], .1)
            .padding(0.1);

          var y = d3.scaleLinear()
            .range([height, 0]);

          var colors = ["#4A89DC", "D770AD"]
          var stack = d3.stack()
              .keys(keys)
              .order(d3.stackOrderNone)
              .offset(d3.stackOffsetNone);

          var layers = stack(data);
          x.domain(data.map(function (d) {
            return d.name;
          }));
           y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[1]; }) ]).nice();
          var ticks = data.map(function (d) {
            return d.name;
          })
          if (ticks.length > 11) {
            ticks = ticks.filter(function(t, i) { return i % 6 === 0; })
          }

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
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll(".tick text")
            .call(wrap, x.bandwidth());

            //function to wrap text for long x-axis labels
            function wrap(text, width) {
              text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
                while (word = words.pop()) {
                  line.push(word)
                  tspan.text(line.join(" "))
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop()
                  tspan.text(line.join(" "))
                  line = [word]
                  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
                }
              }
            })
          }

            var layer = svg.selectAll(".stack")
              .data(layers)
              .enter().append("g")
              .attr("class", function (d, i) {return 'stack' + i;})
              .style("fill", function (d, i) {return colors[i];});

            //create the stacks and activate tooltips
            layer.selectAll("rect")
              .data(function (d) {return d;})
              .enter()
              .append("rect")
              .attr("class", "stackedBar")
              .attr("x", function (d) {return x(d.data.name)})
              .attr("y", function (d) {return y(d[1])})
              .attr("height", function (d) {return y(d[0]) - y(d[1])})
              .attr("width", x.bandwidth())
              .on("mouseover", function(d) {
                // tooltip.text("Women: " + d.data.women + "\nMen: " + d.data.men);
                tooltip.html("Women: " + d.data.women + "<br />" + "Men: " + d.data.men)
                tooltip.style("visibility", "visible");
              })
              .on("mousemove", function() {
                  return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
              })
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

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
            .style("fill", function(d, i) {return colors.slice()[i];});
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

  svg {
    font: 10px sans-serif;
    shape-rendering: crispEdges;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
  }

  /* path.domain {
    stroke: none;
  } */

  .y .tick line {
    stroke: #ddd;
  }

  div.tooltip {
    position: absolute;
    text-align: center;
    color: white;
    padding: 8px;
    font: 12px sans-serif;
    /* background-color: rgba(0, 0, 0, 0.75); */
    font: 12px sans-serif;
    border-radius: 6px;
    pointer-events: none;
  }
</style>
