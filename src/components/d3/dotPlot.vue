<template>

  <div style="width:100%;height:100%">
    <!-- <resize-observer @notify="resizeSVG"></resize-observer> -->
    <div :id="propID" style="width:100%;height:100%" class="dotPlot"/>
  </div>

</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  // import { ResizeObserver } from 'vue-resize';

  export default {
    name: 'dot-plot',
    components: {
      'resize-observer': ResizeObserver
    },
    props: {
      dataModel: {
        type: Object,
        default: ()=>{return {}}
      },
      xaxisLabel: {
    		 type: String,
    		 default: ''
      },
      yaxisLabel: {
    		 type: String,
    		 default: ''
  	  },
      propID: {
    		 type: String,
    		 default: 'dotplot'
  	  }
    },
    data: function() {
        return {
  		      name: "dotPlot"
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
        // debugger
  			this.drawDotPlot(data)
  		}
  	},
    mounted: function() {
      // debugger
      // setTimeout(function(){
      //   this.dataModel.length !== 0 ? this.drawDotPlot(
      //   this._props.dataModel,
      //   this._props.propID,
      //   this._props.yaxisLabel,
      //   this._props.xaxisLabel
      // ) : null }, 100000000);
      // debugger
  		this.dataModel.length !== 0 ? this.drawDotPlot(
        this._props.dataModel,
        this._props.propID,
        this._props.yaxisLabel,
        this._props.xaxisLabel
      ) : null

  	},
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      //resizes the SVG when DOM resizes
      resizeSVG: function(){
        this.dataModel.length !== 0 ? this.drawDotPlot() : null;
      },
      //draws the visualization
      drawDotPlot: function (
        data = this.dataModel,
        id = this._props.propID,
        yAxisLabel = this._props.yaxisLabel,
        xAxisLabel = this._props.xaxisLabel
      ) {
        // debugger
        var hoverLine = true;

        d3.select(".sort-by")
        	.on("change", function() {
          	var attribute = d3.select(this).property("value");
          	sortLollipops(attribute, 1);
        	});

        //make margins and svg
    		var margin = {top: 120, right: 100, bottom: 50, left: 150};

        var width = 960 - margin.left - margin.right,
        		height = 500 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //sorts the data by max (men's) earnings
        function sortBy(data, attribute, order) {
        	data.sort(function(a, b) {
            // debugger
          	if(a[attribute] < b[attribute]) return 1 * order;
            if(a[attribute] > b[attribute]) return -1 * order;
            return 0;
        	});
        }

    // need to rewrite so start, min, lowest are the same
    var classToPos = {
      "lollipop-start": "min",
      "lollipop-end": "max"
    }

    var legendLabels = [
      {label: "Women", class: "lollipop-start"},
      {label: "Men", class: "lollipop-end"}
    ];

    var legendX = 300,
    		legendY = -50,
    		spaceBetween = 70,
        titleOffset = -150;

   	// positioning legend
    var legend = svg.append("g")
    	.attr("transform", "translate(" + [legendX, legendY] + ")");

   	legend.append("g")
    	.attr("class", "title")
      .append("text")
    	.attr("x", titleOffset)
      .text("Median Earnings ($)")

    // add circles
    legend.selectAll("circle")
    	.data(legendLabels)
    .enter().append("circle")
    	.attr("cx", function(d, i) {
      	return spaceBetween * i;
    	})
    	.attr("cy", -4)
    	.attr("r", 5)
    	.attr("class", function(d) { return d.class });

    // add labels
    legend.append("g")
      .selectAll("text")
    	.data(legendLabels)
      .enter().append("text")
      .attr("x", function(d, i) {
      	return spaceBetween * i + 10;
    	})
    	.text(function(d) { return d.label });

    // Append div
    var div = d3.select("body").append("div")
    	.attr("class", "tooltip")
    	.style("opacity", 0);

    // var posToColour = {
    //   min: "#D770AD",
    //   max: "#4A89DC"
    // };

    var y = d3.scaleBand()
    	.range([0, height])
    	.paddingInner(0.5)
    	.paddingOuter(0.7);

    var x = d3.scaleLinear()
    	.range([0, width]);

    var lineGenerator = d3.line();

    var axisLinePath = function(d) {
      return lineGenerator([[x(d) + 0.5, 0], [x(d) + 0.5, height]]);
    };

   	var lollipopLinePath = function(d) {
      return lineGenerator([[x(d.min), 0], [x(d.max), 0]]);
    };

    var selectionLine,
        lollipops,
        yAxis,
        yAxisGroup,
        xAxis,
        xAxisGroup,
        axisLines,
        lollipopsGroup;

    var startCircles,
        endCircles;

    // Make global for now
    // var dotPlotData;
    var plotData;

    // var url = "https://raw.githubusercontent.com/tlfrd/pay-ratios/master/data/payratio.json"
    plotData = data.plot1;
// debugger
      // use -1 to flip ordering
      // debugger
    	sortBy(plotData, "max", 1);

      y.domain(plotData.map(function(d) { return d.name }));
      x.domain([0, d3.max(plotData, function(d) { return d.max })]);
      x.nice();

      yAxis = d3.axisLeft().scale(y)
    		.tickSize(0);

      xAxis = d3.axisTop().scale(x)
        .tickFormat(function(d,i) {
          if (i == 0) {
            return "$0"
          } else {
            return d3.format(".2s")(d);
          }
        });

      yAxisGroup = svg.append("g")
      	.attr("class", "y-axis-group");

      yAxisGroup.append("g")
        .attr("class", "y-axis")
      	.attr("transform", "translate(-20, 0)")
        .call(yAxis)
				.select(".domain")
        .attr("opacity", 0);

      xAxisGroup = svg.append("g")
        .attr("class", "x-axis-group");

      xAxisGroup.append("g")
      	.attr("class", "x-axis")
        .call(xAxis);

      axisLines = svg.append("g")
      	.attr("class", "grid-lines");

    	axisLines.selectAll("path")
        .data(x.ticks())
      .enter().append("path")
        .attr("class", "grid-line")
        .attr("d", axisLinePath);

      selectionLine = xAxisGroup.append("g")
      	.attr("class", "interactive")
        .append("path")
        .attr("class", "selection-line")
        .attr("d", function() {
          return lineGenerator([[width / 2, 0],[width / 2, height]])
        })
        .attr("opacity", 0);

      lollipopsGroup = svg.append("g").attr("class", "lollipops");

     	lollipops = lollipopsGroup.selectAll("g")
        .data(plotData)
      .enter().append("g")
        .attr("class", "lollipop")
        .attr("transform", function(d) {
          return "translate(0," + (y(d.name) + (y.bandwidth() / 2)) + ")";
        })

      lollipops.append("path")
        .attr("class", "lollipop-line")
        .attr("d", lollipopLinePath);

      startCircles = lollipops.append("circle")
    	.attr("class", "lollipop-start")
    	.attr("r", 5)
      .attr("cx", function(d) {
      	return x(d.min);
    	})
    	.on("mouseover", showLabel)
    	.on("mousemove", moveLabel)
      .on("mouseout", hideLabel);

      endCircles = lollipops.append("circle")
        .attr("class", "lollipop-end")
        .attr("r", 5)
        .attr("cx", function(d) {
          return x(d.max);
        })
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel);

    function showLabel() {
       	var selection = d3.select(this);
        var pos = classToPos[selection.attr("class")];
        var data = d3.select(this.parentNode).datum();

        div.transition()
        	.duration(100)
        	.style("opacity", 1)
        div.html("$" + (selection.datum()[pos]))
          .style("left", (d3.event.pageX - 30) + "px")
          .style("top", (d3.event.pageY - 40) + "px")
        	.style("background-color", "rgba(0, 0, 0, 0.75)")
    }

    function moveLabel() {
      div.style("left", (d3.event.pageX - 30) + "px")
        .style("top", (d3.event.pageY - 40) + "px")
    }

    function hideLabel() {
      div.transition()
        .duration(200)
        .style("opacity", 0);

     	selectionLine
      	.attr("opacity", 0);
    }

    function sortLollipops(attribute, ordering) {
      // debugger
      sortBy(plotData, attribute, 1);

			y.domain(plotData.map(function(d) { return d.name })).copy();

        lollipops
          .transition()
          .attr("transform", function(d) {
            return "translate(" + [0, (y(d.name) + y.bandwidth() / 2)] + ")";
          });

        yAxisGroup.select(".y-axis")
          .transition()
          .call(yAxis);
        }
    }
  }
}
</script>

<style>
  body {
    font-family: sans-serif;
    font-size: 12px;
    margin: 0;
  }

  .checkbox {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .dropdown {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  text {
    font-size: 12px;
  }

  .title {
    font-weight: bold;
  }

  .grid-line {
    stroke: black;
    opacity: 0.2;
  }

  .rect-label {
    stroke: black;
  }

  .selection-line {
    stroke: black;
    stroke-dasharray: 5,5;
  }

  .hover-label {
    background-color: blue;
  }

  .lollipop-line {
    stroke: black;
    stroke-width: 1px;
  }

  circle {
    stroke-width: 1px;
    stroke: black;
  }

  circle.lollipop-start {
    fill: #D770AD;
  }

  .lollipop-end {
    fill: #4A89DC;
  }

  .lollipop-median {
    fill: white;
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
