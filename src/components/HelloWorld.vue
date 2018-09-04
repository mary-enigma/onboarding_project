<template>
  <div class=main>
    <div class="hello">
      <p>something</p>
      <p>somthing else</p>
      <!-- {{ info }} -->
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment. Please try again later.</p>
    </section>
    </div>
    <div class="charts">
      <div class="dot-plot">
          <dot-plot
            :dataModel='dotPlot1Data'
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
        dotPlot1Data: []
      }
    },
    components: {
      'dot-plot': DotPlot
    },
    mounted(){

    },
    created(){
      //this gets all the data
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

      // this.dotPlot1Data = {
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
      //filters out metadata
      filterData: function(resp){
        let filteredData = resp.table_rows.rows
        this.info = filteredData
        this.filterDotPlot1Data(this.info)
        // debugger
        return this.info
      },
      filterDotPlot1Data: function(data){

        //choose selected fields for the first dot plot
        var filteredValues = ["Legislators", "Materials engineers", "Dental assistants", "Waiters and waitresses"]

        // filter by these fields
        var result = data.filter((e)=>{
          return filteredValues.includes(e[0])
        })
        // debugger
        this.mapFilteredData(result);
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
        this.dotPlot1Data = mappedDotPlot1
        // debugger
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
