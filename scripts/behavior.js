var dataset;
var dataset2;
var dataset3;
var dataset4;
var selectedPlayer;
var selectedFirstItem = "stone";
var allBlocks;
var allBlocksConverted;
var allCustomStats;
var allCustomStatsConverted;
var selectedStat = "mob_kills"
var selectedPlayer = "NevQ"
var update = false;

function init() {
    d3.csv("data/blocks_broken.csv")
      .then((data) => {
        dataset = data
        bubbleChart()
        getContent()
        createSelects()
      })
      .catch((error) => {
        //console.log(error);
    });
    d3.csv("data/custom_stats.csv")
    .then((data) => {
      dataset2 = data
      getStats()
      createSelectStat()
      BarChart()
      update = true
    })
    d3.csv("data/blocks_crafted.csv")
    .then((data) => {
      dataset3 = data
      getCrafted()
      bubbleChart2()
    })
    d3.csv("data/picked_up_blocks.csv")
    .then((data) => {
      dataset4 = data
      getPicked()
    })
  }

function getHierarchy(){
  new_data = dataset.map(function(d) {
    return {
      username: String(d.username),
      value: Number(d[selectedFirstItem])
    }
  });

  new_data.sort(function(a, b){
    var keyA = a.value,
        keyB = b.value;
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
  })
  //new_data = new_data.slice(0,30)

  console.log(new_data)
  return new_data
}

function getHierarchy2(){
  new_data = dataset3.map(function(d) {
    return {
      username: String(d.username),
      value: Number(d[selectedFirstItem])
    }
  });

  new_data.sort(function(a, b){
    var keyA = a.value,
        keyB = b.value;
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
  })
  //new_data = new_data.slice(0,30)

  console.log(new_data)
  return new_data
}

function bubbleChart2(){
  if(update==true) d3.select("div#bubbleChart2").select("svg").remove();
  new_data = getHierarchy2()
  data = new_data.slice(0,50)
  // set the dimensions and margins of the graph
  const width = 460
  const height = 560

  // append the svg object to the body of the page
  const svg = d3.select("div#bubbleChart2")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

  const size = d3.scaleLinear()
  .domain([d3.min(new_data, d => d.value), d3.max(new_data, d => d.value)])
  .range([7,40]) 

  var div = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);
  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    value = 0
    for(i=0;i<dataset.length;i++){
      if(dataset[i].username == d.username){
        value = Number(dataset[i][selectedFirstItem])
        break
      }
    }
    div.transition()		
    .duration(200)		
    .style("opacity", 1);		
    div.html( d.username + "<br/>" + "Mined: " + value + "<br/>" + "Crafted: " + d.value + "<br/>" );
  }

  var mouseleave = function(event, d) {
    div.transition()		
    .duration(500)		
    .style("opacity", 0);
  }

  var node = svg.append("g")
  .selectAll("circle")
  .data(data)
  .join("circle")
    .attr("class", "node")
    .attr("r", d => size(d.value))
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", calculateFill)
    .style("fill-opacity", 0.8)
    .attr("stroke", "white")
    .style("stroke-width", 1)
    .on("mouseover", mouseover) // What to do when hovered
    .on("mouseleave", mouseleave)
    .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));


    // Features of the forces applied to the nodes:
    const simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

  function calculateFill(dataItem, i) {
    new_data = getHierarchy2()
    var scale = d3
        .scaleLinear()
        .domain([d3.min(new_data, d => d.value), d3.max(new_data, d => d.value)])
        .range([0, 1]);
    return d3.interpolateViridis(scale(dataItem.value));
  }

}

function bubbleChart(){
  if(update==true) d3.select("div#bubbleChart").select("svg").remove();
  new_data = getHierarchy()
  data = new_data.slice(0, 50)
  // set the dimensions and margins of the graph
  const width = 460
  const height = 560

  // append the svg object to the body of the page
  const svg = d3.select("div#bubbleChart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

  const size = d3.scaleLinear()
  .domain([d3.min(new_data, d => d.value), d3.max(new_data, d => d.value)])
  .range([7,40]) 

  var div = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);
  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    console.log(d.username)
    value = 0;
    for(i=0;i<dataset3.length;i++){
      if(dataset3[i].username == d.username){
        value = Number(dataset3[i][selectedFirstItem])
        break
      }
    }

    div.transition()		
    .duration(200)		
    .style("opacity", 1);		
    div.html( d.username + "<br/>" + "Mined: " + d.value + "<br/>" + "Crafted: " + value + "<br/>" );
  }

  var mouseleave = function(event, d) {
    div.transition()		
    .duration(500)		
    .style("opacity", 0);
  }

  var node = svg.append("g")
  .selectAll("circle")
  .data(data)
  .join("circle")
    .attr("class", "node")
    .attr("r", d => size(d.value))
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", calculateFill)
    .style("fill-opacity", 0.8)
    .attr("stroke", "white")
    .style("stroke-width", 1)
    .on("mouseover", mouseover) // What to do when hovered
    .on("mouseleave", mouseleave)
    .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));


    // Features of the forces applied to the nodes:
    const simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

  
  function calculateFill(dataItem, i) {
    new_data = getHierarchy()
    var scale = d3
        .scaleLinear()
        .domain([d3.min(new_data, d => d.value), d3.max(new_data, d => d.value)])
        .range([0, 1]);
    return d3.interpolateViridis(scale(dataItem.value));
  }

}
  
