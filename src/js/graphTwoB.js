const api_url_two =
"https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&steamAppID=";

// Tekken7, Fotonica, Gomo, Semblance
// IF DATA DOES NOT APPEAR, PLEASE TAKE THE FIRST FOUR "STEAMAPPID" FROM THE JSONVALID.JS FILE AND
// USE THOSE IDS TO SEE HOW THIS GRAPH WORKS. GAMES MAY CYCLE OUT OF THE API BECAUSE THEY ARE NOT ON SALE ANYMORE.
const steamAppIdsTwo = ["389730", "253290", "265330", "700160"];
var gameDataTwo = [];

function CreateGraphTwoData(gameData){
    return({
        name: gameData.internalName,
        steamRatingPercent: parseFloat(gameData.steamRatingPercent),
    });
}

async function getDataG2() {
    console.log("fetching game data");

    for(let i = 0; i < steamAppIdsTwo.length; i++){
        console.log("fetching with ID: " + steamAppIdsTwo[i]);

        // Raw data
        let api_data = await fetch(api_url_two + steamAppIdsTwo[i], {
        //Specifying it's a get request
        method: "GET",
        contentType: "application/json"
    });

    console.log("fetched with ID: " + steamAppIdsTwo[i])

    // JS get request
    // Converts raw data to text
    let api_text = await api_data.text();
    let api_json = JSON.parse(api_text);
    console.log(api_json);

    gameDataTwo.push(CreateGraphTwoData(api_json[0]))

    }

    console.log(gameDataTwo);

      let widthG2 = 600;
      let heightG2 = 300;
      let marginG2 = { top: 50, bottom: 50, left: 50, right: 50 };

      let vizAreaG2 = d3.select("#vizG2");

      vizAreaG2
        .append("svg")
        .attr("height", heightG2 - marginG2.top - marginG2.bottom)
        .attr("width", widthG2 - marginG2.left - marginG2.right)
        .attr("viewBox", [0, 0, widthG2, heightG2]);

      let xScaleG2 = d3
        .scaleBand()
        .domain(d3.range(gameDataTwo.length))
        .range([marginG2.left, widthG2 - marginG2.right])
        .padding(0.1);

      let yScaleG2 = d3
        .scaleLinear()
        .domain([0, 100])
        .range([heightG2, marginG2.bottom - marginG2.top]);

      vizAreaG2
        .append("g")
        .attr("fill", "rgb(169, 112, 255)")
        .selectAll("rect")
        .data(gameDataTwo.sort((a, b) => d3.descending(a.steamRatingPercent, b.steamRatingPercent)))
        .join("rect")
        .attr("x", (d, i) => xScaleG2(i))
        .attr("y", (d) => yScaleG2(d.steamRatingPercent))
        .attr("height", (d) => yScaleG2(0) - yScaleG2(d.steamRatingPercent))
        .attr("width", xScaleG2.bandwidth());

      function xAxisG2(g) {
        g.attr(
          "transform",
          `translate(0, ${heightG2 - marginG2.bottom + 50})` //${marginG1}, ${heightG1 + marginG1.top}
        )
          .call(d3.axisBottom(xScaleG2).tickFormat((i) => gameDataTwo[i].name))
          .attr("font-size", "15px");
      }

      function yAxisG2(g) {
        g.attr("transform", `translate(${marginG2.left}, 0)`)
          .call(d3.axisLeft(yScaleG2).ticks(null, gameDataTwo.format))
          .attr("font-size", "15px");
      }

      vizAreaG2.append("g").call(yAxisG2);
      vizAreaG2.append("g").call(xAxisG2);
      vizAreaG2.node();

  }

  getDataG2();




  