<template>
  <div>
    <div class="autocomplete">
      <label class="search-text">Search for a field (example: accountant):</label>
        <input
          type="text"
          @input="onChange"
          v-model="search"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
          class="input-box"
        />
        <ul
          id="autocomplete-results"
          v-show="isOpen"
          class="autocomplete-results"
        >
          <li
            class="loading"
            v-if="isLoading"
          >
            Loading results...
          </li>
          <li
            v-else
            v-for="(result, i) in results"
            :key="i"
            @click="setResult(result)"
            class="autocomplete-result"
            :class="{ 'is-active': i === arrowCounter }"
          >
            {{ result }}
          </li>
        </ul>
    </div>
    <div class="display-results">
      <p class="search-text" style="font-size: 20px;">
        Result:
      </p>
      <p class="result-text">
        Field Name: {{ displayItem[0] }} </br>
        Median earnings men: {{ displayItem[12] }} </br>
        Median earnings women: {{ displayItem[14] }} </br>
        Women's earnings as a percentage of men's earnings: {{ displayItem[16] }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
   name: 'autocomplete',

   props: {
     items: {
     },
     isAsync: {
       type: Boolean,
       required: false,
       default: false,
     },
   },

   data() {
     return {
       isOpen: false,
       results: [],
       name: '',
       search: '',
       isLoading: false,
       arrowCounter: 0,
       filteredData: [],
       displayItem: []
     };
   },

   methods: {
     onChange() {
       // Let's warn the parent that a change was made
       this.$emit('input', this.search);

       // Is the data given by an outside ajax request?
       if (this.isAsync) {
         this.isLoading = true;
       } else {
         // Let's  our flat array
         this.filterResults();
         this.isOpen = true;
       }
     },

     filterResults() {
       // uncapitalize everything
       this.filterData = this.items.filter((item) => {
         return item[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
       });
       this.results = this.filterData.map((e)=>{return e[0]})

     },
     setResult(result) {
       this.search = result;
       this.isOpen = false;
       // debugger
       this.displayResult();
     },
     onArrowDown(evt) {
       if (this.arrowCounter < this.results.length) {
         this.arrowCounter = this.arrowCounter + 1;
       }
     },
     onArrowUp() {
       if (this.arrowCounter > 0) {
         this.arrowCounter = this.arrowCounter -1;
       }
     },
     onEnter() {
       this.search = this.results[this.arrowCounter];
       this.isOpen = false;
       this.arrowCounter = -1;
       this.setResult(this.search)
       // debugger
     },
     handleClickOutside(evt) {
       if (!this.$el.contains(evt.target)) {
         this.isOpen = false;
         this.arrowCounter = -1;
       }
     },
    displayResult(){
      var target = this.filterData.filter((item) => {
        return item[0].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
      this.displayItem = target[0]
  // debugger
    }
  },
   watch: {
     items: function (val, oldValue) {
       // actually compare them
       if (val.length !== oldValue.length) {
         this.results = val;
         this.isLoading = false;
       }
     },
   },
   mounted() {
     document.addEventListener('click', this.handleClickOutside)
   },
   destroyed() {
     document.removeEventListener('click', this.handleClickOutside)
   }
 };

</script>

<style>

  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    width: 100%;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #D770AD;
    color: white;
  }
  .search-text {
    color: white;
  }
  .result-text {
    color: white;
    font-size: 16px;
  }
  .input-box {
    padding: 6px 12px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #faeff5;
  }

</style>
