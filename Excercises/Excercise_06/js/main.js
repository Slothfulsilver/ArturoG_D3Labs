/*
*    main.js
*/

var width = 600;
var height = 400;
var flag = true;
var margin = {top: 10, right: 10, bottom: 100, left:100};
var innerHeight = height - margin.top - margin.bottom;
var innerWidth = width - margin.left - margin.right;

//Canvas
const g = d3.select("body")
.append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top +")");

//Scales
var x = d3.scaleBand()
.range([0, innerWidth])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([innerHeight, 0]);    

//Margins
var xAxisGroup = g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + innerHeight + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y-axis")

var xAxisCall = d3.axisBottom(x);
var yAxisCall = d3.axisLeft(y)
    .tickFormat(d3.format("$,.2r"));

//Labels
g.append("text")
    .attr("class", "x-axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + margin.bottom)
    .attr("text-anchor", "middle")
    .text("Month");

const yLabel = g.append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -(innerHeight / 2))
    .attr("y", -60)
    .attr("text-anchor", "middle")


//Data
d3.json("data/revenues.json").then((data)=> {
     
    data.forEach((d) => {
        d.revenue = +d.revenue;
        d.profit= +d.profit;
    });

    d3.interval(( ) => {
        update(data);
        flag = !flag;
    }, 1000);
                
});

function update(data) {
  
    var value = flag ? "revenue" : "profit";
    var labelText = flag ? "Revenue (dlls)" : "Profit (dlls)";

    //Scales
    x.domain(data.map(d => d.month))
    y.domain([0, d3.max(data, function(d) {return d[value]})])

    //Margin
    xAxisGroup.call(xAxisCall)
        .selectAll("text")
        .attr("x", -5)
        .attr("y", 10)
        .attr("transform", "rotate(-40)")
        .attr("text-anchor", "end");

    yAxisGroup.call(yAxisCall)
    
    //Label Update
    yLabel.text(labelText);

    //Data
    var rects = g.selectAll("rect").data(data);

    rects.exit().remove();

    rects
        .attr("width", x.bandwidth())
        .attr("height", (d) => innerHeight - y(d[value]) )
        .attr("x", (d, i) => x(d.month))
        .attr("y", (d) => y(d[value]));

    rects.enter()
        .append("rect")
            .attr("fill", "yellow")
            .attr("width", x.bandwidth())
            .attr("height", (d) => innerHeight - y(d[value]) )
            .attr("x", (d, i) => x(d.month))
            .attr("y", (d) => y(d[value]));
}