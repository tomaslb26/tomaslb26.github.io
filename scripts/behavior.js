var dataset;
var selectedPlayer;
var selectedFirstItem = "deepslate";
var selectedSecondItem = "cobblestone";
var selectedThirdItem = "sand";
var selectedFourthItem = "sandstone";
var selectedFifthItem = "diamond_ore";
var allBlocks;
var allBlocksConverted;
var selectedPlayer = "NevQ"
var update = false;

function init() {
    d3.csv("data/blocks_broken.csv")
      .then((data) => {
        dataset = data
        selectPlayer()
        createSelects()
        createCircles()
        PieChart()
        update = true
      })
      .catch((error) => {
        //console.log(error);
    });

  }

function createCircles(){
  const circle1 = d3.select("div#circle1").append("svg")
  .attr("width", 150).attr("height", 18);
  circle1
  .append("circle").attr("cx", 50).attr("cy", 9).attr("r", 7)
  .style("fill", "#ffd384").style("stroke", "white").style("stroke-width", 1.5);

  const circle2 = d3.select("div#circle2").append("svg")
  .attr("width", 150).attr("height", 18);
  circle2
  .append("circle").attr("cx", 50).attr("cy", 9).attr("r", 7)
  .style("fill", '#94ebcd').style("stroke", "white").style("stroke-width", 1.5);

  const circle3 = d3.select("div#circle3").append("svg")
  .attr("width", 150).attr("height", 18);
  circle3
  .append("circle").attr("cx", 50).attr("cy", 9).attr("r", 7)
  .style("fill", '#fbaccc').style("stroke", "white").style("stroke-width", 1.5);

  const circle4 = d3.select("div#circle4").append("svg")
  .attr("width", 150).attr("height", 18);
  circle4
  .append("circle").attr("cx", 50).attr("cy", 9).attr("r", 7)
  .style("fill",'#d3e0ea').style("stroke", "white").style("stroke-width", 1.5);

  const circle5 = d3.select("div#circle5").append("svg")
  .attr("width", 150).attr("height", 18);
  circle5
  .append("circle").attr("cx", 50).attr("cy", 9).attr("r", 7)
  .style("fill", '#fa7f72').style("stroke", "white").style("stroke-width", 1.5);
}

function process(){
  data = dataset.filter(function(d){
    if(d.username==selectedPlayer){
      return d;
    }
  })

  new_data = [{name: selectedFirstItem, "value": Number(data[0][selectedFirstItem])},
              {name: selectedSecondItem, "value": Number(data[0][selectedSecondItem])},{name: selectedThirdItem, "value": Number(data[0][selectedThirdItem])},
              {name: selectedFourthItem, "value": Number(data[0][selectedFourthItem])},{name: selectedFifthItem, "value": Number(data[0][selectedFifthItem])}]
  console.log(new_data)
  return new_data
  
}

function selectPlayer(){
  usernames = dataset.map((d) => d.username)
  usernames.sort()

  d3.select("#selectPlayer")
  .selectAll('myOptions')
  .data(usernames)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button
  
  d3.select("#selectPlayer").on("change", function(d) {
      // recover the option that has been chosen
      selectedPlayer = d3.select(this).property("value")
      PieChart()
    })
  d3.select("#selectPlayer").property("value",selectedPlayer)
}

