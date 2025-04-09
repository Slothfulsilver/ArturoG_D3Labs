/*
*    main.js
*/

var width = 600;
var height = 400;
var margin = {top: 10, right: 10, bottom: 100, left:100};

d3.json("data/revenues.json").then((data)=> {

    //Mapping of data
    var months = data.map(d => d.month);
    var maxRevenue = d3.max(data, d => d.revenue);
    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.top - margin.bottom;

    //Scales
    var x = d3.scaleBand()
        .domain(months)
        .range([0, innerWidth])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, maxRevenue])
        .range([innerHeight, 0]);    

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
            .attr("y", innerHeight + margin.bottom)
            .attr("text-anchor", "middle")
            .text("Month");

    var leftAxis = d3.axisLeft(y)
        .ticks(d3.max(data, d => +d.revenue) / 5000)
        .tickFormat(d3.format("$,.2r"));
        g.append("g")
            .attr("class", "y-axis")
            .call(leftAxis)
            g.append("text")
                .attr("class", "y-axis-label")
                .attr("transform", "rotate(-90)")
                .attr("x", -(innerHeight / 2))
                .attr("y", -60)
                .attr("text-anchor", "middle")
                .text("Revenue (dlls.)");

        var rects = g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
                .attr("fill", "yellow")
                .attr("width", x.bandwidth())
                .attr("height", (d) => innerHeight - y(d.revenue) )
                .attr("x", (d, i) => x(d.month))
                .attr("y", (d) => y(d.revenue));
            

});
