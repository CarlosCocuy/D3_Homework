function makeResponsive() {
  var svgArea = d3.select("body").select("svg");

// clear svg is not empty
if (!svgArea.empty()) {
  svgArea.remove();
}

// SVG wrapper dimensions are determined by the current width and
// height of the browser window.
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
  top: 50,
  bottom: 50,
  right: 50,
  left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgHeight - margin.left - margin.right;

// Append SVG element
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append group element
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
d3.csv("assets/data/data.csv").then( function(inputData) {

    console.log(inputData);

    inputData.forEach(function(data) {
      data.poverty = +data.poverty;
      // data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      // data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      // data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      // data.healthcareLow = +data.healthcareLow;
      // data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      // data.obesityLow = +data.obesityLow;
      // data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      // data.smokesLow = +data.smokesLow;
      // data.smokesHigh = +data.smokesHigh;
    });

    var xScale = d3.scaleLinear()
    .domain([d3.min(inputData, d => d.poverty)-1,d3.max(inputData, d => d.poverty)])
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([d3.min(inputData, d => d.healthcare)-1,d3.max(inputData, d => d.healthcare)])
    .range([height, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(inputData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "16")
    // .attr("fill", "cyan")
    // .attr("stroke-width", "1")
    // .attr("stroke", "black")
    .html(d => d.abbr)
    .attr("class",'stateCircle');

    var namesGroup = chartGroup.append("text")
    .selectAll("tspan")
    .data(inputData)
    .enter()
    .append("tspan")
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .text(d => d.abbr)
    .attr("class",'stateText');
  });
};
makeResponsive();
