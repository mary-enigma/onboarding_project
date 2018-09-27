export function filterDotPlot1Data(data) {
  debugger
    //choose selected fields for the first dot plot
    var filteredValues =
    ["Driver/sales workers and truck drivers", "First-line supervisors of retail sales workers", "Elementary and middle school teachers", "Registered nurses", "Secretaries and administrative assistants", "Customer service representatives", "Retail salespersons", "Accountants and auditors", "Janitors and building cleaners", "Laborers and freight, stock, and material movers, hand", "Nursing, psychiatric, and home health aides", "Cooks", "First-line supervisors of office and administrative support workers", "Sales representatives, wholesale and manufacturing", "Construction laborers", "Software developers, applications and systems software", "First-line supervisors of non-retail sales workers", "Cashiers"]

    // filter by these fields
    var result = data.filter((e)=>{
      return filteredValues.includes(e[0])
    })

    this.mapFilteredData(result);
}

export function mapFilteredData(data){
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
}
