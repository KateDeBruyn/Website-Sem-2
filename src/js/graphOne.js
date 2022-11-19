const loadingElement = document.getElementById("loading");
const graphOneElement = document.getElementById("graphOneDiff");

graphOneElement.style.display = "none";

const api_url =
"https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&steamAppID=";

// Tekken7, 
const steamAppIds = ["389730", "420060", "429660", "544750"];
var gameData = [];

function CreateGraphOneData(gameData){
    return({
        name: gameData.internalName,
        days: parseFloat(gameData.dealRating),
    });
}

async function getDataG1() {
    console.log("fetching game data");

    for(let i = 0; i < steamAppIds.length; i++){
        console.log("fetching with ID: " + steamAppIds[i]);

        // Raw data
        let api_data = await fetch(api_url + steamAppIds[i], {
        //Specifying it's a get request
        method: "GET",
        contentType: "application/json"
    });

    console.log("fetched with ID: " + steamAppIds[i])

    // JS get request
    // Converts raw data to text
    let api_text = await api_data.text();
    let api_json = JSON.parse(api_text);
    console.log(api_json);

    // gameData.push({
    //     name: api_json[0].internalName,
    //     days: parseFloat(api_json[0].dealRating),
    // })

    gameData.push(CreateGraphOneData(api_json[0]))

    }

    console.log(gameData);

      let widthG1 = 600;
      let heightG1 = 300;
      let marginG1 = { top: 50, bottom: 50, left: 50, right: 50 };

      let vizAreaG1 = d3.select("#vizG1");

      vizAreaG1
        .append("svg")
        .attr("height", heightG1 - marginG1.top - marginG1.bottom)
        .attr("width", widthG1 - marginG1.left - marginG1.right)
        .attr("viewBox", [0, 0, widthG1, heightG1]);

      let xScaleG1 = d3
        .scaleBand()
        .domain(d3.range(gameData.length))
        .range([marginG1.left, widthG1 - marginG1.right])
        .padding(0.1);

      let yScaleG1 = d3
        .scaleLinear()
        .domain([0, 30])
        .range([heightG1, marginG1.bottom - marginG1.top]);

      vizAreaG1
        .append("g")
        .attr("fill", "rgb(169, 112, 255)")
        .selectAll("rect")
        .data(gameData.sort((a, b) => d3.descending(a.days, b.days)))
        .join("rect")
        .attr("x", (d, i) => xScaleG1(i))
        .attr("y", (d) => yScaleG1(d.days))
        .attr("height", (d) => yScaleG1(0) - yScaleG1(d.days))
        .attr("width", xScaleG1.bandwidth());

      function xAxisG1(g) {
        g.attr(
          "transform",
          `translate(0, ${heightG1 - marginG1.bottom + 50})` //${marginG1}, ${heightG1 + marginG1.top}
        )
          .call(d3.axisBottom(xScaleG1).tickFormat((i) => gameData[i].name))
          .attr("font-size", "15px");
      }

      function yAxisG1(g) {
        g.attr("transform", `translate(${marginG1.left}, 0)`)
          .call(d3.axisLeft(yScaleG1).ticks(null, gameData.format))
          .attr("font-size", "15px");
      }

      vizAreaG1.append("g").call(yAxisG1);
      vizAreaG1.append("g").call(xAxisG1);
      vizAreaG1.node();

      loadingElement.style.display = "none";
      graphOneElement.style.display = "block";

  }

  getDataG1();




  