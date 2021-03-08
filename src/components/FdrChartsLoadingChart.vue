<template>
  <div class="
    p-4
    animate-pulse
    bg-gray-200
    text-gray-300
    dark:bg-gray-700
    dark:text-gray-800
    rounded-lg"
  >
    <svg 
      ref="svg"
      class="
        block
        w-full"
    ></svg>  
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    const svg = d3.select(this.$refs.svg);

    const margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    };
    const svgWidth = 400;
    const svgHeight = 150;
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    svg
      .attr("viewBox", [0, 0, svgWidth, svgHeight])
      .attr("preserveAspectRatio", "xMinYMin meet");

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([1,10])
      .range([0, chartWidth]);
    chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x).ticks(10).tickFormat(""));

    const y = d3
      .scaleLinear()
      .domain([1, 5])
      .range([chartHeight, 0]);
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