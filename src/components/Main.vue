<template>
  <div class="main" v-if='allDataLoaded'>
    <div class="intro">
      <img src="../assets/images/intro-image.jpg" width="100%" class="intro-image">
      <div class="inner-intro">
        <div class="intro-title">
          <h1>Exploring the Gender Pay Gap Through Public Data</h1>
        </div>
        <div class="intro-text">
          <p>
            Nearly every occupation in the United States experiences a gender wage gap. Most people are familiar with the average pay gap statistic - in 2017, women were paid, on average, 82 cents for every dollar a man earns. However, the gap varies significantly by field - women are paid almost half of what men are paid (56.3%) in some legal occupations such as financial clerks, while architectural and engineering managers experience almost no gap (99.9%).
          </br>
          </br>
          This project explores the gender wage gap by occupation through reported earnings by gender using data from the 2016 <a href="https://www.census.gov/programs-surveys/acs/" target="_blank">American Community Survey</a>, available on <a href="https://public.enigma.com/" target="_blank">Enigma Public</a>.
          </p>
          <div>
            <v-btn class="intro-btn"><a href="https://public.enigma.com/datasets/full-time-year-round-workers-and-median-earnings-in-the-past-12-months-by-sex-and-detailed-occupation-2016/3616bd60-2fec-4cf6-99a3-477dae4afbb9" target="_blank" style="text-decoration: none; color:black">View the data</a></v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="dot-plot-overview">
      <div class="dot-plot">
        <h2 class="dot1-title">Men's Earnings Compared to Women's for Selected Common Occupations</h2>
        <dot-plot
          :dataModel='dotPlot1Data'
          propID="dotPlot1"
        ></dot-plot>
      </div>
    </div>
    <div class="about">
      <h3 style="font-size: 20px;">About the Data</h3>
      <p class="about-text">
        The dataset used for this project explored median earnings reported by men and women in 558 occupational categories. The data specified the number of full-time, year-round workers; the percentage of women in each occupational category; and women’s earnings as a percentage of men’s earnings (the gender pay gap). 334 out of 346 fields - or 96.5% - with large enough sample sizes (100+ cases) reported a pay gap. The gender wage gap refers to the average difference in pay for services rendered or work performed between men and women.
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
    <div class="lightbulb-graphic">
      <img src="../assets/images/lightbulb-graphic.jpg" width="100%" class="graphic">
    </div>
    <div class="complexity-text">
      <h2 style="font-size: 24px;">The Complexity of the Gender Wage Gap</h2>
      <p class="comp-text">
        Earnings data adjusted for gender provides valuable information. However, the wage gap goes beyond just earnings by field, or even equal pay for equal work. Factors such as unemployment and career disruption (women leaving the workforce for circumstances like child-bearing or family care, for example) significantly impact the gender pay gap. The gap widens even more when adjusting for race.</br></br>

        This is not just a gender issue, but a societal one. Pay disparity has far-reaching economic consequences, contibuting to poverty rates among working women and their families.
      </p>
    </div>
    <div class="complexity-graphic">
      <img src="../assets/images/complexity.jpg" width="90%" class="graphic">
    </div>
    <div class="compare-text">
      <div class="text-block">
        <h2 class="top-title">Fields That Traditionally Employed Women Are Lower Paid</h2>
        <p style="margin-top: 20px;">
          An important aspect of the wage gap is that <i>fields that employ mostly women are lower paid</i> than fields that employ mostly men.
        </p>
      </div>
    </div>
    <div class="comparison">
      <div class="dot-plot">
        <h2>Selected Occupations Employing 75% Or More Men</h2>
        <dot-plot
          :dataModel='dotPlot3Data'
          propID="dotPlot3"
        ></dot-plot>
      </div>
      <div class="dot-plot" style="margin-top: 15px;">
        <h2>Selected Occupations Employing 75% or More Women</h2>
        <dot-plot
          :dataModel='dotPlot2Data'
          propID="dotPlot2"
          :xAxisRange='110000'
        ></dot-plot>
      </div>
    </div>
    <div class="top-text">
      <div class="text-block">
        <h3 class="top-title">There are few women at the top.</h3>
        <br/>
        <p class="top-text-text">
          In addition to a wage gap, the data exposes an <strong><i>opportunity gap</i></strong> - there are less women in higher-level or advanced roles within their organizations.
        </p>
      </div>
    </div>
    <div class="bar-chart">
      <h2>Number of Women Compared to Men in Selected High-Level Occupations</h2>
      <div class="bar-chart-container">
        <bar-chart
        :dataModel='barChartData'
        propID="barChart"
        ></bar-chart>
      </div>
    </div>
    <div class="resources-graphic">
      <img src="../assets/images/next-graphic.jpg" width="75%" class="graphic">
    </div>
    <div class="resources">
      <div class="resources-text">
        <h2 class="resources-title">Resources</h2>
        <p>
          Explore more data, dive deeper into the wage gap issue, and learn how you can help
          <ul class="help-links">
            <li>
              <a href="https://blog.cultureamp.com/why-workplace-intersectionality-means-more-than-focusing-on-women" target="_blank">The importance of promoting workplace intersectionality</a> <i>(Culture Amp)</i>
            </li>
            <li>
                <a href="https://www.usatoday.com/story/tech/2018/09/19/equity-gap-women-tech-get-half-stock-options-men-do/1353459002/" target="_blank">It's not just salary: the equity pay gap in tech</a> <i>(USA Today)</i>
            </li>
            <li>
                <a href="https://www.nytimes.com/2018/05/13/business/gender-pay-britain.html" target="_blank">Flexible work schedules, agressive recruitment, transparent reporting: what governments and organizations are doing to close the gap</a> <i>(The New York Times)</i>
            </li>
            <li>
                <a href="https://hbr.org/podcast/2018/02/mind-the-wage-gap" target="_blank">An overlooked aspect of the wage gap: age and its effects on earnings</a> <i>(a podcast from the Harvard Business Review)</i>
            </li>
            <li>
                <a href="https://www.economist.com/international/2017/10/07/the-gender-pay-gap" target="_blank">Where the two roads diverge: motherhood, fatherhood, and the gender pay gap</a> <i>(The Economist)</i>
            </li>
          </ul>
        </p>
      </div>
    </div>
    <div class="footer">
      <h3>About Enigma Public</h3>
      <p class="footer-text1">
        Enigma Public is the world's broadest collection of public data and largest open government data source. With over 100,000 free datasets, Enigma is strongly committed to helping individuals and organizations gain a more comprehensive view of our world.
      </p>
      <h3>About This Project</h3>
      <p>
         Made by <a href="https://github.com/marya314">Mary Boyd</a>.
      </p>
    </div>
  </div>
  <div v-else class="loading-parent">
      <loading :active.sync="isLoading"
        :can-cancel="true"
      ></loading>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'vue-resize/dist/vue-resize.css';
  import DotPlot from './d3/dotPlot.vue';
  import BubbleChart from './d3/bubbleChart.vue';
  import BarChart from './d3/stackedBarChart.vue';
  import Search from './search.vue';
  import * as d3 from 'd3';
  // import dotData1 from '../assets/mockData/dotplot1.json';
  // import dotData2 from '../assets/mockData/dotplot2.json';
  // import dotData3 from '../assets/mockData/dotplot3.json';
  // import bubbleData from '../assets/mockData/bubbleChart.json';
  // import barData from '../assets/mockData/barChart.json';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.min.css';
  // import {filterDotPlot1Data, mapFilteredData} from './filters.js'

  export default {
    name: 'Main',
    data () {
      return {
        info: {},
        loading: true,
        errored: false,
        dotPlot1Data: undefined,
        dotPlot2Data: undefined,
        dotPlot3Data: undefined,
        bubbleChartData: undefined,
        barChartData: undefined,
        dotPlot1DataLoaded: false,
        dotPlot2DataLoaded: false,
        dotPlot3DataLoaded: false,
        barChartDataLoaded: false,
        bubbleChartDataLoaded: false,
        isLoading: true,
        fullPage: true
      }
    },
    components: {
      'dot-plot': DotPlot,
      'bar-chart': BarChart,
      'bubble-chart': BubbleChart,
      'autocomplete': Search,
      'loading': Loading
    },
    mounted(){
      this.isLoading = false
    },
    created(){

      //gets all the data and calls method to start filtering
      axios
      .get('https://public.enigma.com/api/snapshots/3ca9486a-db7c-4216-8e99-0428e3b0b54d?&row_limit=1000&row_offset=0&include_serialids=true')
      .then(response => {
        var resp = response.data
        this.filterData(resp)
        // console.log(this.filterData(resp))
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.isLoading = false)

    },
    methods: {
      //filters out metadata and runs filtering functions for each chart
      filterData: function(resp){
        let filteredData = resp.table_rows.rows
        this.info = filteredData
        this.filterDotPlot1Data(this.info)
        this.filterDotPlot2Data(this.info)
        this.filterDotPlot3Data(this.info)
        this.filterBubbleData(this.info)
        this.filterBarData(this.info)
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

        this.mapFilteredData(result);
      },
      filterDotPlot2Data(data){
        //choose selected fields for women's dot plot
        var filteredWomensFields =
        ["Preschool and kindergarten teachers", "Registered nurses", "Nursing, psychiatric, and home health aides", "Childcare workers", "Librarians", "Teacher assistants", "Receptionists and information clerks", "Medical assistants", "Maids and housekeeping cleaners", "Social workers"]

        // filter by these fields
        var result = data.filter((e)=>{
          return filteredWomensFields.includes(e[0])
        })

        this.mapFilteredData2(result);
      },
      filterDotPlot3Data(data){
        //filtered fields for men's dot plot
        var filteredMensFields =
        ["Driver/sales workers and truck drivers", "Construction managers", "Laborers and freight, stock, and material movers, hand", "First-line supervisors of construction trades and extraction workers", "Construction laborers", "Software developers, applications and systems software", "Grounds maintenance workers", "Police and sheriff patrol officers", "Carpenters", "Pipelayers, plumbers, pipefitters, and steamfitters"]

        var result = data.filter((e)=>{
          return filteredMensFields.includes(e[0])
        })
        // debugger
        this.mapFilteredData3(result);
      },
      filterBubbleData(data){
        // debugger
        // this.bubbleChartData = mappedBubble;
        var filterBubbleValues = ["Management Occupations", "Business and Financial Operations Occupations", "Computer and Mathematical Occupations", "Architecture and Engineering Occupations", "Life, Physical, and Social Science Occupations", "Community and Social Service Occupations", "Legal Occupations", "Education, Training, and Library Occupations", "Arts, Design, Entertainment, Sports, and Media Occupations", "Healthcare Practitioners and Technical Occupations", "Healthcare Support Occupations", "Protective Service Occupations", "Food Preparation and Serving Related Occupations", "Building and Grounds Cleaning and Maintenance Occupations", "Personal Care and Service Occupations", "Sales and Related Occupations", "Office and Administrative Support Occupations", "Farming, Fishing, and Forestry Occupations", "Construction and Extraction Occupations", "Installation, Maintenance, and Repair Occupations", "Production Occupations", "Transportation Occupations", "Material Moving Occupations"]

        var result = data.filter((e)=>{
          return filterBubbleValues.includes(e[0])
        })
        this.mapBubbleData(result);
      },
      filterBarData(data){
        var filteredBarFields =
        ["Chief executives", "General and operations managers", "Computer and information systems managers", "Transportation, storage, and distribution managers", "Architectural and engineering managers", "Marketing and sales managers"]

        var result = data.filter((e)=>{
          return filteredBarFields.includes(e[0])
        })
        // debugger
        this.mapBarData(result);
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
        // debugger
        this.dotPlot1Data = mappedDataObj;
        this.dotPlot1DataLoaded = true;
        // debugger
        // console.log(JSON.stringify(this.dotPlot1Data))
        // this.isLoading = false
      },
      mapBubbleData(data){
        // debugger
        var mappedBubble = []
        data.map((val)=>{
          var mappedData = {}
          mappedData["Name"] = val[0]
          mappedData["Count"] = val[16]
          mappedBubble.push(mappedData)
        })
        let mappedDataObj = {}
        mappedDataObj["children"] = mappedBubble;
        this.bubbleChartData = mappedDataObj;
        // this.bubbleChartData = bubbleData;
        // debugger
        this.bubbleChartDataLoaded = true;
        // debugger
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
        this.dotPlot2Data = mappedDataObj;
        this.dotPlot2DataLoaded = true;
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
        this.dotPlot3Data = mappedDataObj;
        this.dotPlot3DataLoaded = true;
        // debugger
        // console.log(JSON.stringify(this.dotPlot2Data))
      },
      mapBarData(data){
        var mappedBarPlot = []
        data.map((val)=>{
          var mappedData = {}
          mappedData["name"] = val[0]
          mappedData["men"] = val[4]
          mappedData["women"] = val[6]
          mappedBarPlot.push(mappedData)
        })
        var mappedDataObj = {}
        mappedDataObj["children"] = mappedBarPlot
        this.barChartData = mappedDataObj;
        this.barChartDataLoaded = true;
        // debugger
        // console.log(JSON.stringify(this.dotPlot2Data))
      }
    },
    computed: {
      //filtered search
      fetchInput(){
        console.log(this.info)
        var self = this;
        return this.info.filter((item)=>{
          return item[0].indexOf(self.searchTerm.toLowerCase())>=0;
        })
      },
      allDataLoaded() {
        return this.dotPlot1DataLoaded && this.dotPlot2DataLoaded && this.dotPlot3DataLoaded && this.barChartDataLoaded && this.bubbleChartDataLoaded
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  /* .main {
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
      "comparetext comparetext comparetext comparetext"
      " . compare compare . "
      "top top top top"
      " . bar bar . "
      " . resgraph resources . "
      "footer footer footer footer";
  } */

  @media only screen and (min-width: 800px)   {
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
            "comparetext comparetext comparetext comparetext"
            " . compare compare . "
            "top top top top"
            " . bar bar . "
            " . resgraph resources . "
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
       }
       .intro-btn {
         margin-top: 30px;
         width: 200px;
         background-color: #B4E0E9!important;
         color: white
       }
       .about {
         grid-area: about;
         margin: 10% 0px 20px 20px;
       }
       .complexity-text {
         grid-area: comptext;
         margin: 10% 0px 20px 20px;
       }
   }

    @media only screen and (max-width: 799px)   {
         .main {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto;
            grid-row-gap: 10px;
            grid-template-areas:
              "intro intro intro intro"
              " . dot1 dot1 . "
              "graphic graphic graphic graphic"
              "about about about about"
              " explore explore explore explore "
              " . bubble bubble . "
              "lightbulb lightbulb lightbulb lightbulb"
              " . compgraphic compgraphic . "
              " . comptext comptext . "
              "comparetext comparetext comparetext comparetext"
              " . compare compare . "
              "top top top top"
              " . bar bar . "
              " . resgraph resgraph . "
              " . resources resources . "
              "footer footer footer footer";
         }
         .intro {
           grid-area: intro;
           position: relative;
         }
         .inner-intro {
           position: absolute;
           top: 30px;
           left: 20px;
           right: 300px;
         }
         .intro-title {
           font-size: 16px;
           color: white;
           font-weight: 800;
           text-align: center;
         }
         .intro-text {
           margin-top: 50px;
           font-size: 14px;
           color: white;
           text-align: left;
           font-weight: 500;
         }
         .intro-btn {
           margin-top: 30px;
           width: 200px;
           background-color: #B4E0E9!important;
           color: white
         }
         .about {
           grid-area: about;
           margin: 5% 0px 20px 20px;
         }
         .complexity-text {
           grid-area: comptext;
           margin: 3% 0px 20px 20px;
         }
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
    background-color: #c37aa3;
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
  .dot-plot-overview {
    grid-area: dot1;
    margin-top: 50px;
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
    margin-top: 30px;
  }
  .footer {
    grid-area: footer;
    background-color: #508694;
    color: white;
  }
  .lightbulb-graphic {
    grid-area: lightbulb;
    opacity: .8;
  }
  .complexity-graphic {
    grid-area: compgraphic;
    margin: 20px 0px 20px 0px;
  }
  .comp-text{
    margin-top: 5px;
    font-size: 16px;
  }
  .compare-text {
    grid-area: comparetext;
    background-color: #7d3c61;
    color: white;
  }
  .bar-chart {
    grid-area: bar;
  }
  .resources {
    grid-area: resources;
  }
  .resources-graphic {
    grid-area: resgraph;
  }
  .resources-title {
    font-size: 30px;
  }
  .resources-text {
    margin: 10% 0px 20px 20px;
  }
  .top-text {
    grid-area: top;
    background-color: #74A4B2;
    color: white;
  }
  .top-title {
    font-size: 30px;
  }
  .top-text-text {
    font-size: 16px;
  }
  .text-block {
    margin: 40px;
    font-size: 16px;
  }
  .dot-plot {
    height: 500px;
    width: 100%;
  }
  .bar-chart {
    margin: 20px 50px 20px 50px;
    /* height: 500px; */
  }
  .bar-chart-container {
    height: 560px;
  }
  .intro-image {
    /* opacity: .9 */
  }
  .loading-parent {
    position: relative;
  }
  .help-links {
    margin-top: 3%;
    text-align: left;
    font-size: 16px;
  }

</style>
