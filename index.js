function render(data){
  let xValue = d => new Date(d.timestamp),
      yValue = d => d.temperature,
      width = window.innerWidth,
      height= window.innerHeight,
      margin= { top:100, right:70,left:50,bottom:10 },
      innerWidth= width - margin.left - margin.right,
      innerHeight= height - margin.top - margin.bottom;
      
  let xScale = d3.scaleTime()
      .domain(d3.extent(data,xValue))
      .range([0,innerWidth]);

  let yScale = d3.scaleLinear()
      .domain(d3.extent(data,yValue))
      .range([0,innerHeight]);
      
  let lineGenrator = d3.line()
      .x(d=>xScale(xValue(d)))
      .y(d=>yScale(yValue(d)))
      .curve(d3.curveBasis);
  

  let xAxis = d3.axisBottom(xScale)
  let yAxis = d3.axisLeft(yScale).tickSize(-innerWidth)

  let svg = d3.select("#line").append("svg").attr("viewBox",`0 0 ${width} ${height}`)

  let g = svg.append("g").attr("transform",`translate(${margin.top},${margin.left})`)

  let path   = g.append("path")
    .attr("d",lineGenrator(0))
    .attr("class","line-path");

  let circle = g.selectAll("circle").data(data).enter().append("circle")
                .attr("cx",0)
                .attr("cy",0)
                .attr("r",6)
                .attr("class","circle-path");

  g.append("text").attr("x",600).attr("y",47).text("Time").attr("text-anchor","middle").attr("transform",`translate(0,${innerHeight})`).attr("font-size",28).attr("class","text-data")
  g.append("text").attr("x",600).attr("y",60).text("Temperature Vs Time").attr("text-anchor","middle").attr("transform",`translate(0,${-innerHeight/8})`).attr("font-size",28).attr("class","text-data")
  g.append("text").attr("x",-310).attr("y",-50).text("Temperature").attr("font-size",28).attr("transform","rotate(-90)").attr("class","text-data")
   
  path.transition()
      .attr("d",lineGenrator(data))
      .duration(2320)
      .delay(910)
      .ease(d3.easeLinear)
  circle.transition()
        .attr("cx",d=>xScale(xValue(d))).attr("cy",d=>yScale(yValue(d))).duration(2000);

  let xGroup = g.append("g").attr("transform",`translate(0,${innerHeight})`).call(xAxis).attr("class","xAxis")
      xGroup.select(".domain").remove()
  let yGroup = g.append("g").call(yAxis).attr("class","yAxis")
  yGroup.select(".domain ").remove()
}




















d3.csv("san.csv").then(data=>{
  data.forEach(d => {
      d.maxTemperatureF = +d.temperature
      d.Date = new Date(d.timestamp)
  });
  render(data)
})


