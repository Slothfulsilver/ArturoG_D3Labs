/*
*    main.js
*/

d3.json("data/buildings.json").then((data)=> {

    //Mapping of data
    var names = data.map(d => d.name);
    var maxHeight = d3.max(data, d => d.height);
    
    //Scales
    var x = d3.scaleBand()
        .domain(names)
        .range([0, 500])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, maxHeight])
        .range([0, 500]);    

    var color = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemeSet3);

    //SVG Canvas
    var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 500);

    var rects = svg.selectAll("rect")
    .data(data);

    //Creation of rects
    rects.enter()
        .append("rect")
            .attr("fill", (d) => color(d.name))
            .attr("width", x.bandwidth())
            .attr("height", (d) => 500 - y(d.height) )
            .attr("x", (d, i) => x(d.name))
            .attr("y", (d) => y(d.height));

});
