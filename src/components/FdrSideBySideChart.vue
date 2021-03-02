<template>
  <svg ref="svg" class="inline"></svg>
</template>

<script>
import * as d3 from "d3";
import tippy from "tippy.js";

export default {
  props: {
    width: Number,
    height: Number,
    color: String,
    teamId: Number,
    weeks: Array,
    teams: Object,
  },
  mounted() {
    const titleHeight = 20;
    const margin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30,
    };
    const width = (this.width ?? 350) - margin.left - margin.right;
    const height = (this.height ?? 170) - margin.top - margin.bottom;

    const svg = d3.select(this.$refs.svg)
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
      .text(this.teams[this.teamId]);

    const chart = svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left}, ${margin.top + titleHeight})`
      );

    const x = d3
      .scalePoint()
      .domain(this.weeks.map((f) => f.weekId))
      .range([0, width]);
    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([1, 5])
      .range([height, 0]);
    chart
      .append("g")
      .call(d3.axisLeft(y).ticks(5));

    const line = d3
      .line()
      .x((d) => x(d.weekId))
      .y((d) => y(d.difficulty));

    const lineData = [
      0,
      ...this.weeks
        .filter((week) => week.oppositions.length === 0)
        .map((week) => this.weeks.indexOf(week))
        .flatMap((i) => [i, i + 1]),
      this.weeks.length,
    ]
      .pairwise()
      .map(([start, stop]) => this.weeks.slice(start, stop));

    chart
      .selectAll(".line")
      .data(lineData)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", (d) => line(d))
      .attr("stroke", this.color)
      .style("stroke-width", 4)
      .style("fill", "none");

    const vm = this;
    chart
      .selectAll(".circle")
      .data(this.weeks.filter((f) => !isNaN(f.difficulty)))
      .enter()
      .append("circle")
      .attr("id", (d) => `circle-${this.teamId}-${d.weekId}`)
      .attr("class", "circle")
      .attr("aria-describedby", (d=> `tooltip-${this.teamId}-${d.weekId}`))
      .attr("cx", (d) => x(d.weekId))
      .attr("cy", (d) => y(d.difficulty))
      .attr("r", (d) => 4 + d.oppositions.length * 2)
      .style("fill", (d) =>
        d3.rgb(this.color).brighter(d.oppositions.length > 1 ? 0.7 : 0)
      )
      .each(function (d) {
        tippy(this, {
          theme: "fpl",
          allowHTML: true,
          content: d.oppositions
            .map(({teamId, difficulty}) => `${vm.teams[teamId]} (${difficulty})`)
            .join("<br>"),
        });
      });
  },
};
</script>