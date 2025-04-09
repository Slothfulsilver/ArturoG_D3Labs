/*
*    main.js
*/

d3.json("data/ages.json").then((data)=> {

	data.forEach((d)=>{

		d.age = +d.age;

        });

	console.log(data);

    var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

    var circles = svg.selectAll("circle")
    .data(data);

    circles.enter()
    .append("circle")
        .attr("r", (d, i) => d.age)
        .attr("cx", (d, i) => (i + 1) * 50)
        .attr("cy", 200)
        .attr("fill", (d) => (d.age > 10 ? "blue" : "lightblue"));

});

