const { ipcRenderer } = require("electron");
const d3 = require("d3");

const loading = document.querySelector("#loading");
loading.textContent = "Loading";

Promise.all([ipcRenderer.invoke("static-api"), ipcRenderer.invoke("fixture-api")]).then(([static, fixtures]) => {
  const teams = static.teams.toLookUp((team) => team.id, (team) => team.name);

  const fixtureDifficulties = fixtures
    .filter((fixture) => fixture.started !== true)
    .filter((fixture) => fixture.event !== null)
    .flatMap((fixture) => [
      {
        team: teams[fixture.team_h],
        week: fixture.event,
        difficulty: fixture.team_h_difficulty,
      },
      {
        team: teams[fixture.team_a],
        week: fixture.event,
        difficulty: fixture.team_a_difficulty,
      },
    ]);

  const data = Object.values(teams).map((team) => ({
    team: team,
    fixtures: fixtureDifficulties
      .filter(fixture => fixture.team === team)
      .map(({ week, difficulty }) => ({ week, difficulty })),
  }));

  const margin = {
    top: 10,
    right: 100,
    bottom: 30,
    left: 30,
  };
  const width = 1100 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const color = d3.scaleOrdinal()
    .domain(Object.values(teams))
    .range(d3.schemeSet2);

  const x = d3.scalePoint()
    .domain(fixtureDifficulties.map((fixture) => fixture.week))
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  const y = d3.scalePoint()
    .domain([1, 2, 3, 4, 5])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  const line = d3.line()
    .x((d) => x(d.week))
    .y((d) => y(d.difficulty));

  const refreshChart = () => {
    const teamsEnabled = [];
    const inputs = document.querySelectorAll("#filters input");
    inputs.forEach(e => {
      if (e.checked) {
        teamsEnabled.push(e.value);
      }
    });
    const filteredData = data.filter(d => teamsEnabled.includes(d.team));

    const chartLines = svg
      .selectAll(".chartLine")
      .data(filteredData);
    chartLines
      .enter()
        .append("path")
      .merge(chartLines)
        .attr("class", "chartLine")
        .attr("d", (d) => line(d.fixtures))
        .attr("stroke", (d) => color(d.team))
        .style("stroke-width", 4)
        .style("fill", "none");
    chartLines
      .exit()
        .remove();
    const chartLineLabels = svg
      .selectAll(".chartLineLabel")
      .data(filteredData);
    chartLineLabels
      .enter()
        .append('g')
      .merge(chartLineLabels)
        .attr("class", "chartLineLabel")
        .append("text")
        .datum((d) => ({ team: d.team, fixture: d.fixtures[d.fixtures.length - 1] })) // Keep only the last value of each time series
        .attr("transform", (d) => `translate(${x(d.fixture.week)}, ${y(d.fixture.difficulty)})`) // Put the text at the position of the last point
        .attr("x", 12) // Shift the text a bit more right
        .text((d) => d.team)
        .style("fill", (d) => color(d.team))
        .style("font-size", 15);
      chartLineLabels
        .exit()
          .remove();
  };

  const filters = document.querySelector("#filters");
  filters.style = "width: 900px;";
  Object.values(teams).forEach(team => {
    const label = document.createElement("label");
    label.style = "margin-right: .3rem;"
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", team);
    input.addEventListener("change", refreshChart);
    const span = document.createElement("span");
    span.textContent = team;
    
    label.appendChild(input);
    label.appendChild(span);
    filters.appendChild(label);
  });
  loading.textContent = "";
  refreshChart();
});