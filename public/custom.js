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
    const w = 800;
    const h = 400;
    const padding = 40;
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h+padding);

    let minn = d3.min(dataset, (d,i) => new Date(d[0]))
    let maxx = d3.max(dataset, (d,i) => new Date(d[0]))

    const xScale = d3.scaleLinear()
                    .domain([minn,maxx])
                    .range([padding, w-padding ]); 
    

    const yScale = d3.scaleLinear()
                    .domain([d3.min(dataset, (d) => d[1]),d3.max(dataset, (d) => d[1])])
                    .range([ h ,0]);  
                    console.log(Number(d3.min(dataset, (d,i) => d[0].slice(0,4))) )

    const zScale = d3.scaleLinear()
                    .domain([
                    	d3.min(dataset, (d,i) => d[0].slice(0,4)),
                    	d3.max(dataset, (d,i) => d[0].slice(0,4))
                    		])
                    .range([padding, w-padding ]); 
    
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")        
       .attr("x", (d,i) => xScale(new Date(d[0])))
       .attr("y", (d, i) =>  yScale( d[1]))
       .attr("width",2)
       .attr("height", (d, i) => h - yScale( d[1]))
       .attr("class","bar")
       .attr("data-date",(d)=>d[0])
       .attr("data-gdp",(d)=>d[1])

       //var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("d"));
     const yAxis = d3.axisLeft(yScale);
     const xAxis = d3.axisBottom(xScale);
     const zAxis = d3.axisBottom(zScale).tickFormat(d3.format("d"));

   	svg.append("g")
       .attr("transform", "translate("+padding+",0)")
       .attr("id", "y-axis")
       .call(yAxis); 
   	svg.append("g")
       .attr("transform", "translate(0,"+h+")")
       .attr("id", "x-axis")
       .call(zAxis); 
        
        
      };   
  });
  /*



User Story #9: Each bar element's height should accurately represent the data's corresponding GDP.
User Story #10: The data-dateattribute and its corresponding bar element should align with the corresponding value on the x-axis.
User Story #11: The data-gdpattribute and its corresponding bar element should align with the corresponding value on the y-axis.
User Story #12: I can mouse over an area and see a tooltip with a corresponding id="tooltip"which displays more information about the area.
User Story #13: My tooltip should have a data-dateproperty that corresponds to the data-dateof the active area.
  */