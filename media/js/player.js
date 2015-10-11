jQuery(document).ready(function( $ ) {

	/* Countdown */

	var saturday = 'October 17 2015 09:59:59 GMT+01:00';
	var sunday = 'October 18 2015 11:59:59 GMT+01:00';

	var timeLeft;

	function getTimeRemaining(endtime){
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor( (t/1000) % 60 );
		var minutes = Math.floor( (t/1000/60) % 60 );
		var hours = Math.floor( (t/(1000*60*60)) % 24 );
		var days = Math.floor( t/(1000*60*60*24) );
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	/* For Marathon start countdown */
	function initializeHoursClock(id, endtime){
	  var clock = document.getElementById(id);
	  var timeinterval = setInterval(function(){
	    var t = getTimeRemaining(endtime);
	    clock.innerHTML = (t.hours<10?'0':'') + t.hours + ":" + (t.minutes<10?'0':'') + t.minutes + ":" + (t.seconds<10?'0':'') + t.seconds;
	    if(t.total<=0){
	      clearInterval(timeinterval);
	    }
	  },1000);
	}

	function initializeDaysClock(id, endtime){
	  var clock = document.getElementById(id);
	    var t = getTimeRemaining(endtime);
	    clock.innerHTML = "-" + t.days+ " DAYS";
	}

/**********
PLAYER
**********/

	var hourScale = d3.scale.linear()
		.range([0,330])
		.domain([0,11])

	var width = 500,
	  height = 425,
	  τ = 2 * Math.PI;

	var dateVar = new Date();
	var minVar = dateVar.getMinutes();
	var hourVar = (((dateVar.getUTCHours() + 1) * 60) + minVar) / 1440;
	var halfdayVar = (((dateVar.getUTCHours() + 1) * 60) + minVar - 720) / 1440;

	var arc = d3.svg.arc()
	  .innerRadius(180)
	  .outerRadius(175)
	  .startAngle(0);

    var hourTickStart = 193;
    var hourTickLength = -5;

	// Video player
	var video = d3.select("#video-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

	// Add the background arc, from 0 to 100% (τ).
	var background = video.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .style("opacity", .3)
	  .attr("d", arc);

	// Add the foreground arc
	var videoForeground = video.append("path")
	  .datum({endAngle: hourVar * τ})
	  .style("fill", "#FFF")
	  .attr("d", arc);

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -100)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .text("ON AIR");

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 0)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "name")
		 .text("Susan Miller");

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "title")
		 .text("The Last Silent Movie");

	/* Draw hour hands */
	video.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.style("stroke-width", "2px")
			.style("stroke", "#FFF")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});

	// Use transition.call
	// (identical to selection.call) so that we can encapsulate the logic for
	// tweening the arc in a separate function below.
	setInterval(function() {
	videoForeground.transition()
	    .duration(100)
	    .call(arcTween, hourVar * τ);
	}, 1500);

	// Radio Player
	var radio = d3.select("#radio-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

	var background = radio.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .style("opacity", .3)
	  .attr("d", arc);

	var radioForeground = radio.append("path")
	  .datum({endAngle: .127 * τ})
	  .style("fill", "#FFF") 
	  .attr("d", arc);

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -100)
		 .style("fill", "#FFF")
		 .attr("stroke-width", 0)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .text("STARTING IN");

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "countdown")
		 .text("14:59:00");

	// Hour ticks
	radio.selectAll('.hour-tick')
		.data(d3.range(0,12)).enter()
			.append('line')
			.attr('class', 'hour-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',hourTickStart)
			.attr('y2',hourTickStart + hourTickLength)
			.style("stroke-width", "2px")
			.style("stroke", "#FFF")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			});


	setInterval(function() {
	radioForeground.transition()
	    .duration(d3.time.minute)
	    .call(arcTween, halfdayVar * τ);
	}, 1500);


	function arcTween(transition, newAngle) {

	transition.attrTween("d", function(d) {

	  var interpolate = d3.interpolate(d.endAngle, newAngle);

	  return function(t) {

	    d.endAngle = interpolate(t);

	    return arc(d);
	  };
	});
	}



/*************
Resize player
*************/

	var aspect = 500 / 425,
	    videoViz = $("#video-viz"),
	    radioViz = $("#radio-viz");
	$(window).on("resize", function() {
	    var targetWidth = videoViz.parent().width();
	    videoViz.attr("width", targetWidth);
	    videoViz.attr("height", targetWidth / aspect);
	    radioViz.attr("width", targetWidth);
	    radioViz.attr("height", targetWidth / aspect);
	});

});
