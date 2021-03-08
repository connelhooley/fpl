<template>
  <svg ref="svg" class="
    inline-block
    m-3
    bg-gray-100
    dark:bg-gray-700
    rounded-lg"
  ></svg>
</template>

<script>
import * as d3 from "d3";
import tippy from "tippy.js";

export default {
  props: {
    width: Number,
    height: Number,
    team: String,
    color: String,
    weeks: Array,
  },
  data() {
    return {
      isMounted: false,
    };
  },
  watch: {
    team() {
      this.renderChart();
    },
    weeks() {
      this.renderChart();
    },
    color() {
      this.renderChart();
    },
  },
  mounted() {
    this.isMounted = true;
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (!this.isMounted) return;
      const svg = d3.select(this.$refs.svg);
      svg.selectAll("*").remove();

      const titleHeight = 20;
      const margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      };
      const width = (this.width ?? 350) - margin.left - margin.right;
      const height = (this.height ?? 170) - margin.top - margin.bottom;

      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + titleHeight)
        .append("g")
        .attr("width", width + margin.left + margin.right)
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", titleHeight + 8)
        .style("font-size", 15)
        .style("fill", "currentColor")
        .text(this.team);

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top + titleHeight})`);

      const x = d3
        .scalePoint()
        .domain(this.weeks.map((f) => f.weekNumber))
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
        .x((d) => x(d.weekNumber))
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

      chart
        .selectAll(".circle")
        .data(this.weeks.filter((f) => !isNaN(f.difficulty)))
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", (d) => x(d.weekNumber))
        .attr("cy", (d) => y(d.difficulty))
        .attr("r", (d) => 4 + d.oppositions.length * 2)
        .style("fill", (d) => d3.rgb(this.color).brighter(d.oppositions.length > 1 ? 0.4 : 0))
        .each(function (d) {
          tippy(this, {
            theme: "fpl",
            allowHTML: true,
            content: d.oppositions
              .map(({teamName, difficulty}) => `${teamName} (${difficulty})`)
              .join("<br>"),
          });
        });
    },
  },
};
</script>