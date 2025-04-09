/*
*    main.js
*/

var width = 600;
var height = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};
var innerHeight = height - margin.top - margin.bottom;
var innerWidth = width - margin.left - margin.right;

//Canvas
const g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top +")");

//Scales
var x = d3.scaleLog()
.domain([142, 150000])
	.range([0, innerWidth]);

var y = d3.scaleLinear()
	.domain([0, 90])
	.range([innerHeight, 0]);

var area = d3.scaleLinear()
	.domain( [2000, 1400000000])
	.range([25*Math.PI, 1500*Math.PI]);

var color = d3.scaleOrdinal()
	.range(d3.schemePastel1);

//Margins
var xAxisGroup = g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + innerHeight + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y-axis")

//Labels
g.append("text")
  .attr("transform", `translate(${width / 2 - margin.left}, ${height - margin.bottom + 40})`)
  .style("text-anchor", "middle")
  .text("GDP Per Capita ($)");

g.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -60)
  .attr("x", 0 - (height / 2))
  .style("text-anchor", "middle")
  .text("Life Expectancy (Years)");

const yearLabel = g.append("text")
	.attr("class", "year-label")
	.attr("x", innerWidth - margin.right)
	.attr("y", innerHeight - 10)
	.style("text-anchor", "end")
	.style("font-size", "20px")
	.style("font-weight", "bold")
	.text("");

//Calls
var xAxisCall = d3.axisBottom(x)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format("$,.2r"));

var yAxisCall = d3.axisLeft(y);

xAxisGroup.call(xAxisCall);
yAxisGroup.call(yAxisCall);

//Data
d3.json("data/data.json").then(data => {


	const formattedData = data.map((year) => {
		return year["countries"].filter((country) => {
		var dataExists = (country.income && country.life_exp);
		return dataExists
		}).map((country) => {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			country.population = +country.population;
			return country;
		})
	});

	const continents = Array.from(new Set(formattedData.flatMap(yearData => yearData.map(d => d.continent))));
    color.domain(continents);

	 // Create color labels
	 const labelGroup = g.append("g")
		.attr("class", "color-labels")
		.attr("transform", `translate(${innerWidth - margin.right}, ${innerHeight + margin.bottom -130})`);

	const labelSpacing = 15;
	continents.forEach((continent, index) => {
	const labelY = -index * labelSpacing - 5;

	 labelGroup.append("rect")
		 .attr("x", 0)
		 .attr("y", labelY - 10)
		 .attr("width", 10)
		 .attr("height", 10)
		 .attr("fill", color(continent));

	 labelGroup.append("text")
		 .attr("x", 0)
		 .attr("y", labelY)
		 .style("font-size", "10px")
		 .style("text-anchor", "end")
		 .text(continent);
 });

	let year = 0

	d3.interval(() => {
		const currentYearData = formattedData[year];
        const currentYearValue = data[year].year; 
        update(currentYearData);
        yearLabel.text(currentYearValue); 
        year = (year + 1) % formattedData.length;
    }, 1000);

    if (data.length > 0) {
        yearLabel.text(data[0].year);
    }

});

function update(data){

	console.log("innerWidth:", innerWidth, "innerHeight:", innerHeight);
	var circles = g.selectAll("circle")
		.data(data, d => d.country);


    //Margin
 
	circles.exit()
		.remove();

	circles
		.attr("cx", d => x(d.income))
		.attr("cy", d => y(d.life_exp))
		.attr("r", d => Math.sqrt(area(d.population) / Math.PI))
		.attr("fill", d => color(d.continent));

	circles
		.enter().append("circle")
			.attr("cx", d => x(d.income))
			.attr("cy", d => y(d.life_exp))
			.attr("r", d => Math.sqrt(area(d.population) / Math.PI))
			.attr("fill", d => color(d.continent));

}

