"use strict";

console.log("JS Veikia");
  document.addEventListener('DOMContentLoaded',function(){

     let req=new XMLHttpRequest();
      req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
      req.send();
      req.onload=function(){
      let  json=JSON.parse(req.responseText);
        //console.log(json.data)
        var html = "";
           //const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
        const dataset = json.data;

    console.log(new Date(dataset[0][0]).getTime())
    const w = 900;
    const h = 460;
    const padding = 40;
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h+padding);

var tooltip = d3.select("body")
	.append("div")
	.attr("id","tooltip")

	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("a simple tooltip");


    let minn = d3.min(dataset, (d,i) => new Date(d[0]))
    let maxx = d3.max(dataset, (d,i) => new Date(d[0]))

    const xScale = d3.scaleTime()
                    .domain([minn,maxx])
                    .range([padding, w-padding ]); 
    

    const yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset, (d) => d[1])])
                    .range([ h ,0]);  
                    console.log(Number(d3.min(dataset, (d,i) => d[0].slice(0,4))) )


    
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")        
       .attr("x", (d,i) => xScale(new Date(d[0])))
       .attr("y", (d, i) =>  yScale( d[1]))
       .attr("width",2.9)
       .attr("height", (d, i) => h - yScale( d[1]))
       .attr("class","bar")
       .attr("data-date",(d)=>d[0])
       .attr("data-gdp",(d)=>d[1])
       //.on("mouseover", () => tooltip.style("visibility", "visible"))
       .on("mouseover", (d) => tooltip
       	.attr("data-date",d[0])
       	.text(d[0]+"\n"+d[1]+" Billion ")
       	.style("visibility", "visible"))
       //.on("mouseover", (d) => tooltip.text(d[0]))
		.on("mousemove", () => tooltip.style("top", (event.pageY)+"px").style("left",(event.pageX+10)+"px"))
		.on("mouseout", ()=> tooltip.style("visibility", "hidden"));

     const yAxis = d3.axisLeft(yScale);
     const xAxis = d3.axisBottom(xScale);


   	svg.append("g")
       .attr("transform", "translate("+padding+",0)")
       .attr("id", "y-axis")
       .call(yAxis); 
   	svg.append("g")
       .attr("transform", "translate(0,"+h+")")
       .attr("id", "x-axis")
       .call(xAxis); 


        
      };   
  });
  /*





User Story #12: I can mouse over an area and see a tooltip with a corresponding id="tooltip"which displays more information about the area.
User Story #13: My tooltip should have a data-dateproperty that corresponds to the data-dateof the active area.
  */