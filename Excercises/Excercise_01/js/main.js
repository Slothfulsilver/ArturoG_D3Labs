/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 800)
	.attr("height", 800);

var circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "blue");

var circle = svg.append("circle")
	.attr("cx", 400)
	.attr("cy", 300)
	.attr("r", 200)
	.attr("fill", "pink")
	.attr("stroke", "black")
	.attr("stroke-width", 5);

var rect = svg.append("rect")
	.attr("x", 20)
	.attr("y", 20)
	.attr("width", 20)
	.attr("height", 20)
	.attr("fill","red");

var ell = svg.append("ellipse")
	.attr("cx", 320)
	.attr("cy", 260)
	.attr("rx", 40)
	.attr("ry", 60)
	.attr("fill","white");

var ell = svg.append("ellipse")
	.attr("cx", 480)
	.attr("cy", 260)
	.attr("rx", 40)
	.attr("ry", 60)
	.attr("fill","white");

var ell = svg.append("ellipse")
	.attr("cx", 320)
	.attr("cy", 280)
	.attr("rx", 25)
	.attr("ry", 40)
	.attr("fill","blue");

var ell = svg.append("ellipse")
	.attr("cx", 480)
	.attr("cy", 280)
	.attr("rx", 25)
	.attr("ry", 40)
	.attr("fill","blue");

var line = svg.append("circle")
	.attr("cx", 400)
	.attr("cy", 400)
	.attr("r", 100)
	.attr("fill", "pink")
	.attr("stroke", "black")
	.attr("stroke-width", 5);

var ell = svg.append("ellipse")
	.attr("cx", 350)
	.attr("cy", 400)
	.attr("rx", 40)
	.attr("ry", 60)
	.attr("fill","black");

var ell = svg.append("ellipse")
	.attr("cx", 450)
	.attr("cy", 400)
	.attr("rx", 40)
	.attr("ry", 60)
	.attr("fill","black");
