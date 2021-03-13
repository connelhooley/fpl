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
      Minutes Played
    </div>
    <p v-if="anyErrors">There were some errors parsing the data</p>
    <svg v-else ref="svg" class="
      block
      w-full"
    ></svg>
  </div>
</template>

<script>
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

      const svgWidth = 600;
      const svgHeight = 250;
      const margin = 20;

      const radius = (Math.min(svgWidth, svgHeight) / 2) - margin;

      const data = [
        {
          label: "0",
          total: this.history.filter((d) => d.minutesPlayed === 0).length,
        },
        {
          label: "1-59",
          total: this.history.filter((d) => d.minutesPlayed >= 1 && d.minutesPlayed <= 59).length,
        },
        {
          label: "60-89",
          total: this.history.filter((d) => d.minutesPlayed >= 60 && d.minutesPlayed <= 89).length,
        },
        {
          label: "90",
          total: this.history.filter((d) => d.minutesPlayed === 90).length,
        },
      ];

      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(d3.schemeSet2);

      svg
        .attr("viewBox", [0, 0, svgWidth, svgHeight])
        .attr("preserveAspectRatio", "xMinYMin meet");

      const chart = svg
        .append("g")
        .attr("transform", `translate(${svgWidth/2}, ${svgHeight/2})`);

      const pie = d3
        .pie()
        .value((d) => d.total);
      const arcs = pie(data);

      const arcGenerator = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)

      console.dir(data);
      console.dir(arcs);

      chart
        .selectAll(".segment")
        .data(arcs)
        .enter()
        .append("path")
        .attr("stroke", "currentColor")
        .attr("class", "segment")
        .attr("d", d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr("fill", (d) => color(d.data.label))
        .style("stroke-width", 1);

      chart
        .selectAll(".label")
        .data(arcs)
        .enter()
        .append("text")
        .attr("class", "label")
        .text((d) => d.data.label)
        .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 10)
        .style("fill", "currentColor");
    },
  },
};
</script>