<template>
  <ContentContainer title="Minutes Played">
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

      const historyNoBlanks = this.history.filter((history) => !history.isBlank);

      const data = [
        {
          label: "0",
          total: historyNoBlanks.count((d) => d.minutesPlayed === 0),
        },
        {
          label: "1-59",
          total: historyNoBlanks.count((d) => d.minutesPlayed >= 1 && d.minutesPlayed <= 59),
        },
        {
          label: "60-89",
          total: historyNoBlanks.count((d) => d.minutesPlayed >= 60 && d.minutesPlayed <= 89),
        },
        {
          label: "90",
          total: historyNoBlanks.count((d) => d.minutesPlayed === 90),
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
        .outerRadius(radius);

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