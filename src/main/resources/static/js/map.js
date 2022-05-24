var distanceRecor=0;

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: -37.907803, lng: 145.133957 },
  });

  directionsRenderer.setMap(map);
  var input = document.getElementById("start");
  new google.maps.places.Autocomplete(input);
  var input1 = document.getElementById("end");
  new google.maps.places.Autocomplete(input1);
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    calculateThePrompt();
  };
  const onChangeHandler2 = function () {
    calculateThePrompt();
  };

  //document.getElementById("start").addEventListener("change", onChangeHandler);
  // document.getElementById("end").addEventListener("change", onChangeHandler);
  document
    .getElementById("div_calculte")
    .addEventListener("click", onChangeHandler);

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
var flagCalculate=0;
function calculateThePrompt() {
  flagCalculate=1;
  var origins = document.getElementById("start").value;
  var destinations = document.getElementById("end").value;
  var service = new google.maps.DistanceMatrixService();
  const request = {
    origins: [origins],
    destinations: [destinations],
    travelMode: google.maps.TravelMode.TRANSIT,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };
  service.getDistanceMatrix(request).then((response) => {
    // put response
    console.log(response);
    //  const type = document.getElementById("type").value;
    const distance = response.rows[0].elements[0].distance.value;
    const duration = response.rows[0].elements[0].duration.value;
    //  console.log("距离： "+distance+" dur: "+duration);
    $.ajax({
      type: "post",
      url: "/CalculatorController/test",
      async: false,

      data: {
        //type: type,
        distance: distance,
        // duration:duration
      },
      success: function (result) {
        var transportation = result[0];
        const icons_set = new Map([
          [
            "plane",
            '<a href="#" title="Flight icons creat\
                                                            ed by Nuion - Flaticon"><img src = "../icon/flight.png"></a>',
          ],
          [
            "light_rail_or_tram",
            `<a href="#" title="Tram icons created by Freepik - Flaticon">
                                                <img src="../icon/tram.png">
                                            </a>`,
          ],
          [
            "driving",
            `<a href="#" title="Transportation icons created by Freepik - Flaticon">
                                                <img src="../icon/car.png">
                                            </a>`,
          ],
          [
            "Bus",
            `<a href="#" title="Bus icons created by Freepik - Flaticon">
                                                <img src="../icon/bus.png">
                                            </a>`,
          ],
          [
            "walking",
            `<a href="#" title="Walking icons created by Freepik - Flaticon">
                                                <img src="../icon/walking.png">
                                            </a>`,
          ],
          [
            "Bicycle",
            `<a href="#" title="Bike icons created by Freepik - Flaticon">
                                                <img src="../icon/bicycle.png">
                                            </a>`,
          ],
          [
            "E-Scooter",
            `<a href="#" title="Kick scooter icons created by Smashicons - Flaticon">
                                                <img src="../icon/escooter.png">
                                            </a>`,
          ],
        ]);
        console.log("result:", transportation);
        // add DOM into recommendation
        // 这个switch要处理很多事情-要call一个generate flip card的函数，这个函数可以根据条件生成对应的flip
        // card，然后添加到DOM中
        switch (transportation) {
          case "plane":
            $("#recommendation").html(icons_set.get("plane"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>plane</strong> to travel</p>"
            );
            generate_flip_card("plane");
            break;
          case "light_rail_or_tram":
            $("#recommendation").html(icons_set.get("light_rail_or_tram"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>tram or train</strong> to travel</p>"
            );
            generate_flip_card("light_rail_or_tram");
            break;
          case "driving":
            $("#recommendation").html(icons_set.get("driving"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>car</strong> to travel</p>"
            );
            generate_flip_card("driving");
            break;
          case "Bus":
            $("#recommendation").html(icons_set.get("Bus"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>bus</strong> to travel</p>"
            );
            generate_flip_card("Bus");
            break;
          case "walking":
            $("#recommendation").html(icons_set.get("walking"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>walking</strong> to travel</p>"
            );
            generate_flip_card("Walking");
            break;
          case "Bicycle":
            $("#recommendation").html(icons_set.get("Bicycle"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>cycling</strong> to travel.</p>"
            );
            generate_flip_card("Bicycle");
            break;
          case "E-Scooter":
            $("#recommendation").html(icons_set.get("E-Scooter"));
            $("#recommendation_prompt").html(
              "<p>Based on the current travel distance, recommend you taking <strong>e-scooter</strong> to travel.</p>"
            );
            generate_flip_card("E-Scooter");
            break;
          default:
            $("#recommendation").html("No recommendation");
        }
        const regex1 = /(?<=: ).+?(?=;)/g;
        // create a prompt with img and text

        // generate prompt using jquery
        // retrieve require numbers from result
        var all_res = result[1].match(regex1);
        console.log("all_res:", all_res);
        const co2 = all_res[0];
        $("#co2").text("CO2 emission is: " + co2);
        $("#co2").attr("style", "color:black");
        // set co2_instruction unvisiable
        // change co2 to co2_instruction when click co2
        // $('#co2').click(function () {
        //     // if the text of co2 is co2, change it to co2_instruction
        //     if($('#co2').text()==co2){
        //         $('#co2').animate({
        //             "opacity": 0
        //         });
        //         $('#co2').text(instructions[0]);
        //         $('#co2').animate({
        //             "opacity": "1",
        //             "font-size": "15"
        //         });
        //     } //else change it to co2
        //     else{
        //         $('#co2').animate({
        //             "opacity": "0"
        //         });
        //         $('#co2').text(co2);
        //         $('#co2').animate({
        //             "opacity": "1",
        //             "font-size": "25"
        //         });
        //     }
        // });
        // // do the same thing to water
        // $('#water').click(function () {
        //     if($('#water').text()==water){
        //         $('#water').animate({
        //             "opacity": "0"
        //         });
        //         $('#water').text(instructions[1]);
        //         $('#water').animate({
        //             "opacity": "1",
        //             "font-size": "15"
        //         });
        //     }
        //     else{
        //         $('#water').animate({
        //             "opacity": "0"
        //         });
        //         $('#water').text(water);
        //         $('#water').animate({
        //             "opacity": "1",
        //             "font-size": "25"
        //         });
        //     }
        // });
        $("#distance").text("The distance is: " + distance / 1000 + "km");
        $("#distance").attr("style", "color:black");
        distanceRecor=11;
      },
      error: function (result) {
        alert("error");
      },

    });
    $.ajax({
      type: "post",
      url: "/CalculatorController/visual",
      async: false,

      success: function (resultNum) {
        d3.selectAll("svg").remove(); // $('#prompt_result').html(result);
        console.log(resultNum);
        // co2
        var plane = resultNum[0];
        // water
        var rail_tram = resultNum[1];
        // car run on the way
        var car = resultNum[2];
        // co2 drive
        var bus = resultNum[3];
        // water drive
        var bike = resultNum[4];
        // car run on the way drive
        var escooter = resultNum[5];
        // create an array to store co2_recommend , water_recommend , car_day_recommend together
        var walk = resultNum[6];
        const co2_set = [plane, car, escooter, bus, rail_tram, bike, walk];
        var ylabels = [
          "plane",
          "driving",
          "E-Scooter",
          "Bus",
          "light rail",
          "Bicycle",
          "Walking",
        ];
        var margin = 30;
        var width = $("#visualization").width() - margin;
        var height = 350;
        var xDomain = [0, d3.max(co2_set)];
        var xScale = d3
          .scaleLinear()
          .domain(xDomain)
          .range([margin, width - margin]);
        var yScale = d3
          .scaleBand()
          .domain(ylabels)
          .range([margin, height])
          .padding(0.1);
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
        const icon_axis = [
          "\uf072",
          "\uf1b9",
          "\uf7c5",
          "\uf207",
          "\uf238",
          "\uf206",
          "\uf183",
        ];
        const color_pallete = [
          "#8dd3c7",
          "#ffffb3",
          "#bebada",
          "#fb8072",
          "#80b1d3",
          "#fdb462",
          "#b3de69",
        ];
        var svg = d3
          .select("#visualization")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10);

        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "toolTip");
        const index = d3.local();
        // co2 chart
        svg
          .append("g")
          .selectAll("text")
          .data(co2_set)
          .join("text")
          .attr("class", "y axis")
          .attr("transform", "translate(-25,20)")
          .attr("font-size", "20")
          .attr("font-family", "FontAwesome")
          .attr("x", margin)
          .attr("y", (d, i) => yScale(ylabels[i]))
          .text((d, i) => icon_axis[i])
          .attr("dy", "0.3em");

        svg
          .append("g")
          .selectAll("rect")
          .data(co2_set)
          .join("rect")
          .attr("x", margin)
          .attr("y", (d, i) => yScale(ylabels[i]))
          .attr("width", (d) => xScale(d))
          .attr("height", yScale.bandwidth())
          .attr("fill", (d, i) => color_pallete[i])
          .attr("pointer-events", "visible")
          .each(function (d, i) {
            index.set(this, i); // Store index in local variable.
          })
          .on("mousemove", function (event, d) {
            const i = index.get(this);
            console.log(i);
            tooltip
              .style("left", event.pageX - 50 + "px")
              .style("top", event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(
                `<p>CO2 emissions of ` +
                  ylabels[i] +
                  ":" +
                  d3.format(".2f")(d) +
                  `</p>`
              );
          })
          .on("mouseout", function (d) {
            tooltip.style("display", "none");
          });

        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text("Cost of CO2 emissions(gram)");

        svg
          .append("g")
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .selectAll("text")
          .data(co2_set)
          .join("text")
          .attr("x", (d) => xScale(d) + margin)
          .attr("y", (d, i) => yScale(ylabels[i]) + yScale.bandwidth() / 2)
          .attr("dy", "0.35em")
          .attr("dx", "-0.5em")
          .text((d) => d3.format(".2f")(d) + "g")
          .call((text) =>
            text
              .filter((d) => xScale(d) < width / 2)
              .attr("dx", +30)
              .attr("text-anchor", "start")
          );
      },
      error: function (result) {
        alert("error");
      },
      async: false,
    });
  });
  //console.log('this is num 1  '+num1);
  console.log(distanceRecor);
}
// define a function called generate_flip_card
function generate_flip_card(transportation_) {
  // if transportation is light_rail_or_tram , transportation = 'Bus'
  // if(transportation_=='light_rail_or_tram'){
  //     transportation_='Bus';
  // }
  var transportation = transportation_;
  document.getElementById("image-mask").src = `../images/${transportation}.jpg`;
  $(".text-link").html(
    `<a href='/PageController/to${transportation}'><h4>` +
      transportation +
      `</h4></a>`
  );
}

function record(){
   var typeS = document.getElementById("type").value;

  $.ajax({
    type: "post",
    url: "/MapController/record",
    async: false,

    data: {
      type: typeS,
      //distance: distance,
      // duration:duration
    },
    success: function () {

    },
    error: function (result) {
      alert("error");
    },

  })

}

function checkCalculateResult() {

  if(flagCalculate==0){
    alert("please calculate first and then record the result")
    return false;
  }
  else if(flagCalculate==2){
    alert("This result is already been recorded")
    return false;
  }
  else{
    record();
    alert("record success");
    flagCalculate=2;

  }

  return true;
}