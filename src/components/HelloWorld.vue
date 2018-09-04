<template>
  <div class=main>
    <div class="hello">
      <p>something</p>
      <p>somthing else</p>
      {{ info }}
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment. Please try again later.</p>
    </section>
    </div>
    <div class="charts">
      <div class="dot-plot">
          <dot-plot
            :dataModel='dotPlotData'
            title='First Dot Plot'
          ></dot-plot>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'vue-resize/dist/vue-resize.css';
  import DotPlot from './d3/dotPlot.vue';
  import * as d3 from "d3";
  import _ from 'lodash';

  export default {
    name: 'HelloWorld',
    data () {
      return {
        info: null,
        loading: true,
        errored: false,
        // dotPlotData: []
      }
    },
    components: {
      'dot-plot': DotPlot
    },
    mounted(){

    },
    created(){
      axios
      .get('https://public.enigma.com/api/snapshots/3ca9486a-db7c-4216-8e99-0428e3b0b54d?&row_limit=1000&row_offset=0&include_serialids=true')
      .then(response => {
        var resp = response.data
        this.filterData(resp)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)

      // this.dotPlotData = {
      //   "pay_ratios_2015_16":[
      // {
      //    "name":"Birkbeck",
      //    "max":350064,
      //    "min":19316,
      //    "median":41772,
      //    "apprentice":12073
      // },
      // {
      //    "name":"Brunel",
      //    "max":295000,
      //    "min":8676,
      //    "median":36875,
      //    "apprentice":8676
      // },
      // {
      //    "name":"City",
      //    "max":308000,
      //    "min":18780,
      //    "median":47385,
      //    "apprentice":16718
      // },
      // {
      //    "name":"Goldsmiths",
      //    "max":242640,
      //    "min":17154,
      //    "median":32125
      // }]
      // }
    },
    methods: {
      filterData: function(resp){
        let filteredData = resp.table_rows.rows
        //gets all the occupation names
        // Object.values(filteredData).map((val)=>{console.log(val[0])})
        // debugger
        // let vals = Object.values(filteredData).forEach(function(val) {
        //   debugger
        //   if(vals[0] == "Management Occupations") {
        //
        //   }
        // })
        this.info = filteredData
        this.filterDotPlot1Data(this.info)
        return this.info
      },
      filterDotPlot1Data: function(data){

        //choose selected fields for the first dot plot
        var filteredValues = ["Legislators", "Materials engineers", "Dental assistants", "Waiters and waitresses"]

        // filter by these fields
        var result = data.filter((e)=>{
          // debugger
          return filteredValues.includes(e[0])
        })
        // debugger
        this.mapFilteredData(result);
        // var mappedData = {}
        // item[0]=="Barbers"
        // mappedData["name"] = item[0]
        // mappedData["median-men"] = item[12]
        // mappedData["median-women"] = item[14]
        // newData.push(mappedData)



        // var filteredValues = ["Legislators", "Materials engineers", "Dental assistants", "Waiters and waitresses"]
        //
        // var newData = []
        // var result = data.filter((e)=>{
        //   // debugger
        //   return filteredValues.includes(e[0])
        //   // var mappedData = {}
        //   // item[0]=="Barbers"
        //   // mappedData["name"] = item[0]
        //   // mappedData["median-men"] = item[12]
        //   // mappedData["median-women"] = item[14]
        //   // newData.push(mappedData)
        // })

        // return newData;

        // var data = [{"id":"123","color":"Red","model":"Tesla"},{"id":"124","color":"Black","model":"Honda"},{"id":"125","color":"Red","model":"Audi"},{"id":"126","color":"Blue","model":"Tesla"}]
        //
        // var keys = ["color", 'model'];
        // var values = ["Tesla", "Audi", "Red"];
        //
        // var result = data.filter(function(e) {
        //   return keys.every(function(a) {
        //     return values.includes(e[a])
        //   })
        // })

         // let mappedDotPlot1 = [];
         // var filtered = Object.values(data).map((val)=>{
         //   var newData = []
         //   console.log(val.filter(x => x[0].some(g => filteredData.includes(g))))
         //   // console.log(filteredValues.some(el => val[0].includes(el)))
         //    // newData.push(test1)
         //   })
           // debugger
           // console.log(newData)
           // return newData

         // filters = ['Romance', 'Drama']

         //[{'title': 'a', 'genres': ['Romance', 'Comedy']},
         // {'title': 'b', 'genres': ['Drama', 'Comedy']}]

         // console.log(movies.filter(x => x.genres.some(g => filters.includes(g))))


      // //   //filter to get just the fields I want
      // var vals = Object.values(this.info)
      //
      // var filtered = _.filter(vals, function(o) { return vals[0]=="Legistators"; });
      // debugger


// => objects for ['fred']
      //   function filterData(data) {
      //     Object.values(this.info).map((val)=>{
      //     _.filter(data, function(item){ return _.contains(val[0] == 'Legislators', val[0] == 'Materials engineers', ); })
      //   }
      // })
      //
      //   //put those fields into an object
      //
      //   // debugger

           // console.log(data)
          //  var filteredData = this.info.filter(function(item){
          //    debugger
          //    return item[0] == "Legislator"
          //  })
          //
          // console.log(filteredData)
        // let mappedDotPlot1 = [];
        // Object.values(this.info).filter((val)=>{
        //   if(val[0].includes["Legistators" || "Materials engineers" || "Dental assistants"|| "Waiters and waitresses"]){
        //     var mappedData = {}
        //           mappedData["name"] = val[0]
        //           mappedData["median-men"] = val[12]
        //           mappedData["median-women"] = val[14]
        //           mappedDotPlot1.push(mappedData)
        //   }
        //   // debugger
        // })
        // console.log(mappedDotPlot1)
      //   Object.values(this.info).map((val)=>{
      //     if(val[0]){
      //       var mappedData = {}
      //       mappedData["name"] = val[0]
      //       mappedData["median-men"] = val[12]
      //       mappedData["median-women"] = val[14]
      //       mappedDotPlot1.push(mappedData)
      //       debugger
      //     }
      //   //   else if(val[0] == 'Materials engineers') {
      //   //     var mappedData = {}
      //   //     mappedData["name"] = 'Materials and engineers'
      //   //     mappedData["median-men"] = val[12]
      //   //     mappedData["median-women"] = val[14]
      //   //     mappedDotPlot1.push(mappedData)
      //   //   } else if(val[0] == 'Dental assistants') {
      //   //     var mappedData = {}
      //   //     mappedData["name"] = 'Dental assistants'
      //   //     mappedData["median-men"] = val[12]
      //   //     mappedData["median-women"] = val[14]
      //   //     mappedDotPlot1.push(mappedData)
      //   //   } else if(val[0] == 'Waiters and waitresses') {
      //   //     var mappedData = {}
      //   //     mappedData["name"] = 'Waiters and waitresses'
      //   //     mappedData["median-men"] = val[12]
      //   //     mappedData["median-women"] = val[14]
      //   //     mappedDotPlot1.push(mappedData)
      //   // } else {
      //   //   return mappedDotPlot1
      //   // }
      // })
    //  this.dotPlotData = mappedDotPlot1
  },
  //map data to object so we can make graph
  mapFilteredData(data){
    var mappedDotPlot1 = []
    data.map((val)=>{
      var mappedData = {}
      mappedData["name"] = val[0]
      mappedData["median-men"] = val[12]
      mappedData["median-women"] = val[14]
      mappedDotPlot1.push(mappedData)
    })
    // return mappedDataPlot1;
    this.dotPlotData = mappedDotPlot1
    debugger
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
