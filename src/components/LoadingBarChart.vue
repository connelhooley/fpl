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
    barData: {
      type: Array,
      default() {
        return [
          40,
          10,
          22,
          -5,
        ];
      },
    },
  },
  components: {
    LoadingChartContainer,
  },
  mounted() {
    const svg = d3.select(this.$refs.svg);
    svg.selectAll("*").remove();

    const margin = {
      top: 40,
      right: 50,
      bottom: 40,
      left: 50,
    };
    const chartHeight = this.height - margin.top - margin.bottom;
    const barWidth = 60;

    svg
      .attr("viewBox", [0, 0, this.width, this.height])
      .attr("preserveAspectRatio", "xMinYMin meet");

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const [minTotal, maxTotal] = d3.extent(this.barData);
    
    const y = d3
      .scaleLinear()
      .domain([Math.min(0, minTotal), maxTotal])
      .range([chartHeight, 0]);

    chart
      .append("g")
      .call(d3.axisLeft(y.nice()).tickFormat(""));

    chart
      .selectAll(".bar")
      .data(this.barData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("stroke", "currentColor")
      .attr("x", (_, i) => i * barWidth + 3)
      .attr("y", (d) => y(Math.max(0, d)))
      .attr("height", (d) => Math.abs(y(0) - y(d)))
      .attr("width", barWidth-2)
      .style("stroke-width", 1)
      .style("opacity", 1)
      .style("fill", "currentColor");
  },
};
</script>