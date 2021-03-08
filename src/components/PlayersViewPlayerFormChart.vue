<template>
  <svg ref="svg" class="
    inline-block
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
    history: Array,
  },
  data() {
    return {
      isMounted: false,
    };
  },
  watch: {
    history() {
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
      if (!this.history) return;
      const svg = d3.select(this.$refs.svg);
      svg.selectAll("*").remove();

      const margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      };
      const width = (this.width ?? 1000) - margin.left - margin.right;
      const height = (this.height ?? 300) - margin.top - margin.bottom;

      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scalePoint()
        .domain(this.history.map((h) => h.weekNumber))
        .range([0, width]);
      chart
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .domain(d3.extent(this.history.map((h) => h.totalPoints)))
        .range([height, 0]);
      chart
        .append("g")
        .call(d3.axisLeft(y));

      const line = d3
        .line()
        .x((d) => x(d.weekNumber))
        .y((d) => y(d.totalPoints));

      chart
        .append("path")
        .datum(this.history)
        .attr("class", "line text-blue-800 dark:text-blue-300")
        .attr("d", (d) => line(d))
        .attr("stroke", "currentColor")
        .style("stroke-width", 4)
        .style("fill", "none");

      chart
        .selectAll(".circle")
        .data(this.history)
        .enter()
        .append("circle")
        .attr("class", "circle text-blue-800 dark:text-blue-300")
        .attr("cx", (d) => x(d.weekNumber))
        .attr("cy", (d) => y(d.totalPoints))
        .attr("r", 6)
        .style("fill", "currentColor")
        .each(function () {
          tippy(this, {
            theme: "fpl",
            allowHTML: true,
            content: "todo",
          });
        });
    },
  },
};
</script>