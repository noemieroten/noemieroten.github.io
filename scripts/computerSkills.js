d3.json("data/computerSkills.json", function(error, graph) {
 
  console.log(error)

  var width = 960,
      height = 500;

  var color = d3.scale.category20();

  var force = d3.layout.force()
    .charge(-1500)
    .linkDistance(240)
    .size([width, height]);

  var svgCS = d3.select("#svgComputerSkills")
    .append("g")
    .attr("transform", "translate(-400, 0)")
    .attr("width", width)
    .attr("height", height);

  var tooltipCs = d3.select("body")
	  .append("div")
    .attr("class", "d3-tip")
	  .style("position", "absolute")
	  .style("z-index", "10")
    .style("visibility", "hidden");

  force.nodes(graph.nodes)
    .links(graph.links)
    .start();

  var link = svgCS.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 3*Math.sqrt(d.value) + 2; });

   var node = svgCS.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
//      .style("fill-opacity", 1)
      .attr("r", function(d) {return 25*Math.sqrt(d.xp);})
      .style("fill", function(d) { return color(d.value); })
      .call(force.drag);

  var texts = svgCS.selectAll("text")
        .data(graph.nodes)
      .enter()
        .append('text')
        .html(function(d) {return d.name;})
        .attr("dy", ".35em")
        .attr("dx", function(d) {return -27.5*d.name.length/100 + 'em';})
        .attr("transform",  function(d) {return "translate(" + d.x - 400*d.name.length + "," + d.y +")";})
        .attr('fill', 'white')
        .style('font-size', function(d) {return 2.5*(d.xp+3);});    

  var nodeEmpty = svgCS.append("g").selectAll(".node")
    .data(graph.nodes)
   .enter().append("circle")
    .attr("class", "node")
    .style("fill-opacity", 1e-6)
    .attr("r", function(d) {return 20*Math.sqrt(d.xp);})
    .style("fill", function(d) { return color(d.value); })
    .call(force.drag);



  // nodeEmpty.append("title")
  //     .text(function(d) { return d.name; });

 // link.append("title")
 //        .html(function(d) {return d.htmlText;});
  addToolTip(link);
  addToolTip(nodeEmpty);
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    nodeEmpty.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
     
    texts.attr("transform",  function(d) {return "translate(" + d.x + "," + d.y +")";})
  });
  
  function addToolTip(g){
    g.on("mouseover", 
         function(d){
           var htmlText = '';
           
           if (d.name){
             htmlText += '<font color = "#C82536">' + d.name + '</font>';
           }
           
           if (d.target){
             htmlText += '<font color = "#C82536">' + d.target.name + '</font>, ';
             htmlText += '<font color = "#C82536">' + d.source.name + '</font>';
           }
           htmlText += '<hr/>';
           
           function capitaliseFirstLetter(string)
           {
             return string.charAt(0).toUpperCase() + string.slice(1);
           }
           for (var prop in d){
             if (['packages', 'projects', 'link', 'level'].indexOf(prop) > -1){
               propCap = capitaliseFirstLetter(prop)
               htmlText += '<font color="#C82536">' + propCap + '</font><br/>' + d[prop] + '<hr/>';
             }
           } 
           tooltipCs.html(htmlText);      
           return tooltipCs.style("visibility", 'visible');})
	    .on("mousemove", function(){return tooltipCs.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	    .on("mouseout", 
          function(){
            return tooltipCs.style("visibility", "hidden");
          })
      .on("dblclick", function(d){
        window.open(d.levelUrl);
      });      
  }

});
