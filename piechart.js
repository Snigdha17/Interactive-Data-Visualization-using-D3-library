function createPieChart(histData, array){
  var radius = (w-100)/2;
  var sum = 0;
  for (var i=histData.length; i--;) {
    sum+=histData[i];
  }
  //console.log(sum)
  var percent = 360/sum;
  var color =d3.scale.category10();

  var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append('g')
            .attr('transform', 'translate(' + 1.3*radius + ',' + 1.3*radius + ')');;

  var pie = d3.layout.pie()
            .value(function(d) {return percent * d;});


  var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(0);

  var arc2 = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(radius + 20);

  var pieC = svg.selectAll("path")
            .data(pie(histData))
            .enter()
            .append("path")
            .attr('d', arc)
            .attr('fill', function(d,i){
              return color(i);
            })
            .on("mouseover", function(d,i) {
              d3.select("#tooltip")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .style("font-size", 20)
                .select("#value")
                .text(d.value * 100/360);

              d3.select(this)
                .attr("stroke", "red")
                .attr("d", arc2)
                .attr("stroke-width", 2);


            })
            .on("mouseout", function(d,i) {
               d3.select("#tooltip")
                  .style("opacity", 0);

              d3.select(this)
              .attr("d",arc)
              .attr("stroke", "none");

            })
            .on("click",function(){
              d3.select("#tooltip")
                  .style("opacity", 0);

                document.getElementById("chart").innerHTML = '';
                createHistogram(histData, array);
                flag = 0;
            });
}