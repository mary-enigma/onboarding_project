<template>
  <div class="main">
    <div class="intro">
      <img src="../assets/images/intro-image.jpg" width="100%" class="intro-image">
      <div class="inner-intro">
        <div class="intro-title">
          <h1>Exploring the Gender Pay Gap Through Public Data</h1>
        </div>
        <div class="intro-text">
          <p>
            Nearly every occupation in the United States experiences a gender wage gap. Most people are familiar with the average pay gap statistic - in 2017, women were paid, on average, 82 cents for every dollar a man earns. However, the gap varies widely by field - women are paid almost half of what men are paid (56.3%) in some legal occupations such as financial clerks, while architectural and engineering managers experience almost no gap (99.9%).
          </br>
          </br>
          This project explores the gender wage gap by occupation through reported earnings by gender using data from the 2016 <a href="https://www.census.gov/programs-surveys/acs/">American Community Survey</a>, available on <a href="https://public.enigma.com/">Enigma Public</a>.
          </p>
          <div style="margin-top: 30px">
            <v-btn class="intro-btn"><a href="https://public.enigma.com/datasets/full-time-year-round-workers-and-median-earnings-in-the-past-12-months-by-sex-and-detailed-occupation-2016/3616bd60-2fec-4cf6-99a3-477dae4afbb9" style="text-decoration: none; color:black">View the data</a></v-btn>
          </div>
        </div>
      </div>
  </div>
  <div class="dot-plot1">
    <h2 class="dot1-title">Men's Earnings Compared to Women's for Selected Common Occupations</h2>
    <div class="dot-plot">
      <dot-plot
        :dataModel='dotPlot1Data'
        propID="dotPlot1"
      ></dot-plot>
    </div>
  </div>
    <div class="about">
      <h3 style="font-size: 20px;">About the Data</h3>
      <p class="about-text">
        The dataset used for this project explored median earnings reported by men and women in 558 occupational categories. The data specified the number of full-time, year round workers; the percentage of women in each occupational category; and women’s earnings as a percentage of men’s earnings (the gender pay gap). 334 out of 346 fields - or 96.5% - with large enough sample sizes (100+ cases) reported a pay gap. The gender wage gap refers to the average difference in pay for services rendered or work performed between men and women.
      </p>
    </div>
    <div class="pay-graphic">
      <img src="../assets/images/pay-graphic.jpg" width="75%" class="graphic">
    </div>
    <div class="explore-data">
      <h2 class="explore-title">Explore the Data</h2>
      <p class="explore-text">
        Enter a field to see median earnings by men and women as well as the pay gap for that field.
      </p>
      <autocomplete
        :items="info"
      ></autocomplete>
    </div>
    <div class="bubble-chart">
      <h2 style="font-size:24px;">Women's Earnings As A Percentage of Men's Earnings By General Field</h2>
      <div>
        <bubble-chart
          :dataModel='bubbleChartData'
          propID="bubbleChart"
        ></bubble-chart>
      </div>
    </div>
