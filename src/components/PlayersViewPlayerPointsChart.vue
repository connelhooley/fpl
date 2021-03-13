<template>
  <div class="
    bg-gray-100
    dark:bg-gray-700
    block
    rounded-lg"
  >
    <div class="
      p-3
      text-center"
    >
      Points Breakdown
    </div>
    <p v-if="anyErrors">There were some errors parsing the data</p>
    <svg v-else ref="svg" class="
      block
      w-full"
    ></svg>
  </div>
</template>

<script>
/* eslint-disable */

import * as d3 from "d3";

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
  computed: {
    anyErrors() {
      if (this.history) {
        const errors = this.history.filter(d => d.calculationsAreCorrect === false);
        if (errors.length > 0) {
          console.dir(errors);
          return true;
        }
        else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    renderChart() {
      if (!this.isMounted) return;
      if (!this.history) return;
      const svg = d3.select(this.$refs.svg);
      svg.selectAll("*").remove();

      const margin = {
        top: 30,
        right: 50,
        bottom: 30,
        left: 50,
      };
      const svgWidth = 600;
      const svgHeight = 300;
      const chartHeight = svgHeight - margin.top - margin.bottom;
      const barWidth = 60;

      const data = [
        {
          label: "Minutes",
          total: d3.sum(this.history, d => d.points.minutesPlayed),
        },
        {
          label: "Bonus",
          total: d3.sum(this.history, d => d.points.bonusPoints),
        },
        {
          label: "Goals",
          total: d3.sum(this.history, d => d.points.goals),
        },
        {
          label: "Assists",
          total: d3.sum(this.history, d => d.points.assists),
        },
        {
          label: "Clean Sheet",
          total: d3.sum(this.history, d => d.points.cleanSheets),
        },
        {
          label: "Conceded",
          total: d3.sum(this.history, d => d.points.conceded),
        },
        {
          label: "Own Goals",
          total: d3.sum(this.history, d => d.points.ownGoals),
        },
        {
          label: "Yellows",
          total: d3.sum(this.history, d => d.points.yellows),
        },
        {
          label: "Reds",
          total: d3.sum(this.history, d => d.points.reds),
        },
        {
          label: "Pens Saved",
          total: d3.sum(this.history, d => d.points.penaltiesSaved),
        },
        {
          label: "Pens Missed",
          total: d3.sum(this.history, d => d.points.penaltiesMissed),
        },
        {
          label: "Saves",
          total: d3.sum(this.history, d => d.points.saves),
        },
      ];

      const color = d3.scaleOrdinal()
        .domain(data.filter(d => d.total !== 0).map(d => d.label))
        .range(d3.schemeSet2);

      svg
        .attr("viewBox", [0, 0, svgWidth, svgHeight])
        .attr("preserveAspectRatio", "xMinYMin meet");

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const [minTotal, maxTotal] = d3.extent(data, d => d.total);
      
      const y = d3
        .scaleLinear()
        .domain([minTotal, maxTotal])
        .range([chartHeight, 0]);

      chart
        .append("g")
        .call(d3.axisLeft(y.nice()));
      
      chart
        .append("text")
        .attr("y", -((margin.left/2)+5))
        .attr("x", -(chartHeight/2))
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .attr("class", "text-gray-400")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text("Points Earned");

      chart
        .selectAll(".rectangle")
        .data(data.filter(d => d.total !== 0).map(d => d.total))
        .enter()
        .append("rect")
        .attr("class", "rectangle")
        .attr("stroke", "currentColor")
        .attr("x", (_, i) => i * barWidth + 3)
        .attr("y", (d) => y(Math.max(0, d)))
        .attr("height", (d) => Math.abs(y(0) - y(d)))
        .attr("width", barWidth)
        .style("stroke-width", 1)
        .style("opacity", 1)
        .style("fill", (_, i) => color(i));

      chart
        .selectAll(".label")
        .data(data.filter(d => d.total !== 0))
        .enter()
        .append("text")
        .attr("x", (_, i) => i * (barWidth) + (barWidth/2) + 3)
        .attr("y", (d) => y(Math.max(0, d.total))-6)
        .attr("text-anchor", "middle")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text((d) => d.label);
    },
  },
};
</script>