function getPicked(){
    sum = 0
    i = 0
    console.log(dataset4.length)
    for(i<0; i< dataset4.length; i++){
      if(dataset4[i][selectedFirstItem] == null){
        continue
      }
      sum += Number(dataset4[i][selectedFirstItem])
    }
    content2.innerHTML = sum
  }

function getCrafted(){
  sum = 0
  i = 0
  console.log(dataset3.length)
  for(i<0; i< dataset3.length; i++){
    if(dataset3[i][selectedFirstItem] == null){
      continue
    }
    sum += Number(dataset3[i][selectedFirstItem])
  }
  content1.innerHTML = sum
}

function getStats(){
  data = dataset2.filter(function(d){
    if(d.username==selectedPlayer){
      return d;
    }
  })
  array = Object.keys(data[0])
  array.shift()
  array.shift()
  array = array.map((i) => String(i)).sort()
  array.sort()
  allCustomStats = [...array]
  for(i=0;i<array.length;i++){
    str = String(array[i])
    str =  str.charAt(0).toUpperCase() + str.slice(1)
    array[i] = str.replace(/_/g, ' ')
  }
  allCustomStatsConverted = [...array]
}

function getContent(){
  sum = 0
  i = 0
  console.log(dataset.length)
  for(i<0; i< dataset.length; i++){
    sum += Number(dataset[i][selectedFirstItem])
  }
  content.innerHTML = sum
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

function createSelectStat(){
  first = allCustomStats.indexOf(selectedStat)
  d3.select("#selectStat")
  .selectAll('myOptions')
  .data(allCustomStatsConverted)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  d3.select("#selectStat").on("change", function(d) {
    // recover the option that has been chosen
    selectedStat = d3.select(this).property("value")
    selectedStat = allCustomStats[allCustomStatsConverted.indexOf(selectedStat)]
    BarChart()
  })
  d3.select("#selectStat").property("value",allCustomStatsConverted[first])
}

function createSelects(){
  data = dataset

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
    getContent()
    getCrafted()
    getPicked()
    bubbleChart()
    bubbleChart2()
  })
  d3.select("#selectFirstItem").property("value",array[first])

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
    div.html(allBlocksConverted[allBlocks.indexOf(d.data.name)] + " Mined: " + d.data.value + "<br/>" );
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

function BarChart(){
  if(update==true){
    d3.select("div#barChart").select("svg").remove();
  }

  var new_data = dataset2.map(function(d) {
    return {
      username: String(d.username),
      selectedStat: Number(d[selectedStat])
    }
  });

  new_data.sort(function(a, b){
    var keyA = a.selectedStat,
        keyB = b.selectedStat;
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
  })
  new_data = new_data.slice(0,10)

  //console.log(new_data)

  var margin = {top: 20, right: 50, bottom: 20, left: 70},
  width = 650,
  height = 350;

  x = d3.scaleBand()
  .domain(new_data.map(d => d.username))
  .rangeRound([margin.left, width - margin.right])
  .padding(0.1)

  y = d3.scaleLinear()
  .domain([0, d3.max(new_data, (d) => d.selectedStat)])
  .rangeRound([height - margin.bottom, margin.top])

  xAxis = (g) => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3
      .axisBottom(x)
      .tickFormat(function(x){
        if(x.length>11){
          return x.slice(0,4)
        }
        return x
      })
      .tickSizeOuter(0))

  yAxis = (g) => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y).tickFormat(function(y){
    if(y>=1000000){
      return y/1000000 + "M"
    }
    else if(y > 1000){
      return y/1000 + "k"
    }
    else{
      return y
    }
  }).tickSizeOuter(0)).append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -60)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text(allCustomStatsConverted[allCustomStats.indexOf(selectedStat)])
  .style("font-size", "18px")
  .style("fill","white")
  .style("stroke-width", 0.2)
  .style("stroke","#E03E33") 

  const svg = d3
  .select("div#barChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  var defs = svg.append("defs");

  var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "150%")
        .attr("width", "200%");

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 2)
        .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
        

  svg.append("g").attr("class","XAxis").call(xAxis);
  svg.append("g").attr("class","YAxis").call(yAxis);

  svg.append("g")
  .attr("fill", "#E03E33")
  .attr("fill-opacity", 0.8)
  .selectAll("rect")
  .data(new_data)
  .join("rect")
  .attr("x", d => x(d.username))
  .attr("y", d => y(d.selectedStat))
  .style("filter", "url(#drop-shadow)")
  .attr("height", d => y(0) - y(d.selectedStat))
  .style("stroke-width", 0.2)
  .style("stroke","white") 
  .transition()
  .duration(800)
  .attr("width", x.bandwidth());

  var texts = svg.append("g").selectAll(".myTexts")
    .data(new_data)
    .enter()
    .append("text");
  
   texts.attr("x", function(d,i){ return x(d.username)+2})
  .attr("y", function(d,i){
    new_y = y(d.selectedStat)-5 
    return new_y})
  .text(function(d){ 
    return d.username.replace(/_/g, '')})

}