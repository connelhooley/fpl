<template>
  <ContentContainer title="Form">
    <svg
      ref="svg"
      class="
        block
        w-full"
    />  
  </ContentContainer>    
</template>

<script>
import * as d3 from "d3";
import tippy from "tippy.js";
import ContentContainer from "./ContentContainer";

export default {
  props: {
    history: Array,
  },
  data() {
    return {
      isMounted: false,
    };
  },
  components: {
    ContentContainer
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
        top: 40,
        right: 50,
        bottom: 50,
        left: 50,
      };
      const svgWidth = 1200;
      const svgHeight = 300;
      const chartWidth = svgWidth - margin.left - margin.right;
      const chartHeight = svgHeight - margin.top - margin.bottom;

      svg
        .attr("viewBox", [0, 0, svgWidth, svgHeight])
        .attr("preserveAspectRatio", "xMinYMin meet");

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const historyNoBlanks = this.history.filter((history) => !history.isBlank);

      const x = d3
        .scalePoint()
        .domain(d3.range(1, d3.max(this.history, (d) => d.weekNumber) + 1))
        .range([0, chartWidth]);
      chart
        .append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .domain(d3.extent(historyNoBlanks, (d) => d.totalPoints))
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
        .text("Total Points");

      chart
        .append("text")
        .attr("dx", chartWidth/2)
        .attr("dy", svgHeight - (margin.bottom))
        .attr("text-anchor", "middle")
        .attr("class", "text-gray-400")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text("GW");

      const minY = d3.min(historyNoBlanks, (d) => d.totalPoints);

      if (minY < 0) {
        const [minX, maxX] = d3.extent(this.history, (d) => d.weekNumber);
        chart
          .append("line") 
          .attr("x1", x(minX))
          .attr("y1", y(0)+1)
          .attr("x2", x(maxX))
          .attr("y2", y(0)+1)
          .attr("class", "text-gray-400 dark:text-gray-500")
          .attr("stroke", "currentColor")
          .style("stroke-width", 1)
          .style("stroke-dasharray", 4)
          .style("fill", "none");
      }

      const line = d3
        .line()
        .x((d) => x(d.weekNumber))
        .y((d) => y(d.totalPoints));

      chart
        .selectAll(".line")
        .data(this.history.splitAt((history) => history.isBlank))
        .enter()
        .append("path")
        .attr("class", "line text-blue-500 dark:text-blue-300")
        .attr("d", (d) => line(d))
        .attr("stroke", "currentColor")
        .style("stroke-width", 3)
        .style("fill", "none");

      chart
        .selectAll(".circle")
        .data(historyNoBlanks)
        .enter()
        .append("circle")
        .attr("class", "circle text-blue-500 dark:text-blue-300")
        .attr("cx", (d) => x(d.weekNumber))
        .attr("cy", (d) => y(d.totalPoints))
        .attr("r", 8)
        .style("fill", "currentColor");

      chart
        .selectAll(".circleLabel")
        .data(historyNoBlanks)
        .enter()
        .append("text")
        .attr("class", "invisible md:visible text-white dark:text-black circleLabel font-mono")
        .style("fill", "currentColor")
        .attr("text-anchor", "middle")
        .text((d) => d.totalPoints)
        .attr("font-size", 10)
        .attr("dx", (d) => x(d.weekNumber))
        .attr("dy", (d) => y(d.totalPoints)+2);

      chart
        .selectAll(".tooltipTarget")
        .data(historyNoBlanks)
        .enter()
        .append("circle")
        .attr("class", "tooltipTarget")
        .attr("cx", (d) => x(d.weekNumber))
        .attr("cy", (d) => y(d.totalPoints))
        .attr("r", 8)
        .style("fill-opacity", 0)
        .each(function(d) {
          const appendRow = (label, value, always) => {
            if (always || value) {
              return `<tr class="bg-gray-900 even:bg-gray-800 dark:bg-gray-100 dark:even:bg-gray-200"><td class="p-1">${label}:</td><td class="p-1">${value}</td></tr>`
            } else {
              return "";
            }
          };

          let content = `<div class="font-bold mb-1">Vs. ${d.oppositionName}</div>`;
          content += `<table class="border-collapse text-xs w-full">`;
          content += appendRow("Points", d.totalPoints, true);
          content += appendRow("Minutes", d.minutesPlayed, true);
          content += appendRow("Bonus", d.bonusPoints);
          content += appendRow("Goals", d.goals);
          content += appendRow("Assists", d.assists);
          content += appendRow("Clean Sheets", d.cleanSheets);
          content += appendRow("Conceded", d.conceded);
          content += appendRow("Saves", d.saves);
          content += appendRow("Pens. Saved", d.penaltiesSaved);
          content += appendRow("Pens. Missed", d.penaltiesMissed);
          content += appendRow("Yellows", d.yellows);
          content += appendRow("Reds", d.reds);
          content += appendRow("OGs", d.ownGoals);
          content += `</table>`;

          tippy(this, {
            theme: "fpl",
            allowHTML: true,
            content,
          });
        });
    },
  },
};
</script>