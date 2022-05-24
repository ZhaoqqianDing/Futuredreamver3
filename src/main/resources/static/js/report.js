const favourate_transportation = function (transport) {
  var transport_list = [
    "plane",
    "Light rail and tram",
    "Driving",
    "Bus",
    "E-Scooter",
    "Bicycle",
    "Walk",
  ];
  var transport_dict = new Map([
    ["plane", 0],
    ["Light rail and tram", 0],
    ["Driving", 0],
    ["Bus", 0],
    ["E-Scooter", 0],
    ["Bicycle", 0],
    ["Walk", 0],
  ]);
  transport.forEach((element) => {
    transport_dict.set(element, transport_dict.get(element) + 1);
  });
  // get the biggest value in hash map and return the key
  var max = 0;
  var max_key = "";
  transport_dict.forEach(function (value, key) {
    if (value > max) {
      max = value;
      max_key = key;
    }
  });
  // reverse the key and value
  var result = new Map();
  transport_dict.forEach(function (value, key) {
    // make the value as array and push key inside the array. if the key already exist, append the value into the array
    if (result.has(value)) {
      result.get(value).push(key);
    } else {
      result.set(value, [key]);
    }
  });
  // if there are more than one max value
  if (result.get(max).length > 1) {
    var time_format = max === 1 ? "time" : "times";
    $("#favourate-transport")
      .html(`<span id="line1">You have use multiple transportation to travel</span>
                                        <span id="line2">You have use them for <strong>${max}</strong> ${time_format} </span>`);
    $("#favourate-transport").append(`<div></div>`);
    for (let i = 0; i < result.get(max).length; i++) {
      $("#favourate-transport").append(
        `<a href="#" title="${result.get(max)[i]}"><img src="../icons/${
          result.get(max)[i]
        }.png"></a>`
      );
    }
  }
  // create animated text in #favourate-transport using jquery
  else {
    $("#favourate-transport")
      .html(`<span id="line1">Your favourate transport is <strong>${max_key}</strong></span>
                                    <span id="line2">You have use it for <strong>${max}</strong> times </span>
                                    <div></div>
                                    <img src="../icons/${max_key}.png" style="width:100px;height:100px">`);
  }
  const text = document.querySelector("#line1");
  const str_text = text.textContent;
  const split_text = str_text.split("");
  text.textContent = "";
  for (let i = 0; i < split_text.length; i++) {
    text.innerHTML += "<span>" + split_text[i] + "</span>";
  }
  let char = 0;
  let timer = setInterval(onTick, 50);
  function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add("fade");
    char++;
    if (char === split_text.length) {
      complete();
      return;
    }
  }
  function complete() {
    clearInterval(timer);
  }
  const text2 = document.querySelector("#line2");
  const str_text2 = text2.textContent;
  const split_text2 = str_text2.split("");
  text2.textContent = "";
  for (let i = 0; i < split_text2.length; i++) {
    text2.innerHTML += "<span>" + split_text2[i] + "</span>";
  }
  let char2 = 0;
  let timer2 = setInterval(onTick2, 50);
  function onTick2() {
    const span2 = text2.querySelectorAll("span")[char2];
    span2.classList.add("fade");
    char2++;
    if (char2 === split_text2.length) {
      complete2();
      return;
    }
  }
  function complete2() {
    clearInterval(timer2);
  }
};

