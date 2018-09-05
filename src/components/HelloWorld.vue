<template>
  <div class=main>
    <div class="hello">
      <p>something</p>
      <p>somthing else</p>
      <!-- {{ info }} -->
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment. Please try again later.</p>
    </section>
    <autocomplete
      :items="info"
    ></autocomplete>
    <!-- <div class="user-input">
      <h2>Explore the data</h2>
      <label>Search field:</label>
      <input type="text" v-model="searchTerm" />
      <button v-on:click="fetchInput()">Search</button>
      <p>
        {{ fieldSearch.name }}
        {{ fieldSearch.mens_earnings }}
        {{ fieldSearch.womens_earnings }}
        {{ fieldSearch.womens_mens_percentage }}
        {{ stuff }}
      </p>
    </div> -->
    </div>
    <div class="charts">
      <div class="dot-plot">
          <h2>Men's Earnings Compared to Women's for the Most Popular Fields</h2>
          <dot-plot
            :dataModel='dotPlot1Data'
            title='First Dot Plot'
          ></dot-plot>
        </div>
        <div class="dot-plot">
            <h2>Bubble Chart Depicting Fields Percentage of Earnings</h2>
            <bubble-chart
              :dataModel='bubbleChartData'
              title='Bubble Chart Data'
            ></bubble-chart>
          </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'vue-resize/dist/vue-resize.css';
  import DotPlot from './d3/dotPlot.vue';
  import BubbleChart from './d3/bubbleChart.vue';
  import Search from './search.vue';
  import * as d3 from "d3";
  import _ from 'lodash';

  export default {
    name: 'HelloWorld',
    data () {
      return {
        info: {},
        loading: true,
        errored: false,
        dotPlot1Data: [],
        bubbleChartData: [],
        fieldSearch: [{
          name: null,
          mens_earnings: null,
          womens_earnings: null,
          womens_mens_percentage: null
        }]
      }
    },
    components: {
      'dot-plot': DotPlot,
      'bubble-chart': BubbleChart,
      'autocomplete': Search
    },
    mounted(){
    // debugger
    },
    created(){
      //this gets all the data
      axios
      .get('https://public.enigma.com/api/snapshots/3ca9486a-db7c-4216-8e99-0428e3b0b54d?&row_limit=1000&row_offset=0&include_serialids=true')
      .then(response => {
        var resp = response.data
        this.filterData(resp)
        this.filterBubbleData(resp)
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
      // this.dotPlot1Data = {
      //   "plot1": [
      //     {"name":"Legislators","max":"67233","min":"63788"},
      //     {"name":"Materials engineers","max":"81479","min":"80865"},
      //     {"name":"Dental assistants","max":"32231","min":"31161"},
      //     {"name":"Waiters and waitresses","max":"25855","min":"21182"}
      //   ]
      // }
      this.dotPlot1Data = {
        "plot1": [
          {"name":"Chief executives","max":"141108","min":"103564"},{"name":"Financial managers","max":"100505","min":"62089"},{"name":"Accountants and auditors","max":"76129","min":"57370"},{"name":"Software developers, applications and systems software","max":"101969","min":"88759"},{"name":"Elementary and middle school teachers","max":"53096","min":"50021"},{"name":"Registered nurses","max":"70952","min":"64413"},{"name":"Nursing, psychiatric, and home health aides","max":"29503","min":"25706"},{"name":"Cooks","max":"22575","min":"20320"},{"name":"Janitors and building cleaners","max":"30654","min":"22962"},{"name":"First-line supervisors of retail sales workers","max":"46343","min":"33778"},{"name":"First-line supervisors of non-retail sales workers","max":"67434","min":"58166"},{"name":"Cashiers","max":"22413","min":"20482"},{"name":"Retail salespersons","max":"40116","min":"26781"},{"name":"Sales representatives, wholesale and manufacturing","max":"70464","min":"54077"},{"name":"First-line supervisors of office and administrative support workers","max":"56346","min":"45996"},{"name":"Customer service representatives","max":"36744","min":"32095"},{"name":"Secretaries and administrative assistants","max":"42411","min":"36929"},{"name":"Construction laborers","max":"32214","min":"30378"},{"name":"Driver/sales workers and truck drivers","max":"42435","min":"32237"},{"name":"Laborers and freight, stock, and material movers, hand","max":"31424","min":"26312"}
        ]
      }
      this.bubbleChartData = {
            "children": [{"Name":"Olives","Count":4319},
                {"Name":"Tea","Count":4159},
                {"Name":"Mashed Potatoes","Count":2583},
                {"Name":"Boiled Potatoes","Count":2074},
                {"Name":"Milk","Count":1894},
                {"Name":"Chicken Salad","Count":1809},
                {"Name":"Vanilla Ice Cream","Count":1713},
                {"Name":"Cocoa","Count":1636},
                {"Name":"Lettuce Salad","Count":1566},
                {"Name":"Lobster Salad","Count":1511},
                {"Name":"Chocolate","Count":1489},
                {"Name":"Apple Pie","Count":1487},
                {"Name":"Orange Juice","Count":1423},
                {"Name":"American Cheese","Count":1372},
                {"Name":"Green Peas","Count":1341},
                {"Name":"Assorted Cakes","Count":1331},
                {"Name":"French Fried Potatoes","Count":1328},
                {"Name":"Potato Salad","Count":1306},
                {"Name":"Baked Potatoes","Count":1293},
                {"Name":"Roquefort","Count":1273},
                {"Name":"Stewed Prunes","Count":1268}]
        };

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
        var filteredValues =
        ["Driver/sales workers and truck drivers", "First-line supervisors of retail sales workers", "Elementary and middle school teachers", "Registered nurses", "Secretaries and administrative assistants", "Customer service representatives", "Retail salespersons", "Accountants and auditors", "Janitors and building cleaners", "Laborers and freight, stock, and material movers, hand", "Nursing, psychiatric, and home health aides", "Cooks", "First-line supervisors of office and administrative support workers", "Sales representatives, wholesale and manufacturing", "Construction laborers", "Software developers, applications and systems software", "First-line supervisors of non-retail sales workers", "Chief executives", "Financial managers", "Cashiers"]

        // ["Chief executives", "Legislators", "Marketing and sales managers", "Human resources managers", "Medical and health services managers", "Human resources workers", "Financial analysts", "Software developers, applications and systems software", "Web developers", "Actuaries", "Civil engineers", "Electrical and electronics engineers", "Materials engineers", "Medical scientists", "Economists", "Psychologists", "Social workers", "Dental assistants", "Waiters and waitresses"]

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
          mappedData["max"] = val[12]
          mappedData["min"] = val[14]
          mappedDotPlot1.push(mappedData)
        })
        var mappedDataObj = {}
        mappedDataObj["plot1"] = mappedDotPlot1
        //[{},{},{}]
        // this.dotPlot1Data = mappedDataObj
        // debugger
        // console.log(JSON.stringify(this.dotPlot1Data))
      },
      filterBubbleData(resp){
        var bubbleData = this.info
        var mappedBubble = []
        bubbleData.map((val)=>{
          var mappedData = {}
          mappedData["name"] = val[0]
          mappedData["percentage"] = val[16]
          mappedBubble.push(mappedData)
        })
        // debugger
        // this.bubbleChartData = mappedBubble;
      }
    },
    computed: {
      fetchInput(){
        console.log(this.info)
        var self = this;
        return this.info.filter((item)=>{
          debugger
          return item[0].indexOf(self.searchTerm.toLowerCase())>=0;
          // return item.name.toLowerCase().indexOf(self.searchTerm.toLowerCase())>=0;
        })
        // return this.customers.filter(function(cust){return cust.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;})
        // var inputValue = input;
        // var result = data.filter((e)=>{
        //   data.includes(e[0])
        //   fieldSearch = result
        // })
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
