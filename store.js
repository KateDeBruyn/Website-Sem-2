//<svg id="viz" width="600" height="600"></svg>
          //<!--transform="translate(30, 50)-->
          //<script>
            let scoreData = [
              { name: "Assignment 1", score: 24 },
              { name: "Assignment 2", score: 26 },
              { name: "Assignment 3", score: 70 },
              { name: "Assignment 4", score: 90 },
              //{ x: 20, y: 20 },
              //{ x: 40, y: 90 },
              //{ x: 80, y: 50 },
            ];

            //Graph variables
            let margin = 50;
            let topMargin = 10;
            let graphHeight = 500;

            let vizArea = d3.select("#viz");

            let xScale = d3.scaleLinear().domain([0, 100]).range([0, 500]); //Here the domain is in % and range in pixels. It is conversion of our data to pixel data.
            console.log(xScale(75) + "px"); //Show what 75% looks like in the range (375px).

            let yScale = d3
              .scaleLinear()
              .domain([0, 100])
              .range([graphHeight, 0]);

            //The axis of the graph
            vizArea
              .append("g")
              .attr("transform", `translate(${margin} , 10)`) //${margin}, ${height}. The 10 allowed us to the 0 clearly
              .call(d3.axisRight(yScale)); //Scale of numbers is based on the domain values - 0 to 100.

            vizArea
              .append("g")
              .attr(
                "transform",
                `translate(${margin} , ${graphHeight + topMargin})`
              )
              .call(d3.axisBottom(xScale));

            vizArea
              .selectAll("dots")
              .data(scoreData)
              .enter() //Has to be in order. Every subsequent line/function that we are going to call at end of this enter
              //will be done for each entry that we have inside this example data. Like a for each loop.
              .append("circle")
              .attr("cx", function (d) {
                return xScale(d.x);
              })
              .attr("cy", function (d) {
                return xScale(d.y);
              })
              .attr("r", 7);