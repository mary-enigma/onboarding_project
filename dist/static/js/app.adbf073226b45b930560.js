webpackJsonp([1],{"+xw1":function(t,e,a){t.exports=a.p+"static/img/pay-graphic.c9aca3d.jpg"},"0cSW":function(t,e){},"2woA":function(t,e,a){t.exports=a.p+"static/img/intro-image.78c005e.jpg"},"7zck":function(t,e){},"8Lmw":function(t,e){},CIDZ:function(t,e,a){t.exports=a.p+"static/img/complexity.e2fe058.jpg"},Hp3F:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=a("VU/8")({name:"App"},i,!1,function(t){a("xfJ/")},null,null).exports,s=a("/ocq"),o=a("mtWM"),l=a.n(o),c=(a("Hp3F"),a("vwbq")),d=a("7t+N"),p=a.n(d),u={name:"dot-plot",components:{"resize-observer":ResizeObserver},props:{dataModel:{type:Object,default:function(){return{}}},propID:{type:String,default:"dotplot"},xAxisRange:{type:Number,default:null}},data:function(){return{name:"dotPlot"}},watch:{dataModel:function(t){0===this.internalData.length?this.update=!1:this.update=!0,setTimeout(function(){alert("Hello")},4e3),this.drawDotPlot(t,this.propID)}},mounted:function(){0!==this.dataModel.length&&this.drawDotPlot(this._props.dataModel,this._props.propID,this._props.xAxisRange)},destroyed:function(){c.p("."+this.propID+"_tooltip").remove()},methods:{resizeSVG:function(){0!==this.dataModel.length&&this.drawDotPlot()},drawDotPlot:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.dataModel,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._props.propID,a=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:this._props.xAxisRange,"#"+e),n=p()(a),i=90,r=15,s=50,o=375,l=n.width()-o-r,d=n.height()-i-s,u=c.o(a).append("svg").attr("width",l+o+r).attr("height",d+i+s).append("g").attr("transform","translate("+o+","+i+")");var h={"lollipop-start":"min","lollipop-end":"max"},f=[{label:"Women",class:"lollipop-start"},{label:"Men",class:"lollipop-end"}],m=u.append("g").attr("transform","translate("+[300,-50]+")");m.append("g").attr("class","title").append("text").attr("x",-150).text("Median Earnings ($)"),m.selectAll("circle").data(f).enter().append("circle").attr("cx",function(t,e){return 70*e}).attr("cy",-4).attr("r",5).attr("class",function(t){return t.class}),m.append("g").selectAll("text").data(f).enter().append("text").attr("x",function(t,e){return 70*e+10}).text(function(t){return t.label});var v,g,y,b,_,w,x=c.o("body").append("div").attr("class","tooltip").style("opacity",0),C=c.k().range([0,d]).paddingInner(.5).paddingOuter(.7),D=c.l().range([0,l]),k=c.h();if(function(t,e,a){t.sort(function(t,n){return parseInt(t[e])<parseInt(n[e])?1*a:parseInt(t[e])>parseInt(n[e])?-1*a:0})}(w=t.children,"max",1),C.domain(w.map(function(t){return t.name})),null!==this.xAxisRange){var S=this.xAxisRange.toString();D.domain([0,S])}else D.domain([0,c.i(w,function(t){return+t.max})]);function M(){var t=c.o(this),e=h[t.attr("class")];c.o(this.parentNode).datum();x.transition().duration(100).style("opacity",1),x.html("$"+t.datum()[e]).style("left",c.d.pageX-30+"px").style("top",c.d.pageY-40+"px").style("background-color","rgba(0, 0, 0, 0.75)")}function P(){x.style("left",c.d.pageX-30+"px").style("top",c.d.pageY-40+"px")}function A(){x.transition().duration(200).style("opacity",0),v.attr("opacity",0)}D.nice(),y=c.b().scale(C).tickSize(0),b=c.c().scale(D).tickFormat(function(t,e){return 0==e?"$0":c.f(".2s")(t)}),u.append("g").attr("class","y-axis-group").append("g").attr("class","y-axis").attr("transform","translate(-20, 0)").call(y).select(".domain").attr("opacity",0),(_=u.append("g").attr("class","x-axis-group")).append("g").attr("class","x-axis").call(b),u.append("g").attr("class","grid-lines").selectAll("path").data(D.ticks()).enter().append("path").attr("class","grid-line").attr("d",function(t){return k([[D(t)+.5,0],[D(t)+.5,d]])}),v=_.append("g").attr("class","interactive").append("path").attr("class","selection-line").attr("d",function(){return k([[l/2,0],[l/2,d]])}).attr("opacity",0),(g=u.append("g").attr("class","lollipops").selectAll("g").data(w).enter().append("g").attr("class","lollipop").attr("transform",function(t){return"translate(0,"+(C(t.name)+C.bandwidth()/2)+")"})).append("path").attr("class","lollipop-line").attr("d",function(t){return k([[D(t.min),0],[D(t.max),0]])}),g.append("circle").attr("class","lollipop-start").attr("r",5).attr("cx",function(t){return D(t.min)}).on("mouseover",M).on("mousemove",P).on("mouseout",A),g.append("circle").attr("class","lollipop-end").attr("r",5).attr("cx",function(t){return D(t.max)}).on("mouseover",M).on("mousemove",P).on("mouseout",A)}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{width:"100%",height:"100%"}},[e("div",{staticClass:"dotPlot",staticStyle:{width:"100%",height:"100%"},attrs:{id:this.propID}})])},staticRenderFns:[]};var f=a("VU/8")(u,h,!1,function(t){a("ORBH")},null,null).exports,m={name:"bubble-chart",components:{"resize-observer":ResizeObserver},props:{dataModel:{},propID:{type:String,default:"bubbleChart"}},data:function(){return{name:"bubbleChart"}},watch:{},mounted:function(){0!==this.dataModel.length&&this.drawBubbleChart(this._props.dataModel,this._props.propID)},destroyed:function(){c.p("."+this.propID+"_tooltip").remove()},methods:{resizeSVG:function(){0!==this.dataModel.length&&this.drawBubbleChart()},drawBubbleChart:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.dataModel,e="#"+(arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._props.propID),a=c.m(c.n),n=c.l().domain(c.e(t.children,function(t){return t.Count})).range([100,-30]),i=c.j(t).size([850,850]).padding(.5),r=c.o(e).append("svg").attr("width",850).attr("height",850).attr("class","bubble"),s=(c.o("body").append("div").attr("class","tooltip").style("opacity",0),c.g(t).sum(function(t){return t.Count})),o=r.selectAll(".node").data(i(s).descendants()).enter().filter(function(t){return!t.children}).append("g").attr("class","node").attr("transform",function(t){return"translate("+t.x+","+t.y+")"}),l=c.o("body").append("div").style("position","absolute").style("z-index","10").style("visibility","hidden").style("color","white").style("padding","8px").style("background-color","rgba(0, 0, 0, 0.75)").style("border-radius","6px").style("font","12px sans-serif").text("tooltip");o.append("circle").attr("r",function(t){return n(t.r)}).style("fill",function(t,e){return a(e)}).on("mouseover",function(t){l.text(t.data.Name+": "+t.data.Count+"%"),l.style("visibility","visible")}).on("mousemove",function(){return l.style("top",c.d.pageY-10+"px").style("left",c.d.pageX+10+"px")}).on("mouseout",function(){return l.style("visibility","hidden")}),o.append("text").attr("dy",".3em").style("text-anchor","middle").attr("font-family","sans-serif").attr("font-size",function(t){return t.r/5}).text(function(t){return t.data.Name.substring(0,t.r/3).split(" ")[0].replace(/,/g,"")}).attr("fill","black"),o.append("text").attr("dy","1.3em").style("text-anchor","middle").text(function(t){return t.data.Count+"%"}).attr("font-family","Gill Sans","Gill Sans MT").attr("font-size",function(t){return t.r/2}).attr("fill","black"),c.o(self.frameElement).style("height","850px")}}},v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{width:"100%",height:"100%"}},[e("div",{staticClass:"bubbleChart",staticStyle:{width:"100%",height:"100%"},attrs:{id:this.propID}})])},staticRenderFns:[]};var g=a("VU/8")(m,v,!1,function(t){a("orMz")},null,null).exports,y=a("fZjL"),b=a.n(y),_={name:"bar-chart",components:{"resize-observer":ResizeObserver},props:{dataModel:{type:Object,default:function(){return{}}},propID:{type:String,default:"stackedBarChart"}},data:function(){return{name:"bar-chart"}},watch:{dataModel:function(t){0===this.internalData.length?this.update=!1:this.update=!0,this.internalData=t,this.drawStackedBarChart(t)}},mounted:function(){0!==this.dataModel.length&&this.drawStackedBarChart(this._props.dataModel,this._props.propID)},destroyed:function(){c.p("."+this.propID+"_tooltip").remove()},methods:{resizeSVG:function(){0!==this.dataModel.length&&this.drawStackedBarChart()},drawStackedBarChart:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.dataModel,e="#"+(arguments.length>1&&void 0!==arguments[1]?arguments[1]:this._props.propID);null!=p()(e+" svg")&&p()(e+" svg").remove();var a=p()(e),n=30,i=60,r=50,s=40,o=a.width()-s-i,l=a.height()-n-r,d=(c.o("body").append("div").attr("class","tooltip").style("opacity",0),c.o("body").append("div").style("position","absolute").style("z-index","10").style("visibility","hidden").style("color","white").style("padding","8px").style("background-color","rgba(0, 0, 0, 0.75)").style("border-radius","6px").style("font","12px sans-serif").text("tooltip"));c.p("."+this.propID+"_tooltip").remove();var u=c.o(e).append("svg").attr("width",o+s+i).attr("height",l+n+r).append("g").attr("transform","translate("+s+","+n+")"),h=(t=this.dataModel.children,b()(t[0]).filter(function(t){return"name"!==t})),f=c.k().range([0,o-25],.1).padding(.1),m=c.l().range([l,0]),v=["#4A89DC","D770AD"],g=c.q().keys(h).order(c.s).offset(c.r)(t);f.domain(t.map(function(t){return t.name})),m.domain([0,c.i(g[g.length-1],function(t){return t[1]})]).nice();var y=t.map(function(t){return t.name});y.length>11&&(y=y.filter(function(t,e){return e%6==0}));var _=c.a().scale(f).tickValues(y),w=c.b().scale(m).tickSizeInner(25-o,0,0).ticks(6).tickFormat(function(t,e){return 0==e?"0":c.f(".2s")(t)});u.append("g").attr("class","y axis axis-stacked").call(w).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").attr("font-size","16px").text("Number of Workers"),u.append("g").attr("class","x axis").attr("transform","translate(0,"+l+")").call(_).selectAll(".tick text").call(function(t,e){t.each(function(){for(var t,a=c.o(this),n=a.text().split(/\s+/).reverse(),i=[],r=0,s=a.attr("y"),o=parseFloat(a.attr("dy")),l=a.text(null).append("tspan").attr("x",0).attr("y",s).attr("dy",o+"em");t=n.pop();)i.push(t),l.text(i.join(" ")),l.node().getComputedTextLength()>e&&(i.pop(),l.text(i.join(" ")),i=[t],l=a.append("tspan").attr("x",0).attr("y",s).attr("dy",1.1*++r+o+"em").text(t))})},f.bandwidth()),u.selectAll(".stack").data(g).enter().append("g").attr("class",function(t,e){return"stack"+e}).style("fill",function(t,e){return v[e]}).selectAll("rect").data(function(t){return t}).enter().append("rect").attr("class","stackedBar").attr("x",function(t){return f(t.data.name)}).attr("y",function(t){return m(t[1])}).attr("height",function(t){return m(t[0])-m(t[1])}).attr("width",f.bandwidth()).on("mouseover",function(t){d.html("Women: "+t.data.women+"<br />Men: "+t.data.men),d.style("visibility","visible")}).on("mousemove",function(){return d.style("top",c.d.pageY-10+"px").style("left",c.d.pageX+10+"px")}).on("mouseout",function(){return d.style("visibility","hidden")});var x=u.selectAll(".legend").data(v).enter().append("g").attr("class","legend").attr("transform",function(t,e){return"translate(30,"+25*e+")"});x.append("rect").attr("x",o-50).attr("width",25).attr("height",25).attr("class",function(t,e){return"stack"+(h.length-1-e)}).style("fill",function(t,e){return v.slice()[e]}),x.append("text").attr("x",o-20).attr("y",9).attr("dy",".35em").style("text-anchor","start").text(function(t,e){return h[e].slice(0,1).toUpperCase()+h[e].slice(1)})}}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{width:"100%",height:"100%"}},[e("div",{staticClass:"stackedBarChart",staticStyle:{width:"100%",height:"100%"},attrs:{id:this.propID}})])},staticRenderFns:[]};var x=a("VU/8")(_,w,!1,function(t){a("8Lmw")},null,null).exports,C={name:"autocomplete",props:{items:{},isAsync:{type:Boolean,required:!1,default:!1}},data:function(){return{isOpen:!1,results:[],name:"",search:"",isLoading:!1,arrowCounter:0,filteredData:[],displayItem:[]}},methods:{onChange:function(){this.$emit("input",this.search),this.isAsync?this.isLoading=!0:(this.filterResults(),this.isOpen=!0)},filterResults:function(){var t=this;this.filterData=this.items.filter(function(e){return e[0].toLowerCase().indexOf(t.search.toLowerCase())>-1}),this.results=this.filterData.map(function(t){return t[0]})},setResult:function(t){this.search=t,this.isOpen=!1,this.displayResult()},onArrowDown:function(t){this.arrowCounter<this.results.length&&(this.arrowCounter=this.arrowCounter+1)},onArrowUp:function(){this.arrowCounter>0&&(this.arrowCounter=this.arrowCounter-1)},onEnter:function(){this.search=this.results[this.arrowCounter],this.isOpen=!1,this.arrowCounter=-1,this.setResult(this.search)},handleClickOutside:function(t){this.$el.contains(t.target)||(this.isOpen=!1,this.arrowCounter=-1)},displayResult:function(){var t=this,e=this.filterData.filter(function(e){return e[0].toLowerCase().indexOf(t.search.toLowerCase())>-1});this.displayItem=e[0]}},watch:{items:function(t,e){t.length!==e.length&&(this.results=t,this.isLoading=!1)}},mounted:function(){document.addEventListener("click",this.handleClickOutside)},destroyed:function(){document.removeEventListener("click",this.handleClickOutside)}},D={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"autocomplete"},[a("label",{staticClass:"search-text"},[t._v("Search for a field (example: accountant):")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"input-box",attrs:{type:"text"},domProps:{value:t.search},on:{input:[function(e){e.target.composing||(t.search=e.target.value)},t.onChange],keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?t.onArrowDown(e):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?t.onArrowUp(e):null},function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onEnter(e):null}]}}),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],staticClass:"autocomplete-results",attrs:{id:"autocomplete-results"}},[t.isLoading?a("li",{staticClass:"loading"},[t._v("\n          Loading results...\n        ")]):t._l(t.results,function(e,n){return a("li",{key:n,staticClass:"autocomplete-result",class:{"is-active":n===t.arrowCounter},on:{click:function(a){t.setResult(e)}}},[t._v("\n          "+t._s(e)+"\n        ")])})],2)]),t._v(" "),a("div",{staticClass:"display-results"},[a("p",{staticClass:"search-text",staticStyle:{"font-size":"20px"}},[t._v("\n      Result:\n    ")]),t._v(" "),a("p",{staticClass:"result-text"},[t._v("\n      Field Name: "),a("span",{staticClass:"dis-results"},[t._v(" "+t._s(t.displayItem[0])+" ")]),a("br"),t._v("\n      Median earnings men: "),a("span",{staticClass:"dis-results"},[t._v(" "+t._s(t.displayItem[12])+" ")]),t._v(" "),a("br"),t._v("\n      Median earnings women: "),a("span",{staticClass:"dis-results"},[t._v(" "+t._s(t.displayItem[14])+" ")]),a("br"),t._v("\n      Women's earnings as a percentage of men's earnings: "),a("span",{staticClass:"dis-results"},[t._v(" "+t._s(t.displayItem[16])+" ")])]),t._v(" "),a("p",{staticClass:"footnote"},[t._v("\n      * (X) indicates fewer than 100 sample cases (either men or women) and is too small to meet statistical standards for reliability.\n    ")])])])},staticRenderFns:[]};var k=a("VU/8")(C,D,!1,function(t){a("Yz1e")},null,null).exports,S=a("ZZvs"),M=a.n(S),P=(a("kAs5"),{name:"Main",data:function(){return{info:{},loading:!0,errored:!1,dotPlot1Data:void 0,dotPlot2Data:void 0,dotPlot3Data:void 0,bubbleChartData:void 0,barChartData:void 0,dotPlot1DataLoaded:!1,dotPlot2DataLoaded:!1,dotPlot3DataLoaded:!1,barChartDataLoaded:!1,bubbleChartDataLoaded:!1,isLoading:!0,fullPage:!0}},components:{"dot-plot":f,"bar-chart":x,"bubble-chart":g,autocomplete:k,loading:M.a},mounted:function(){this.isLoading=!1},created:function(){var t=this;l.a.get("https://public.enigma.com/api/snapshots/3ca9486a-db7c-4216-8e99-0428e3b0b54d?&row_limit=1000&row_offset=0&include_serialids=true").then(function(e){var a=e.data;t.filterData(a)}).catch(function(e){console.log(e),t.errored=!0}).finally(function(){return t.isLoading=!1})},methods:{filterData:function(t){var e=t.table_rows.rows;return this.info=e,this.filterDotPlot1Data(this.info),this.filterDotPlot2Data(this.info),this.filterDotPlot3Data(this.info),this.filterBubbleData(this.info),this.filterBarData(this.info),this.info},filterDotPlot1Data:function(t){var e=["Driver/sales workers and truck drivers","First-line supervisors of retail sales workers","Elementary and middle school teachers","Registered nurses","Secretaries and administrative assistants","Customer service representatives","Retail salespersons","Accountants and auditors","Janitors and building cleaners","Laborers and freight, stock, and material movers, hand","Nursing, psychiatric, and home health aides","Cooks","First-line supervisors of office and administrative support workers","Sales representatives, wholesale and manufacturing","Construction laborers","Software developers, applications and systems software","First-line supervisors of non-retail sales workers","Cashiers"],a=t.filter(function(t){return e.includes(t[0])});this.mapFilteredData(a)},filterDotPlot2Data:function(t){var e=["Preschool and kindergarten teachers","Registered nurses","Nursing, psychiatric, and home health aides","Childcare workers","Librarians","Teacher assistants","Receptionists and information clerks","Medical assistants","Maids and housekeeping cleaners","Social workers"],a=t.filter(function(t){return e.includes(t[0])});this.mapFilteredData2(a)},filterDotPlot3Data:function(t){var e=["Driver/sales workers and truck drivers","Construction managers","Laborers and freight, stock, and material movers, hand","First-line supervisors of construction trades and extraction workers","Construction laborers","Software developers, applications and systems software","Grounds maintenance workers","Police and sheriff patrol officers","Carpenters","Pipelayers, plumbers, pipefitters, and steamfitters"],a=t.filter(function(t){return e.includes(t[0])});this.mapFilteredData3(a)},filterBubbleData:function(t){var e=["Management Occupations","Business and Financial Operations Occupations","Computer and Mathematical Occupations","Architecture and Engineering Occupations","Life, Physical, and Social Science Occupations","Community and Social Service Occupations","Legal Occupations","Education, Training, and Library Occupations","Arts, Design, Entertainment, Sports, and Media Occupations","Healthcare Practitioners and Technical Occupations","Healthcare Support Occupations","Protective Service Occupations","Food Preparation and Serving Related Occupations","Building and Grounds Cleaning and Maintenance Occupations","Personal Care and Service Occupations","Sales and Related Occupations","Office and Administrative Support Occupations","Farming, Fishing, and Forestry Occupations","Construction and Extraction Occupations","Installation, Maintenance, and Repair Occupations","Production Occupations","Transportation Occupations","Material Moving Occupations"],a=t.filter(function(t){return e.includes(t[0])});this.mapBubbleData(a)},filterBarData:function(t){var e=["Chief executives","General and operations managers","Computer and information systems managers","Transportation, storage, and distribution managers","Architectural and engineering managers","Marketing and sales managers"],a=t.filter(function(t){return e.includes(t[0])});this.mapBarData(a)},mapFilteredData:function(t){var e=[];t.map(function(t){var a={};a.name=t[0],a.max=t[12],a.min=t[14],e.push(a)});var a={};a.children=e,this.dotPlot1Data=a,this.dotPlot1DataLoaded=!0},mapBubbleData:function(t){var e=[];t.map(function(t){var a={};a.Name=t[0],a.Count=t[16],e.push(a)});var a={};a.children=e,this.bubbleChartData=a,this.bubbleChartDataLoaded=!0},mapFilteredData2:function(t){var e=[];t.map(function(t){var a={};a.name=t[0],a.max=t[12],a.min=t[14],e.push(a)});var a={};a.children=e,this.dotPlot2Data=a,this.dotPlot2DataLoaded=!0},mapFilteredData3:function(t){var e=[];t.map(function(t){var a={};a.name=t[0],a.max=t[12],a.min=t[14],e.push(a)});var a={};a.children=e,this.dotPlot3Data=a,this.dotPlot3DataLoaded=!0},mapBarData:function(t){var e=[];t.map(function(t){var a={};a.name=t[0],a.men=t[4],a.women=t[6],e.push(a)});var a={};a.children=e,this.barChartData=a,this.barChartDataLoaded=!0}},computed:{fetchInput:function(){console.log(this.info);var t=this;return this.info.filter(function(e){return e[0].indexOf(t.searchTerm.toLowerCase())>=0})},allDataLoaded:function(){return this.dotPlot1DataLoaded&&this.dotPlot2DataLoaded&&this.dotPlot3DataLoaded&&this.barChartDataLoaded&&this.bubbleChartDataLoaded}}}),A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.allDataLoaded?n("div",{staticClass:"main"},[n("div",{staticClass:"intro"},[n("img",{staticClass:"intro-image",attrs:{src:a("2woA"),width:"100%"}}),t._v(" "),n("div",{staticClass:"inner-intro"},[t._m(0),t._v(" "),n("div",{staticClass:"intro-text"},[t._m(1),t._v(" "),n("div",[n("v-btn",{staticClass:"intro-btn"},[n("a",{staticStyle:{"text-decoration":"none",color:"black"},attrs:{href:"https://public.enigma.com/datasets/full-time-year-round-workers-and-median-earnings-in-the-past-12-months-by-sex-and-detailed-occupation-2016/3616bd60-2fec-4cf6-99a3-477dae4afbb9",target:"_blank"}},[t._v("View the data")])])],1)])])]),t._v(" "),n("div",{staticClass:"dot-plot-overview"},[n("div",{staticClass:"dot-plot"},[n("h2",{staticClass:"dot1-title"},[t._v("Men's Earnings Compared to Women's for Selected Common Occupations")]),t._v(" "),n("dot-plot",{attrs:{dataModel:t.dotPlot1Data,propID:"dotPlot1"}})],1)]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),n("div",{staticClass:"explore-data"},[n("h2",{staticClass:"explore-title"},[t._v("Explore the Data")]),t._v(" "),n("p",{staticClass:"explore-text"},[t._v("\n      Enter a field to see median earnings by men and women as well as the pay gap for that field.\n    ")]),t._v(" "),n("autocomplete",{attrs:{items:t.info}})],1),t._v(" "),n("div",{staticClass:"bubble-chart"},[n("h2",{staticStyle:{"font-size":"24px"}},[t._v("Women's Earnings As A Percentage of Men's Earnings By General Field")]),t._v(" "),n("div",[n("bubble-chart",{attrs:{dataModel:t.bubbleChartData,propID:"bubbleChart"}})],1)]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),n("div",{staticClass:"comparison"},[n("div",{staticClass:"dot-plot"},[n("h2",[t._v("Selected Occupations Employing 75% Or More Men")]),t._v(" "),n("dot-plot",{attrs:{dataModel:t.dotPlot3Data,propID:"dotPlot3"}})],1),t._v(" "),n("div",{staticClass:"dot-plot",staticStyle:{"margin-top":"15px"}},[n("h2",[t._v("Selected Occupations Employing 75% or More Women")]),t._v(" "),n("dot-plot",{attrs:{dataModel:t.dotPlot2Data,propID:"dotPlot2",xAxisRange:11e4}})],1)]),t._v(" "),t._m(8),t._v(" "),n("div",{staticClass:"bar-chart"},[n("h2",[t._v("Number of Women Compared to Men in Selected High-Level Occupations")]),t._v(" "),n("div",{staticClass:"bar-chart-container"},[n("bar-chart",{attrs:{dataModel:t.barChartData,propID:"barChart"}})],1)]),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11)]):n("div",{staticClass:"loading-parent"},[n("loading",{attrs:{active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"intro-title"},[e("h1",[this._v("Exploring the Gender Pay Gap Through Public Data")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n          Nearly every occupation in the United States experiences a gender wage gap. Most people are familiar with the average pay gap statistic - in 2017, women were paid, on average, 82 cents for every dollar a man earns. However, the gap varies significantly by field - women are paid almost half of what men are paid (56.3%) in some legal occupations such as financial clerks, while architectural and engineering managers experience almost no gap (99.9%).\n        "),e("br"),this._v(" "),e("br"),this._v("\n        This project explores the gender wage gap by occupation through reported earnings by gender using data from the 2016 "),e("a",{attrs:{href:"https://www.census.gov/programs-surveys/acs/",target:"_blank"}},[this._v("American Community Survey")]),this._v(", available on "),e("a",{attrs:{href:"https://public.enigma.com/",target:"_blank"}},[this._v("Enigma Public")]),this._v(".\n        ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"about"},[e("h3",{staticStyle:{"font-size":"20px"}},[this._v("About the Data")]),this._v(" "),e("p",{staticClass:"about-text"},[this._v("\n      The dataset used for this project explored median earnings reported by men and women in 558 occupational categories. The data specified the number of full-time, year-round workers; the percentage of women in each occupational category; and women’s earnings as a percentage of men’s earnings (the gender pay gap). 334 out of 346 fields - or 96.5% - with large enough sample sizes (100+ cases) reported a pay gap. The gender wage gap refers to the average difference in pay for services rendered or work performed between men and women.\n    ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pay-graphic"},[e("img",{staticClass:"graphic",attrs:{src:a("+xw1"),width:"75%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"lightbulb-graphic"},[e("img",{staticClass:"graphic",attrs:{src:a("tVtC"),width:"100%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"complexity-text"},[e("h2",{staticStyle:{"font-size":"24px"}},[this._v("The Complexity of the Gender Wage Gap")]),this._v(" "),e("p",{staticClass:"comp-text"},[this._v("\n      Earnings data adjusted for gender provides valuable information. However, the wage gap goes beyond just earnings by field, or even equal pay for equal work. Factors such as unemployment and career disruption (women leaving the workforce for circumstances like child-bearing or family care, for example) significantly impact the gender pay gap. The gap widens even more when adjusting for race."),e("br"),e("br"),this._v("\n\n      This is not just a gender issue, but a societal one. Pay disparity has far-reaching economic consequences, contibuting to poverty rates among working women and their families.\n    ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"complexity-graphic"},[e("img",{staticClass:"graphic",attrs:{src:a("CIDZ"),width:"90%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compare-text"},[e("div",{staticClass:"text-block"},[e("h2",{staticClass:"top-title"},[this._v("Fields That Traditionally Employed Women Are Lower Paid")]),this._v(" "),e("p",{staticStyle:{"margin-top":"20px"}},[this._v("\n        An important aspect of the wage gap is that "),e("i",[this._v("fields that employ mostly women are lower paid")]),this._v(" than fields that employ mostly men.\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"top-text"},[e("div",{staticClass:"text-block"},[e("h3",{staticClass:"top-title"},[this._v("There are few women at the top.")]),this._v(" "),e("br"),this._v(" "),e("p",{staticClass:"top-text-text"},[this._v("\n        In addition to a wage gap, the data exposes an "),e("strong",[e("i",[this._v("opportunity gap")])]),this._v(" - there are less women in higher-level or advanced roles within their organizations.\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"resources-graphic"},[e("img",{staticClass:"graphic",attrs:{src:a("UAAN"),width:"75%"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"resources"},[a("div",{staticClass:"resources-text"},[a("h2",{staticClass:"resources-title"},[t._v("Resources")]),t._v(" "),a("p",[t._v("\n        Explore more data, dive deeper into the wage gap issue, and learn how you can help\n        "),a("ul",{staticClass:"help-links"},[a("li",[a("a",{attrs:{href:"https://blog.cultureamp.com/why-workplace-intersectionality-means-more-than-focusing-on-women",target:"_blank"}},[t._v("The importance of promoting workplace intersectionality")]),t._v(" "),a("i",[t._v("(Culture Amp)")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.usatoday.com/story/tech/2018/09/19/equity-gap-women-tech-get-half-stock-options-men-do/1353459002/",target:"_blank"}},[t._v("It's not just salary: the equity pay gap in tech")]),t._v(" "),a("i",[t._v("(USA Today)")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.nytimes.com/2018/05/13/business/gender-pay-britain.html",target:"_blank"}},[t._v("Flexible work schedules, agressive recruitment, transparent reporting: what governments and organizations are doing to close the gap")]),t._v(" "),a("i",[t._v("(The New York Times)")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://hbr.org/podcast/2018/02/mind-the-wage-gap",target:"_blank"}},[t._v("An overlooked aspect of the wage gap: age and its effects on earnings")]),t._v(" "),a("i",[t._v("(a podcast from the Harvard Business Review)")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.economist.com/international/2017/10/07/the-gender-pay-gap",target:"_blank"}},[t._v("Where the two roads diverge: motherhood, fatherhood, and the gender pay gap")]),t._v(" "),a("i",[t._v("(The Economist)")])])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footer"},[a("div",{staticClass:"about-enigma"},[a("h3",[t._v("About Enigma Public")]),t._v(" "),a("p",[a("a",{staticStyle:{color:"white"},attrs:{href:"https://public.enigma.com/"}},[t._v("Enigma Public")]),t._v(" is the world's broadest collection of public data and largest open government data source. With over 100,000 free datasets, Enigma is strongly committed to helping individuals and organizations gain a more comprehensive view of our world.\n      ")])]),t._v(" "),a("div",{staticClass:"about-project"},[a("h3",[t._v("About This Project")]),t._v(" "),a("p",[t._v("\n       Made by "),a("a",{staticStyle:{color:"white"},attrs:{href:"https://github.com/marya314"}},[t._v("Mary Boyd")]),t._v(".\n    ")])])])}]};var O=a("VU/8")(P,A,!1,function(t){a("0cSW")},null,null).exports;n.default.use(s.a);var E=new s.a({routes:[{path:"/",name:"Main",component:O}]}),L=a("A4r5"),I=a("3EgV"),R=a.n(I);a("7zck");n.default.use(R.a),n.default.use(L.a),n.default.config.productionTip=!1,new n.default({el:"#app",router:E,components:{App:r},template:"<App/>"})},ORBH:function(t,e){},UAAN:function(t,e,a){t.exports=a.p+"static/img/next-graphic.9cec622.jpg"},Yz1e:function(t,e){},kAs5:function(t,e){},orMz:function(t,e){},tVtC:function(t,e,a){t.exports=a.p+"static/img/lightbulb-graphic.9e35c0c.jpg"},"xfJ/":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.adbf073226b45b930560.js.map