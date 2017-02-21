function activateForcedirected(distance){
	if (currflag == 1){
				d3.selectAll("svg").remove();

		currflag = 0;
	}

	else if (currflag == 0){
			var dataset = {
			        nodes: [
			                { name: 1 },
							{ name: 2 },
							{ name: 3 }
			        ],
			        links: [
							{ source: 0, target: 1 },
							{ source: 0, target: 2 },
							{ source: 2, target: 1 }
			        ]
			};

			var svg = d3.select("#forcedirected")
			            .append("svg")
			            .attr("width", w)
			            .attr("height", h/3);



			var color = d3.scale.category10();

			var force = d3.layout.force()
                     .links(dataset.links)
                     .nodes(dataset.nodes)
                     .size([w/3, h/3])
                     .linkDistance([distance])
                     .charge([-50])
                     .start();
			 var nodes = svg.selectAll("circle")
			         .data(dataset.nodes)
			         .enter()
			         .append("circle")
			         .attr("r", 10)
			         .style("fill", function(d, i) {
			                 return color(i);
			         })
			         .call(force.drag);
			var edges = svg.selectAll("line")
			         .data(dataset.links)
			         .enter()
			         .append("line")

			         force.on("tick", function() {
						 edges.attr("x1", function(d) { return d.source.x; })
						      .attr("x2", function(d) { return d.target.x; })
						      .attr("y1", function(d) { return d.source.y; })
						      .attr("y2", function(d) { return d.target.y; });

						 nodes.attr("cx", function(d) { return d.x; })
						      .attr("cy", function(d) { return d.y; });

					 });

					 currflag = 1;
}
}
