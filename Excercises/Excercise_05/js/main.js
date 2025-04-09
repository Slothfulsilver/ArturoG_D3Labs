/*
*    main.js
*/

var width = 600;
var height = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};

d3.json("data/buildings.json").then((data)=> {

//Mapping of data
var names = data.map(d => d.name);
var maxHeight = d3.max(data, d => d.height);
var innerHeight = height - margin.top - margin.bottom;
var innerWidth = width - margin.top - margin.bottom;

//Scales
var x = d3.scaleBand()
    .domain(names)
    .range([0, innerWidth])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .domain([0, maxHeight])
    .range([innerHeight, 0]);    

var color = d3.scaleOrdinal()
    .domain(names)
    .range(d3.schemeSet3);

//Canvas

const g = d3.select("body")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
    .append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top +")");

//Margins
var bottomAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + (innerHeight) + ")")
    .call(bottomAxis)
    .selectAll("text")
        .attr("x", -5)
        .attr("y", 10)
        .attr("transform", "rotate(-40)")
        .attr("text-anchor", "end");
    g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom + 30)
        .attr("text-anchor", "middle")
        .text("The world's tallest buildings");

var leftAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d => `${d}m`);
    g.append("g")
        .attr("class", "y-axis")
        .call(leftAxis)
        g.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -(innerHeight / 2))
            .attr("y", -60)
            .attr("text-anchor", "middle")
            .text("Height (m)");


    var rects = g.selectAll("rect")
        .data(data);

    //Creation of rects
    rects.enter()
        .append("rect")
            .attr("fill", (d) => color(d.name))
            .attr("width", x.bandwidth())
            .attr("height", (d) => innerHeight - y(d.height) )
            .attr("x", (d, i) => x(d.name))
            .attr("y", (d) => y(d.height));

});
