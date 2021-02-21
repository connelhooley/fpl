const { ipcRenderer } = require("electron");
const d3 = require("d3");

require("./extensions");

const loading = document.querySelector("#loading");
loading.textContent = "Loading";

Promise.all([ipcRenderer.invoke("static-api"), ipcRenderer.invoke("fixture-api")]).then(([static, fixtures]) => {
  const teams = static.teams.reduce((acc, team) => ({
    ...acc,
    [team.id]: team.name,
  }), {});
  const fixtureDifficultyData = static.teams.map(team => ({
    teamId: team.id,
    weeks: static.events
      .filter(week => !week.finished && !week.is_current)
      .slice(0, 14)
      .map(week => {
        const weekFixtures = fixtures
          .filter(fixture => fixture.event === week.id)
          .filter(fixture => fixture.team_h === team.id || fixture.team_a === team.id)
          .map(fixture => ({
            difficulty: team.id === fixture.team_h
              ? fixture.team_h_difficulty
              : fixture.team_a_difficulty,
            oppositionId: team.id === fixture.team_h
              ? fixture.team_a
              : fixture.team_h,
          }));
        return {
          weekId: week.id,
          difficulty: weekFixtures.map(wf => wf.difficulty).average(),
          oppositions: weekFixtures.map(wf => ({ teamId: wf.oppositionId, difficulty: wf.difficulty }))
        };
      }),
  }));

  const color = d3.scaleOrdinal()
    .domain(fixtureDifficultyData.map(teamData => teamData.teamId))
    .range(d3.schemeSet2);

  fixtureDifficultyData.forEach(teamData => {
    const titleHeight = 20;
    const margin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30,
    };
    const width = 350 - margin.left - margin.right;
    const height = 170 - margin.top - margin.bottom;

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("border-radius", "4px")
      .style("padding", "5px");

    const svg = d3.select("#charts")
      .append("svg")
      .style("margin-bottom", "2rem")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + titleHeight);

    svg
      .append("g")
      .attr("width", width + margin.left + margin.right)
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", titleHeight)
      .style("font-size", 15)
      .text(teams[teamData.teamId]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top + titleHeight})`);

    const x = d3.scalePoint()
      .domain(teamData.weeks.map(f => f.weekId))
      .range([0, width]);
    chart.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([1, 5])
      .range([height, 0]);
    chart.append("g")
      .call(d3.axisLeft(
        d3.scalePoint()
          .domain([1, 2, 3, 4, 5])
          .range([height, 0])));

    const line = d3.line()
      .x((d) => x(d.weekId))
      .y((d) => y(d.difficulty));

    const lineData = [
      0,
      ...teamData.weeks
        .filter((week) => week.oppositions.length === 0)
        .map((week) => teamData.weeks.indexOf(week))
        .flatMap((i) => [i, i+1]),
      teamData.weeks.length,
    ]
      .pairwise()
      .map(([start, stop]) => teamData.weeks.slice(start, stop));

    chart
      .selectAll(".line")
      .data(lineData)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", (d) => line(d))
      .attr("stroke", color(teamData.teamId))
      .style("stroke-width", 4)
      .style("fill", "none");

    chart
      .selectAll(".circle")
      .data(teamData.weeks.filter((f) => !isNaN(f.difficulty)))
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", (d) => x(d.weekId))
      .attr("cy", (d) => y(d.difficulty))
      .attr("r", (d) => 4 + (d.oppositions.length * 2))
      .style("fill", (d) => d3.rgb(color(teamData.teamId)).brighter(d.oppositions.length > 1 ? .7 : 0))
      .on("mouseover", (e, d) => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 1);
        tooltip
          .html(d.oppositions.map(({ teamId, difficulty }) =>
            `${teams[teamId]} (${difficulty})`).join("<br>"))
          .style("left", `${e.pageX + 18}px`)
          .style("top", `${e.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 0)
          .on("end", () => {
            tooltip
              .style("left", "0")
              .style("top", "0")
          });
      });
  });
  loading.textContent = "";
});