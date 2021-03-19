<template>
  <div class="
    bg-gray-200
    dark:bg-gray-700
    rounded-lg"
  >
    <div class="
      p-3
      text-center"
    >
      {{team}}
    </div>
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
import tippy from "tippy.js";

export default {
  props: {
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

      const margin = {
        top: 10,
        right: 40,
        bottom: 50,
        left: 40,
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
        .scalePoint()
        .domain(this.weeks.map((f) => f.weekNumber))
        .range([0, chartWidth]);
      chart
        .append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(x));
      
      chart
        .append("text")
        .attr("y", -(margin.left/2))
        .attr("x", -(chartHeight/2))
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .attr("class", "text-gray-400")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text("FDR");

      chart
        .append("text")
        .attr("dx", chartWidth/2)
        .attr("dy", svgHeight - (margin.bottom/2))
        .attr("text-anchor", "middle")
        .attr("class", "text-gray-400")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text("GW");

      const y = d3
        .scaleLinear()
        .domain([1, 5])
        .range([chartHeight, 0]);
      chart
        .append("g")
        .call(d3.axisLeft(y).ticks(5));

      const line = d3
        .line()
        .x((d) => x(d.weekNumber))
        .y((d) => y(d.difficulty));

      chart
        .selectAll(".line")
        .data(this.weeks.splitAt((week) => week.isBlank))
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", (d) => line(d))
        .attr("stroke", this.color)
        .style("stroke-width", 4)
        .style("fill", "none");

      chart
        .selectAll(".circle")
        .data(this.weeks.filter((week) => !week.isBlank))
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