<!--
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment. Please try again later.</p>
    </section> -->
    <div class="lightbulb-graphic">
      <img src="../assets/images/lightbulb-graphic.jpg" width="100%" class="graphic">
    </div>
    <div class="complexity-text">
      <h2 style="font-size: 24px;">The Complexity of the Gender Wage Gap</h2>
      <p class="comp-text">
        Data such as this provides valuable information. However, the wage gap goes beyond just numbers by field, or even equal pay for equal work. </br></br>

         An important aspect of the wage gap is that fields that employ mostly women are paid lower than fields that employ mostly men.
      </p>
    </div>
    <div class="complexity-graphic">
      <img src="../assets/images/next-graphic.jpg" width="75%" class="graphic">
    </div>
    <div class="comparison">
      <div class="dot-plot">
        <h2>Selected Fields Employing 75% Or More Men</h2>
        <dot-plot
          :dataModel='dotPlot3Data'
          propID="dotPlot3"
        ></dot-plot>
      </div>
      <div class="dot-plot">
        <h2>Selected Fields Employing 75% or More Women</h2>
        <dot-plot
          :dataModel='dotPlot2Data'
          propID="dotPlot2"
          :xAxisRange='110'
        ></dot-plot>
      </div>
    </div>
    <div class="footer">
      <p>
        About Enigma Public
      </p>
      <p>
        About This Project: Made by Mary Boyd.
      </p>
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

  export default {
    name: 'HelloWorld',
    data () {
      return {
        info: {},
        loading: true,
        errored: false,
        dotPlot1Data: [],
        dotPlot2Data: [],
        dotPlot3Data: [],
        bubbleChartData: []
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
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)

    //hard-coded data until I get stuff working
      this.dotPlot1Data = {
        "children": [
          {"name":"Accountants and auditors","max":"76129","min":"57370"},{"name":"Elementary and middle school teachers","max":"53096","min":"50021"},{"name":"Registered nurses","max":"70952","min":"64413"},{"name":"Nursing, psychiatric, and home health aides","max":"29503","min":"25706"},{"name":"Cooks","max":"22575","min":"20320"},{"name":"Janitors and building cleaners","max":"30654","min":"22962"},{"name":"First-line supervisors of retail sales workers","max":"46343","min":"33778"},{"name":"First-line supervisors of non-retail sales workers","max":"67434","min":"58166"},{"name":"Cashiers","max":"22413","min":"20482"},{"name":"Retail salespersons","max":"40116","min":"26781"},{"name":"Sales representatives, wholesale and manufacturing","max":"70464","min":"54077"},{"name":"First-line supervisors of office and administrative support workers","max":"56346","min":"45996"},{"name":"Customer service representatives","max":"36744","min":"32095"},{"name":"Secretaries and administrative assistants","max":"42411","min":"36929"},{"name":"Construction laborers","max":"32214","min":"30378"},{"name":"Driver/sales workers and truck drivers","max":"42435","min":"32237"},{"name":"Laborers and freight, stock, and material movers, hand","max":"31424","min":"26312"}
        ]
      }

      this.dotPlot2Data = {
        "children":[
          {"name":"Social workers","max":"44973","min":"44603"},{"name":"Preschool and kindergarten teachers","max":"29102","min":"25021"},{"name":"Librarians","max":"57961","min":"50671"},{"name":"Teacher assistants","max":"31063","min":"22095"},{"name":"Registered nurses","max":"70952","min":"64413"},{"name":"Nursing, psychiatric, and home health aides","max":"29503","min":"25706"},{"name":"Medical assistants","max":"32083","min":"30418"},{"name":"Maids and housekeeping cleaners","max":"25788","min":"21000"},{"name":"Childcare workers","max":"25324","min":"21212"},{"name":"Receptionists and information clerks","max":"29582","min":"28444"}
        ]
      }

      this.dotPlot3Data = {
        "children":[
          {"name":"Construction managers","max":"71907","min":"62218"},{"name":"Software developers, applications and systems software","max":"101969","min":"88759"},{"name":"Police and sheriff patrol officers","max":"64792","min":"57402"},{"name":"Grounds maintenance workers","max":"25838","min":"22944"},{"name":"First-line supervisors of construction trades and extraction workers","max":"60145","min":"45174"},{"name":"Carpenters","max":"36414","min":"31637"},{"name":"Construction laborers","max":"32214","min":"30378"},{"name":"Pipelayers, plumbers, pipefitters, and steamfitters","max":"47046","min":"45525"},{"name":"Driver/sales workers and truck drivers","max":"42435","min":"32237"},{"name":"Laborers and freight, stock, and material movers, hand","max":"31424","min":"26312"}
        ]
      }

      this.bubbleChartData = {
        "children": [{"Name":"Management","Count":"76.1"},{"Name":"Business and Financial Operations","Count":"76.9"},{"Name":"Computer and Mathematical","Count":"84.8"},{"Name":"Architecture and Engineering","Count":"86.5"},{"Name":"Life, Physical, and Social Science","Count":"86.4"},{"Name":"Community and Social Service","Count":"93.4"},{"Name":"Legal","Count":"53.4"},{"Name":"Education, Training, and Library","Count":"81.6"},{"Name":"Arts, Design, Entertainment, Sports, and Media","Count":"87.1"},{"Name":"Healthcare Practitioners and Technical","Count":"72.1"},{"Name":"Healthcare Support","Count":"87.9"},{"Name":"Protective Service","Count":"79.5"},{"Name":"Food Preparation and Serving Related","Count":"85.1"},{"Name":"Building and Grounds Cleaning and Maintenance","Count":"73"},{"Name":"Personal Care and Service","Count":"75.6"},{"Name":"Sales and Related","Count":"66.1"},{"Name":"Office and Administrative Support","Count":"88.8"},{"Name":"Farming, Fishing, and Forestry","Count":"75.1"},{"Name":"Construction and Extraction","Count":"87.6"},{"Name":"Installation, Maintenance, and Repair","Count":"88.6"},{"Name":"Production","Count":"69.1"},{"Name":"Transportation","Count":"75.5"},{"Name":"Material Moving","Count":"79.2"}]
      }
      // debugger
    },
    methods: {
      //filters out metadata and runs functions
      filterData: function(resp){
        let filteredData = resp.table_rows.rows
        this.info = filteredData
        this.filterDotPlot1Data(this.info)
        this.filterDotPlot2Data(this.info)
        this.filterDotPlot3Data(this.info)
        this.filterBubbleData(this.info)
        // debugger
        return this.info
      },
      filterDotPlot1Data: function(data){
        //choose selected fields for the first dot plot
        var filteredValues =
        ["Driver/sales workers and truck drivers", "First-line supervisors of retail sales workers", "Elementary and middle school teachers", "Registered nurses", "Secretaries and administrative assistants", "Customer service representatives", "Retail salespersons", "Accountants and auditors", "Janitors and building cleaners", "Laborers and freight, stock, and material movers, hand", "Nursing, psychiatric, and home health aides", "Cooks", "First-line supervisors of office and administrative support workers", "Sales representatives, wholesale and manufacturing", "Construction laborers", "Software developers, applications and systems software", "First-line supervisors of non-retail sales workers", "Cashiers"]

        // filter by these fields
        var result = data.filter((e)=>{
          return filteredValues.includes(e[0])
        })
        // debugger
        this.mapFilteredData(result);
      },
      filterDotPlot2Data(data){
        //choose selected fields for the first dot plot
        var filteredWomensFields =
        ["Preschool and kindergarten teachers", "Registered nurses", "Nursing, psychiatric, and home health aides", "Childcare workers", "Librarians", "Teacher assistants", "Receptionists and information clerks", "Medical assistants", "Maids and housekeeping cleaners", "Social workers"]

        // filter by these fields
        var result = data.filter((e)=>{
          return filteredWomensFields.includes(e[0])
        })
        // debugger
        this.mapFilteredData2(result);
      },
      filterDotPlot3Data(data){
        var filteredMensFields =
        ["Driver/sales workers and truck drivers", "Construction managers", "Laborers and freight, stock, and material movers, hand", "First-line supervisors of construction trades and extraction workers", "Construction laborers", "Software developers, applications and systems software", "Grounds maintenance workers", "Police and sheriff patrol officers", "Carpenters", "Pipelayers, plumbers, pipefitters, and steamfitters"]

        var result = data.filter((e)=>{
          return filteredMensFields.includes(e[0])
        })
        // debugger
        this.mapFilteredData3(result);
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
        mappedDataObj["children"] = mappedDotPlot1

        // this.dotPlot1Data = mappedDataObj
        // debugger
        // console.log(JSON.stringify(this.dotPlot1Data))
      },
      mapFilteredData2(data){
        var mappedDotPlot2 = []
        data.map((val)=>{
          var mappedData = {}
          mappedData["name"] = val[0]
          mappedData["max"] = val[12]
          mappedData["min"] = val[14]
          mappedDotPlot2.push(mappedData)
        })
        var mappedDataObj = {}
        mappedDataObj["children"] = mappedDotPlot2
        // this.dotPlot2Data = mappedDataObj
        // debugger
        // console.log(JSON.stringify(this.dotPlot2Data))
      },
      mapFilteredData3(data){
        var mappedDotPlot3 = []
        data.map((val)=>{
          var mappedData = {}
          mappedData["name"] = val[0]
          mappedData["max"] = val[12]
          mappedData["min"] = val[14]
          mappedDotPlot3.push(mappedData)
        })
        var mappedDataObj = {}
        mappedDataObj["children"] = mappedDotPlot3
        // this.dotPlot3Data = mappedDataObj
        // debugger
        // console.log(JSON.stringify(this.dotPlot2Data))
      },
      filterBubbleData(data){
        // debugger
        // this.bubbleChartData = mappedBubble;
        var filterBubbleValues = ["Management Occupations", "Business and Financial Operations Occupations", "Computer and Mathematical Occupations", "Architecture and Engineering Occupations", "Life, Physical, and Social Science Occupations", "Community and Social Service Occupations", "Legal Occupations", "Education, Training, and Library Occupations", "Arts, Design, Entertainment, Sports, and Media Occupations", "Healthcare Practitioners and Technical Occupations", "Healthcare Support Occupations", "Protective Service Occupations", "Food Preparation and Serving Related Occupations", "Building and Grounds Cleaning and Maintenance Occupations", "Personal Care and Service Occupations", "Sales and Related Occupations", "Office and Administrative Support Occupations", "Farming, Fishing, and Forestry Occupations", "Construction and Extraction Occupations", "Installation, Maintenance, and Repair Occupations", "Production Occupations", "Transportation Occupations", "Material Moving Occupations"]

        var bubbleResult = data.filter((e)=>{
          return filterBubbleValues.includes(e[0])
        })

        var mappedBubble = []
        bubbleResult.map((val)=>{
          var mappedData = {}
          mappedData["name"] = val[0]
          mappedData["percentage"] = val[16]
          mappedBubble.push(mappedData)
        })
        // debugger
        let mappedBubbleDataObj = {}
        mappedBubbleDataObj["children"] = mappedBubble;
        // this.bubbleChartData = mappedBubbleDataObj
      }
    },
    computed: {
      //filtered search
      fetchInput(){
        console.log(this.info)
        var self = this;
        return this.info.filter((item)=>{
          // debugger
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
<style>

  .main {
    display: grid;
    grid-template-columns: [first] 10% [second] 40% [third] 40% [fourth] 10% [end];
    grid-template-rows: auto;
    grid-row-gap: 20px;
    grid-template-areas:
      "intro intro intro intro"
      " . dot1 dot1 . "
      " . about graphic . "
      " explore explore explore explore "
      " . bubble bubble . "
      "lightbulb lightbulb lightbulb lightbulb"
      " . compgraphic comptext . "
      " . compare compare . "
      "footer footer footer footer";
  }

  .intro {
    grid-area: intro;
    position: relative;
  }
  .inner-intro {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 500px;
  }
  .intro-title {
    font-size: 30px;
    color: white;
    font-weight: 800;
    text-align: center;
  }
  .intro-text {
    margin-top: 50px;
    font-size: 16px;
    color: white;
    text-align: left;
    font-weight: 500;
    /* left: 40px; */
    /* text-align: left; */
  }
  .intro-btn {
    width: 200px;
    background-color: #B4E0E9!important;
    color: white
  }
  .intro a {
    color: #7173a9;
  }
  .about-text {
    font-size: 16px;
    text-align: left;
    margin-top: 10px;
    margin: 10px 15px 10px 15px;
  }
  .dot1-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .explore-data {
    grid-area: explore;
    background-color: #de93be;
  }
  .explore-title {
    margin-top: 2%;
    font-size: 32px;
    color: white;
    font-weight: 900;
  }
  .explore-text {
    font-size: 14px;
    color: white;
  }
  .dot-plot1 {
    grid-area: dot1;
    margin-top: 50px;
  }
  .about {
    grid-area: about;
    margin: 10% 0px 20px 20px;
  }
  .pay-graphic {
    grid-area: graphic;
  }

  .bubble-chart {
    grid-area: bubble;
    margin-top: 30px;
  }
  .comparison {
    grid-area: compare;
  }
  .comp-text {
    font-size: 16px;
    margin-top: 10px;
    margin: 10px 15px 10px 15px;
    text-align: left;
  }
  .footer {
    grid-area: footer;
    background-color: #3F9994;
    color: white;
  }
  .lightbulb-graphic {
    grid-area: lightbulb;
    opacity: .8;
  }
  .complexity-text {
    grid-area: comptext;
    margin: 10% 0px 20px 20px;
  }
  .complexity-graphic {
    grid-area: compgraphic;
    margin-top: 20px;
  }

  /* ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  } */
  .dot-plot {
    height: 500px;
  }
  /* .bubble-chart {
    height: 600px;
  } */
  .intro-image {
    /* opacity: .9 */
  }

</style>
