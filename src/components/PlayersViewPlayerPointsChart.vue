<template>
  <ContentContainer title="Points Breakdown">
    <p v-if="anyErrors">There were some errors parsing the data</p>
    <svg
      v-else
      ref="svg"
      class="
        block
        w-full"
    />  
  </ContentContainer>
</template>

<script>
import * as d3 from "d3";
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
    ContentContainer,
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
        const errors = this.history.filter((d) => d.calculationsAreCorrect === false);
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
        top: 40,
        right: 50,
        bottom: 40,
        left: 50,
      };
      const svgWidth = 600;
      const svgHeight = 250;
      const chartHeight = svgHeight - margin.top - margin.bottom;
      const barWidth = 60;

      const data = [
        {
          label: "Minutes",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.minutesPlayed),
        },
        {
          label: "Bonus",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.bonusPoints),
        },
        {
          label: "Goals",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.goals),
        },
        {
          label: "Assists",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.assists),
        },
        {
          label: "Clean Sheet",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.cleanSheets),
        },
        {
          label: "Conceded",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.conceded),
        },
        {
          label: "Own Goals",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.ownGoals),
        },
        {
          label: "Yellows",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.yellows),
        },
        {
          label: "Reds",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.reds),
        },
        {
          label: "Pens Saved",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.penaltiesSaved),
        },
        {
          label: "Pens Missed",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.penaltiesMissed),
        },
        {
          label: "Saves",
          total: d3.sum(this.history.filter((history) => history.points), (d) => d.points.saves),
        },
      ].filter((d) => d.total !== 0);

      const color = d3.scaleOrdinal()
        .domain(data.map((d) => d.label))
        .range(d3.schemeSet2);

      svg
        .attr("viewBox", [0, 0, svgWidth, svgHeight])
        .attr("preserveAspectRatio", "xMinYMin meet");

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const [minTotal, maxTotal] = d3.extent(data, (d) => d.total);
      
      const y = d3
        .scaleLinear()
        .domain([Math.min(0, minTotal), maxTotal])
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
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("stroke", "currentColor")
        .attr("x", (_, i) => i * barWidth + 3)
        .attr("y", (d) => y(Math.max(0, d.total)))
        .attr("height", (d) => Math.abs(y(0) - y(d.total)))
        .attr("width", barWidth)
        .style("stroke-width", 1)
        .style("opacity", 1)
        .style("fill", (_, i) => color(i));

      chart
        .selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (_, i) => i * (barWidth) + (barWidth/2) + 3)
        .attr("y", (d) => y(Math.max(0, d.total))-6)
        .attr("text-anchor", "middle")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text((d) => d.label);

      chart
        .selectAll(".totalCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "totalCircle text-gray-200 dark:text-black")
        .attr("cx", (_, i) => i * (barWidth) + (barWidth/2) + 3)
        .attr("cy", (d) => y(Math.max(0, d.total))-25)
        .style("fill", "currentColor")
        .attr("r", 9);

      chart
        .selectAll(".totalLabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "totalLabel text-black dark:text-white font-mono")
        .attr("x", (_, i) => i * (barWidth) + (barWidth/2) + 3)
        .attr("y", (d) => y(Math.max(0, d.total))-22)
        .attr("text-anchor", "middle")
        .style("fill", "currentColor")
        .attr("font-size", 10)
        .text((d) => d.total);
    },
  },
};
</script>