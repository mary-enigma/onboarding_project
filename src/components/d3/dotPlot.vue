<template>

  <div style="width:100%;height:100%">
    <div :id="propID" style="width:100%;height:100%" class="dotPlot"/>
  </div>

</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";

  export default {
    name: 'dot-plot',
    props: {
      dataModel: {
        type: Object,
        default: ()=>{return {}}
      },
      propID: {
    		 type: String,
    		 default: 'dotplot'
  	  },
      xAxisRange: {
        type: Number,
        default: null
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
        setTimeout(function(){
          alert("Hello");
        }, 4000),
  			this.drawDotPlot(data, this.propID)
  		}
  	},
    mounted: function() {
  		this.dataModel.length !== 0 ? this.drawDotPlot(
        this._props.dataModel,
        this._props.propID,
        this._props.xAxisRange
      ) : null

  	},
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      //draws the visualization
      drawDotPlot: function (
        data = this.dataModel,
        id = this._props.propID,
        xrange = this._props.xAxisRange
      ) {
// debugger
        // var hoverLine = true;

        //place chart in correct div on main page
        let selection_string = "#" + id;
        // if($(selection_string + " svg") != null) {
        //   $(selection_string + " svg").remove();
        // }
        // d3.selectAll(`.${this.propID}_tooltip`).remove()

        var element = $(selection_string);

        //make margins and svg
    		var margin = {top: 90, right: 15, bottom: 50, left: 375},
            width = element.width() - margin.left - margin.right,
            height = element.height() - margin.top - margin.bottom;
        // var width = 800 - margin.left - margin.right,
        // 		height = 500 - margin.top - margin.bottom;
// debugger
        var svg = d3.select(selection_string).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // debugger
        //sorts the data by max (men's) earnings
        function sortBy(data, attribute, order) {
          // debugger
        	data.sort(function(a, b) {
          	if(parseInt(a[attribute]) < parseInt(b[attribute])) return 1 * order;
            if(parseInt(a[attribute]) > parseInt(b[attribute])) return -1 * order;
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
      // debugger

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
    plotData = data.children;
// debugger
      // use -1 to flip ordering
      // debugger
    	sortBy(plotData, "max", 1);

      y.domain(plotData.map(function(d) { return d.name }));
      //sets the x-axis manually for the second dot plot
      if(this.xAxisRange !== null){
        var xAxisDomain = this.xAxisRange.toString()
        // debugger
        // console.log(xAxisDomain)
        // x.domain([0, d3.max(plotData, function(d) {
        //   // debugger
          // console.log(typeof(xAxisDomain))
        //   console.log(+d.max)
        //   return +d.max
        // })]);
        x.domain([0, xAxisDomain]);
        // console.log(plotData)
      } else {
        // x.domain([0, d3.max(plotData, function(d) {
        //   // debugger
        //   // console.log(this.xAxisRange)
        //   // console.log(d.max)
        //   return +d.max
        //   // console.log(+d.max)
        // })]);
        x.domain([0, d3.max(plotData, function(d) {
          return +d.max
        })]);
      };
      // debugger
      x.nice();

      yAxis = d3.axisLeft().scale(y)
    		.tickSize(0);

        // debugger
      xAxis = d3.axisTop().scale(x)
        .tickFormat(function(d,i) {
          if (i == 0) {
            return "$0"
          } else {
            // debugger
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
// debugger
//[Array(10)]
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
// debugger
      endCircles = lollipops.append("circle")
        .attr("class", "lollipop-end")
        .attr("r", 5)
        .attr("cx", function(d) {
          return x(d.max);
        })
        .on("mouseover", showLabel)
        .on("mousemove", moveLabel)
        .on("mouseout", hideLabel);
// debugger
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
// debugger
    }
  }
}
</script>

<style>
  /* body {
    font-family: sans-serif;
    font-size: 12px;
    margin: 0;
  } */

  .checkbox {
    position: absolute;
    top: 15px;
    left: 15px;
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
