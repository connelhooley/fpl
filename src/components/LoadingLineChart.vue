<template>
  <LoadingChartContainer>
    <svg
      ref="svg"
      class="
        block
        w-full"
    />
  </LoadingChartContainer>
</template>

<script>
import * as d3 from "d3";
import LoadingChartContainer from "./LoadingChartContainer";

export default {
  props: {
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 150,
    },
    lineData: {
      type: Array,
      default() {
        return [
          {x: 1, y: 1},
          {x: 2, y: 3},
          {x: 3, y: 2},
          {x: 4, y: 5},
          {x: 5, y: 3},
          {x: 6, y: 4},
        ];
      },
    },
  },
  components: {
    LoadingChartContainer,
  },
  mounted() {
    const svg = d3.select(this.$refs.svg);
    const margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    };
    const chartWidth = this.width - margin.left - margin.right;
    const chartHeight = this.height - margin.top - margin.bottom;

    svg
      .attr("viewBox", [0, 0, this.width, this.height])
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

    chart
      .append("path")
      .attr("class", "line")
      .datum(this.lineData)
      .attr("d", (d) => line(d))
      .style("stroke", "currentColor")
      .style("stroke-width", 3)
      .style("fill", "none");

    chart
      .selectAll(".circle")
      .data(this.lineData)
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