function createSelects(){
  data = dataset.filter(function(d){
    if(d.username==selectedPlayer){
      return d;
    }
  })
  array = Object.keys(data[0])
  array.shift()
  array = array.map((i) => String(i)).sort()

  allBlocks = [...array]
  for(i=0;i<array.length;i++){
    str = String(array[i])
    str =  str.charAt(0).toUpperCase() + str.slice(1)
    array[i] = str.replace(/_/g, ' ')
  }

  allBlocksConverted = [...array]

  first = allBlocks.indexOf(selectedFirstItem)
  console.log(allBlocks)
  d3.select("#selectFirstItem")
  .selectAll('myOptions')
  .data(array)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  d3.select("#selectFirstItem").on("change", function(d) {
    // recover the option that has been chosen
    selectedFirstItem = d3.select(this).property("value")
    selectedFirstItem = allBlocks[allBlocksConverted.indexOf(selectedFirstItem)]
    PieChart()
  })
  d3.select("#selectFirstItem").property("value",array[first])


  
  first = allBlocks.indexOf(selectedSecondItem)
  d3.select("#selectSecondItem")
  .selectAll('myOptions')
  .data(array)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  d3.select("#selectSecondItem").on("change", function(d) {
    // recover the option that has been chosen
    selectedSecondItem = d3.select(this).property("value")
    selectedSecondItem = allBlocks[allBlocksConverted.indexOf(selectedSecondItem)]
    PieChart()
  })
  d3.select("#selectSecondItem").property("value",array[first])


  first = allBlocks.indexOf(selectedThirdItem)
  d3.select("#selectThirdItem")
  .selectAll('myOptions')
  .data(array)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  d3.select("#selectThirdItem").on("change", function(d) {
    // recover the option that has been chosen
    selectedThirdItem = d3.select(this).property("value")
    selectedThirdItem = allBlocks[allBlocksConverted.indexOf(selectedThirdItem)]
    PieChart()
  })
  d3.select("#selectThirdItem").property("value",array[first])


  first = allBlocks.indexOf(selectedFourthItem)
  d3.select("#selectFourthItem")
  .selectAll('myOptions')
  .data(array)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  d3.select("#selectFourthItem").on("change", function(d) {
    // recover the option that has been chosen
    selectedFourthItem = d3.select(this).property("value")
    selectedFourthItem = allBlocks[allBlocksConverted.indexOf(selectedFourthItem)]
    PieChart()
  })
  d3.select("#selectFourthItem").property("value",array[first])

  first = allBlocks.indexOf(selectedFifthItem)
  d3.select("#selectFifthItem")
  .selectAll('myOptions')
  .data(array)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  d3.select("#selectFifthItem").on("change", function(d) {
    // recover the option that has been chosen
    selectedFifthItem = d3.select(this).property("value")
    selectedFifthItem = allBlocks[allBlocksConverted.indexOf(selectedFifthItem)]
    PieChart()
  })
  d3.select("#selectFifthItem").property("value",array[first])
}




function PieChart(){
  width = 550
  height = 300
  radius = 150
  if(update==true){
    d3.select("div#pieChart").select("svg").remove();
  }
  data = process()
  var svg = d3.select("div#pieChart").append("svg")
  .attr("width", width)
  .attr("height", height);

  var g = svg.append("g")
  .attr("transform", "translate(" + width / 2 + "," + height/2 + ")");

  var ordScale = d3.scaleOrdinal()
  .domain(data)
  .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);

  var pie = d3.pie().value(function(d) { 
    return d.value; 
  });

  var arc = g.selectAll("arc")
        .data(pie(data))
        .enter()

  var path = d3.arc()
  .outerRadius(radius)
  .innerRadius(0)

  arc.append("path")
  .attr("d", path)
  .attr("fill", function(d) { return ordScale(d.data.name); }) 
  .style("stroke-width", 1)
  .style("stroke","white") 
  .on("mouseover",handleMouseOver)
  .on("mouseleave",handleMouseLeave)

  var div = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

  /*legend = svg.selectAll("myLegend")
  .data(pie(data))
  .enter()
  .append('g')
  .append("text")
  .attr("x",430)
  .attr("y",function(d,i){
    return 10 + 20*i
  })
  .text(function(d){
    str = d.data.name;
    str =  str.charAt(0).toUpperCase() + str.slice(1);
    return str.replace(/_/g, ' ');
  })
  .style("fill",function(d) { return ordScale(d.data.name); })
  .style("stroke-width", 0.1)
  .style("stroke","black")
  .style("font-size",14)*/


  function handleMouseOver(event,d){
    scatterPlot = d3.select("div#pieChart").select("svg");

    scatterPlot
    .selectAll("path")
    .filter(function (b) {  
      if (d.data.name != b.data.name) {
        return b;
      }
    })
    .attr('fill-opacity', 0.2)
    .style("stroke-width", 0.2)

    div.transition()		
    .duration(200)		
    .style("opacity", 1);		
    div.html("Blocks Mined: " + d.data.value + "<br/>" );
  }

  function handleMouseLeave(event,d){
    div.transition()		
    .duration(500)		
    .style("opacity", 0);	
    scatterPlot = d3.select("div#pieChart").select("svg");

    scatterPlot
    .selectAll("path")
    .filter(function (b) {
        return b;
    })
    .style("stroke-width", 1)
    .attr('fill-opacity', 1)
  }


}