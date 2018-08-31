<template>
  <div class="hello">
    <p>something</p>
    <p>somthing else</p>
    {{ info }}
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment. Please try again later.</p>
  </section>
  </div>
  <!-- <div class="chart-demo">
    <div class="dot-plot">
        <dot-plot
          :dataModel='dotPlotData'
          title='D3 Dot Plot'
        ></dot-plot>
      </div>
  </div> -->
</template>

<script>
  import axios from 'axios';
  import 'vue-resize/dist/vue-resize.css';
  // import dotPlot from '/d3/dotPlot.vue'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        info: null,
        loading: true,
        errored: false
      }
    },
    mounted(){
      axios
      .get('https://public.enigma.com/api/snapshots/3ca9486a-db7c-4216-8e99-0428e3b0b54d?&row_limit=500&row_offset=0&include_serialids=true')
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
    methods: {
      filterData: function(resp){
        let filteredData = resp.table_rows.rows
        // debugger
        let vals = Object.values(filteredData).forEach(function(vals) {console.log(vals)})
        this.info = vals
        return this.info
      }
    },
    mapData: function(data){
      mappedData: {

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
