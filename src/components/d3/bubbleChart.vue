<template>

  <div style="width:100%;height:100%">
    <!-- <resize-observer @notify="resizeSVG"></resize-observer> -->
    <div :id="propID" style="width:100%;height:100%" class="bubbleChart"/>
  </div>

</template>

<script>
  import * as d3 from 'd3';
  import $ from "jquery";
  // import { ResizeObserver } from 'vue-resize';

  export default {
    name: 'bubble-chart',
    components: {
      'resize-observer': ResizeObserver
    },
    props: {
      dataModel: {
      },
      propID: {
    		 type: String,
    		 default: 'bubbleChart'
  	  }
    },
    data: function() {
        return {
  		      name: "bubbleChart"
        }
    },
  	watch: {
      // dataModel: function(data) {
  		// 	// console.log('BarChart dataModel changed')
  		// 	if (this.internalData.length === 0) {
  		// 		this.update = false
  		// 	} else {
  		// 		this.update = true
  		// 	}
      //   // debugger
  		// 	this.drawBubbleChart(data)
  		// }
  	},
    mounted: function() {
      // debugger
      // setTimeout(function(){
      //   this.dataModel.length !== 0 ? this.drawBubbleChart(
      //   this._props.dataModel,
      //   this._props.propID,
      //   this._props.yaxisLabel,
      //   this._props.xaxisLabel
      // ) : null }, 100000000);
      // debugger
  		this.dataModel.length !== 0 ? this.drawBubbleChart(
        this._props.dataModel,
        this._props.propID
      ) : null
// debugger

      //   setTimeout(function(){
      //     this.drawBubbleChart(this._props.dataModel,
      //   this._props.propID);
      // }, 5000);

  	},
    destroyed() {
      d3.selectAll(`.${this.propID}_tooltip`).remove()
    },
    methods: {
      //resizes the SVG when DOM resizes
      resizeSVG: function(){
        this.dataModel.length !== 0 ? this.drawBubbleChart() : null;
      },

      //draws the visualization
      drawBubbleChart: function (
        data = this.dataModel,
        id = this._props.propID
      ) {
        // debugger

          let selection_string = "#" + id;

            var diameter = 960; //960
            var height = 800; //800
            var color = d3.scaleOrdinal(d3.schemeSet3);
            // var w = 500;
            // var h = 100;
            var scaleRadius = d3.scaleLinear()
              .domain(d3.extent(data.children, function(d){
                // debugger
                  return d.Count
                }))
                .range([100, -30]);

            // var rScale = d3.scaleLog();
            // rScale.domain([1, 100]).range([1, 600])

            var bubble = d3.pack(data)
                .size([diameter, height])
                .padding(.5);

            var svg = d3.select(selection_string)
                .append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
                .attr("class", "bubble");

            // var tooltip = d3.select("body")
            // 	.append("div")
            // 	.style("position", "absolute")
            // 	.style("z-index", "10")
            // 	.style("visibility", "hidden")

            // Define the div for the tooltip
          var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

            var nodes = d3.hierarchy(data)
                .sum(function(d) { return d.Count; });

            var node = svg.selectAll(".node")
                .data(bubble(nodes).descendants())
                .enter()
                .filter(function(d){
                    return  !d.children
                })
                .append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })


            // node.append("title")
            //     .text(function(d) {
            //         return d.data.Name + ": " + d.data.Count;
            //     });

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

            node.append("circle")
                .attr("r", function(d) {
                    return scaleRadius(d.r)
                })
                .style("fill", function(d,i) {
                    return color(i);
                })
                .on("mouseover", function(d) {
                  tooltip.text(d.data.Name + ": " + d.data.Count);
                  tooltip.style("visibility", "visible");
                })
                .on("mousemove", function() {
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

            node.append("text")
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", function(d){
                    return d.r/5;
                })
              //   .attr("font-size", function(d) {
              //     var len = d.data.Name.substring(0, d.r / 3).length;
              //     var size = d.r/3;
              //     size *= 10 / len;
              //     size += 1;
              //     return Math.round(size)+'px';
              // })
                .text(function(d) {
                    var longText = d.data.Name.substring(0, d.r / 3)
                    var text = longText.split(" ")[0].replace( /,/g, "" );
                    return text
                })
                .attr("fill", "black");

            node.append("text")
                .attr("dy", "1.3em")
                .style("text-anchor", "middle")
                .text(function(d) {
                    return d.data.Count;
                })
                .attr("font-family",  "Gill Sans", "Gill Sans MT")
                .attr("font-size", function(d){
                    return d.r/2;
                })
                .attr("fill", "black");

            d3.select(self.frameElement)
                .style("height", diameter + "px");
      }
  }
}
</script>

<style>

  div.tooltip {
    position: absolute;
    text-align: center;
    padding: 5px;
    font: 12px sans-serif;
    background: white;
    border: 1px black solid;
    border-radius: 4px;
    pointer-events: none;
  }

</style>
