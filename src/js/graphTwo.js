
// set the dimensions and margins of the graph
var marginTwo = { top: 10, right: 30, bottom: 20, left: 50 },
widthTwo = 460 - marginTwo.left - marginTwo.right,
heightTwo = 400 - marginTwo.top - marginTwo.bottom;

// append the svg object to the body of the page
var svgTwo = d3
.select("#graphTwo")
.append("svg")
.attr("width", widthTwo + marginTwo.left + marginTwo.right)
.attr("height", heightTwo + marginTwo.top + marginTwo.bottom)
.append("g")
.attr(
    "transform",
    "translate(" + marginTwo.left + "," + marginTwo.top + ")"
);

// Parse the Data
//var csvSource = 
d3.csv((href = "../csv/jsontocsvTwo.csv"), function (data) {
// List of subgroups = header of the csv files = soil condition here
var subgroups = data.columns.slice(1);

// List of groups = species here = value of the first column called group -> I show them on the X axis
var groups = d3
    .map(data, function (d) {
    return d.title;
    })
    .keys();

// Add X axis
var x = d3
    .scaleBand()
    .domain(groups)
    .range([0, widthTwo])
    .padding([0.2]);
svgTwo
    .append("g")
    .attr("transform", "translate(0," + heightTwo + ")")
    .call(d3.axisBottom(x).tickSize(0));

// Add Y axis
var y = d3.scaleLinear().domain([0, 40]).range([heightTwo, 0]);
svgTwo.append("g").call(d3.axisLeft(y));

// Another scale for subgroup position?
var xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05]);

// color palette = one color per subgroup
var color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

// Show the bars
svgTwo
    .append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d) {
    return "translate(" + x(d.title) + ",0)";
    })
    .selectAll("rect")
    .data(function (d) {
    return subgroups.map(function (key) {
        return { key: key, value: d[key] };
    });
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
    return xSubgroup(d.key);
    })
    .attr("y", function (d) {
    return y(d.value);
    })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function (d) {
    return heightTwo - y(d.value);
    })
    .attr("fill", function (d) {
    return color(d.key);
    });
});
