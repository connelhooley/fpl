<template>
<div class="
  inline-block
  m-3"
>
  <div class="
    animate-pulse
    rounded-lg
    bg-gray-200
    text-gray-300
    dark:bg-gray-700
    dark:text-gray-800
    border-1
    border-gray-300
    dark:border-gray-900
    w-full
    h-full"
  >
    <svg ref="svg"></svg>
  </div>
</div>  
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    width: Number,
    height: Number,
  },
  mounted() {
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
      .attr("height", height + margin.top + margin.bottom);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([1,10])
      .range([0, width]);
    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(10).tickFormat(""));

    const y = d3
      .scaleLinear()
      .domain([1, 5])
      .range([height, 0]);
    chart
      .append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(""));

    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    const lineData = [
      {x: 1, y: 1},
      {x: 2, y: 3},
      {x: 3, y: 2},
      {x: 4, y: 5},
      {x: 5, y: 3},
      {x: 6, y: 4},
    ];

    chart
      .append("path")
      .attr("class", "line")
      .datum(lineData)
      .attr("d", (d) => line(d))
      .style("stroke", "currentColor")
      .style("stroke-width", 3)
      .style("fill", "none");

    chart
      .selectAll(".circle")
      .data(lineData)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", "5")
      .style("fill", "currentColor");
  },
};
</script>