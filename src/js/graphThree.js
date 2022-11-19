
    // Steam Rating
    var data1 = [
    { title: "Bayonetta", value: 92 },
    { title: "Mortal Kombat XL", value: 85 },
    { title: "Fallout 3", value: 78 },
    { title: "Breath of Ghosts", value: 52 },
    ];

    // Savings
    var data2 = [
    { title: "Bayonetta", value: 75 },
    { title: "Mortal Kombat XL", value: 80 },
    { title: "Fallout 3", value: 75 },
    { title: "Breath of Ghosts", value: 90 },
    ];

    // set the dimensions and margins of the graph
    var marginThree = { top: 30, right: 30, bottom: 70, left: 60 },
    widthThree = 460 - marginThree.left - marginThree.right,
    heightThree = 400 - marginThree.top - marginThree.bottom;

    // append the svg object to the body of the page
    var svg = d3
    .select("#graphThree")
    .append("svg")
    .attr(
        "width",
        widthThree + marginThree.left + marginThree.right
    )
    .attr(
        "height",
        heightThree + marginThree.top + marginThree.bottom
    )
    .append("g")
    .attr(
        "transform",
        "translate(" + marginThree.left + "," + marginThree.top + ")"
    );

    // Initialize the X axis
    var x = d3.scaleBand().range([0, widthThree]).padding(0.2);
    var xAxis = svg
    .append("g")
    .attr("transform", "translate(0," + heightThree + ")");

    // Initialize the Y axis
    var y = d3.scaleLinear().range([heightThree, 0]);
    var yAxis = svg.append("g").attr("class", "myYaxis");

    // A function that create / update the plot for a given variable:
    function update(data) {
    // Update the X axis
    x.domain(
        data.map(function (d) {
        return d.title;
        })
    );
    xAxis.call(d3.axisBottom(x));

    // Update the Y axis
    y.domain([
        0,
        d3.max(data, function (d) {
        return d.value;
        }),
    ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    var u = svg.selectAll("rect").data(data);

    u.enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function (d) {
        return x(d.title);
        })
        .attr("y", function (d) {
        return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
        return heightThree - y(d.value);
        })
        .attr("fill", "#69b3a2");

    // If less group in the new dataset, I delete the ones not in use anymore
    u.exit().remove();
    }

    var buttonOneElement = document.getElementById("buttonOne");

    // Replace object with buttonElement
    // object.addEventListener("click", function(){
    // update(data1)
    // });

    // Replace object with buttonElement
    // object.addEventListener("click", function(){
    // update(data1)
    // });

    // Initialize the plot with the first dataset
    this.update(data1);