const co2_emission = function (co2_emission, driving_emission) {
  var labels = [];
  for (let i = 0; i < co2_emission.length; i++) {
    labels.push(`${i} time`);
  }
  const footer = (tooltipItems) => {
    console.log(tooltipItems);
    return (
      "The difference between your choice and driving is: " +
      Math.round(
        (Math.abs(tooltipItems[0].parsed.x - tooltipItems[1].parsed.x) * 100) /
          100
      ) +
      "g"
    );
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Real emission",
        backgroundColor: "#b2df8a",
        borderColor: "rgb(255, 99, 132)",
        data: co2_emission,
        hoverBackgroundColor: "#ccebc5",
      },
      {
        label: "driving emission",
        backgroundColor: "#fdbf6f",
        borderColor: "rgb(255, 99, 132)",
        data: driving_emission,
        hoverBackgroundColor: "#fed9a6",
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
        axis: "y",
      },
      responsive: true,
      scales: {
        x: {
          ticks: {
            callback: function (value) {
              return value + "g";
            },
          },
        },
        y: {
          ticks: {
            callback: function (value, index, ticks) {
              switch (index) {
                case 0:
                  return "first time";
                case 1:
                  return "second time";
                case 2:
                  return "third time";
                case 3:
                  return "fourth time";
                case 4:
                  return "fifth time";
                case 5:
                  return "sixth time";
                case 6:
                  return "seventh time";
              }
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "right",
          boxwidth: 60,
          boxheight: 40,
        },
        title: {
          display: true,
          text: `Your co2 emission in the last ${labels.length} times`,
        },
        tooltip: {
          callbacks: {
            footer: footer,
            label: function (context) {
              let label = context.dataset.label;

              if (label) {
                label += ":";
              }
              return label + context.parsed.x + "g";
            },
          },
        },
      },
    },
  };
  var area = document.getElementById("co2-emission");
  area.innerHTML = `<div class="container"><canvas id='co2-chart'>This chart will show you the barchart of co2 emission</canvas></div>`;
  var ctx = document.getElementById("co2-chart").getContext("2d");
  var myChart = new Chart(ctx, config);
};
const distance_draw = function (distance) {
  var area = document.getElementById("total-distance");
  area.innerHTML = `<div class="container"><canvas id='distance-chart'>This chart will show you the linechart of distance</canvas></div>`;
  var ctx = document.getElementById("distance-chart").getContext("2d");
  // gradient fill
  var gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "#3a86ff");
  gradient.addColorStop(1, "rgba(0, 210, 255, 0.3)");
  var labels = [];
  for (let i = 0; i < distance.length; i++) {
    labels.push(`${i} time`);
  }
  let delayed;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "distance",
        borderColor: "#219ebc",
        data: distance,
        hoverborderColor: "#bde0fe",
        fill: true,
        backgroundColor: gradient,
        pointBackgroundColor: "#03045e",
        tension: 0.2,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      radius: 5,
      hitradius: 20,
      hoverradius: 20,
      indexAxis: "x",
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (
            context.type === "data" &&
            context.mode === "default" &&
            !delayed
          ) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        line: {
          borderWidth: 2,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
        axis: "x",
      },
      responsive: true,
      scales: {
        y: {
          ticks: {
            callback: function (value, index, ticks) {
              return value + "km";
            },
          },
        },
        x: {
          ticks: {
            callback: function (value, index, ticks) {
              switch (index) {
                case 0:
                  return "first time";
                case 1:
                  return "second time";
                case 2:
                  return "third time";
                case 3:
                  return "fourth time";
                case 4:
                  return "fifth time";
                case 5:
                  return "sixth time";
                case 6:
                  return "seventh time";
              }
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Your distance in the last ${labels.length} times`,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label;

              if (label) {
                label += ":";
              }
              return label + context.parsed.y + "km";
            },
          },
        },
      },
    },
  };

  var myChart = new Chart(ctx, config);
};
const environment_benefit = function (co2_emission, driving_emission) {
  // this function will generate the benefit of the environment according to co2_emission
  let water_equal = 1.7;
  let tree_equal = 0.000015;
  var water_sum = 0;
  var tree_sum = 0;
  var co2_sum = 0;
  for (let i = 0; i < co2_emission.length; i++) {
    water_sum += water_equal * (driving_emission[i] - co2_emission[i]);
    tree_sum += tree_equal * (driving_emission[i] - co2_emission[i]);
    co2_sum += driving_emission[i] - co2_emission[i];
  }
  tree_sum = Math.abs(tree_sum).toFixed(4); // round the number to 4 decimal places
  water_sum = Math.abs(water_sum).toFixed(4); // round the number to 4 decimal places
  co2_sum = co2_sum.toFixed(4); // round the number to 4 decimal places
  const benefit_div = document.getElementById("contribution");
  // if co2_sum greater than 0
  if (co2_sum > 0) {
    benefit_div.innerHTML = `<div class="container">
                                <div class="line1">Congratulations! You reduce ${co2_sum}g co2</div>
                                <span class="line2">Your contribution equals to plant these number of trees!</span><br>
                                <div class="icon"><img style="width:50px; height:50px;" src="../icons/trees.png"><div class="counters" data-target="${tree_sum}">0</div></div><br>
                                <span class="line2">Your contribution equals to save these litres of water! </span><br>
                                <div class="icon"><img style="width:50px; height:50px;" src="../icons/water.png"><div class="counters" data-target="${water_sum}">0</div></div>
                                </div>`;
  } else {
    benefit_div.innerHTML = `<div class="container">
                                <div class="line1">You still have great space to reduce co2 emission!</div>
                                <span class="line2">Your could help plant these number of trees!</span><br>
                                <div class="icon"><img style="width:50px; height:50px;" src="../icons/trees.png"><div class="counters" data-target="${tree_sum}">0</div></div><br>
                                <span class="line2">Your could help save these litres of water! </span><br>
                                <div class="icon"><img style="width:50px; height:50px;" src="../icons/water.png"><div class="counters" data-target="${water_sum}">0</div></div>
                                </div>`;
  }
  //   the number in counters can increment automatically
  var counters = document.querySelectorAll(".counters");
  const speed = 200;
  counters.forEach(function (counter) {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = count + inc;
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
        return;
      }
    };
    updateCount();
  });
};
