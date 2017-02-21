
function createHistogram(histData, array){

var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-20, 0])
              .html(function(histData) {
                    return "<strong>Value:</strong> <span style='color:red'>" + histData + "</span>";
                });

  var svg = d3.select("#bar")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
            svg.call(tip);

  x.domain([d3.min(array), d3.max(array)]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var scaleHeight = (0.9*h/d3.max(histData));


  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + 4 + "," + 610 + ")")
      .call(xAxis);

  var color = "steelblue";

  var bars = svg.selectAll("bar")
             .data(histData)
             .enter()
             .append("rect")
             .attr("x", function(d, i) {
                  return  (i * (w / histData.length ));
             })
             .attr("width", w / histData.length - barPadding)
             .attr("y", function(d) {
                  return h - 20  - (d * scaleHeight);
             })
             .attr("height", function(d) {
                  return d * scaleHeight;
             })

             .attr('fill', color)
             .on("mouseover", function(d,i) {
                  tip.show(d);
                  d3.select(this)
                  .attr("y",d3.select(this).attr("y") - 15)
                  .attr("height",parseInt(d3.select(this).attr("height")) + 15)
                  .attr("x",i * (w / histData.length) - 5)
                  .attr("width",w / histData.length - barPadding + 10)
                  .attr('fill', "orangered");
})

             .on("mouseout", function(d,i) {
                  tip.hide(d);
                  d3.select(this)
                  .attr("width", w / histData.length - barPadding)
                  .attr("y",parseInt(d3.select(this).attr("y")) + 15)
                  .attr("x",i * (w / histData.length))
                  .attr("height",parseInt(d3.select(this).attr("height")) - 15)
                  .attr('fill', "steelblue");
                })

             .on("click",function(d){
                tip.hide(d);
                document.getElementById("bar").innerHTML = '';
                createPieChart(histData, array);
                flag = 1;
              });



}

