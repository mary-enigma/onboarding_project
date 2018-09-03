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

  export default {
    name: 'HelloWorld',
    data () {
      return {
        info: null,
        loading: true,
        errored: false,
        dotPlotData: []
      }
    },
    components: {
      'dot-plot': DotPlot
    },
    mounted(){
      axios
      .get('https://public.enigma.com/api/snapshots/3ca9486a-db7c-4216-8e99-0428e3b0b54d?&row_limit=1000&row_offset=0&include_serialids=true')
      .then(response => {
        var resp = response.data
        console.log(resp)
        this.filterData(resp)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },
    created(){
      this.dotPlotData = {
        "pay_ratios_2015_16":[
      {
         "name":"Birkbeck",
         "max":350064,
         "min":19316,
         "median":41772,
         "apprentice":12073
      },
      {
         "name":"Brunel",
         "max":295000,
         "min":8676,
         "median":36875,
         "apprentice":8676
      },
      {
         "name":"City",
         "max":308000,
         "min":18780,
         "median":47385,
         "apprentice":16718
      },
      {
         "name":"Goldsmiths",
         "max":242640,
         "min":17154,
         "median":32125
      }]
      }
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
        // debugger
        this.info = filteredData
        return this.info
      }
    },
    dotPlot1: function(data){
      // debugger
      console.log(this.info)
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
