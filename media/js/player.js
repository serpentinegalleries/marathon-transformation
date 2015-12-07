jQuery(document).ready(function( $ ) {

	/* Countdown */

	var saturday = 'October 17 2015 09:59:59 GMT+01:00';
	var sunday = 'October 17 2015 22:15:01 GMT+01:00';

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

	function initializeHoursClock(svgEl, endtime){
	  var timeinterval = setInterval(function(){
	    var t = getTimeRemaining(endtime);
	    svgEl.text((t.hours<10?'0':'') + t.hours + ":" + (t.minutes<10?'0':'') + t.minutes + ":" + (t.seconds<10?'0':'') + t.seconds);
	    if(t.total<=0){
	      clearInterval(timeinterval);
	    }
	  },1000);
	}

	function initializeDaysClock(id, endtime){
	  var clock = document.getElementById(id);
	    var t = getTimeRemaining(endtime);
	    clock.innerHTML = "-" + t.days+ " DAY";
	}

	var saturday_end = 'October 17 2015 22:00:00 GMT+01:00';
	timeLeftSat = getTimeRemaining(saturday_end);

	var saturdayArc = (timeLeftSat.hours)*60 + timeLeftSat.minutes;
	saturdayArc = (720 - saturdayArc) / 720;

	var sunday_end = 'October 18 2015 13:00:00 GMT+01:00';
	timeLeftSun = getTimeRemaining(sunday_end);
	console.log(timeLeftSun.hours);
	var sundayArc = (timeLeftSun.hours)*60 + timeLeftSun.minutes;
	sundayArc = (840 - sundayArc) / 840;

	/**********
	PLAYER
	**********/

	var archiveTimes = ["4pm&#8212;5pm", "5pm&#8212;6pm", "6pm&#8212;7pm", "7pm&#8212;8pm", "8pm&#8212;9pm", "9pm&#8212;10pm", "10am&#8212;11am", "11am&#8212;12pm", "12pm&#8212;1pm", "1pm&#8212;2pm", "2pm&#8212;3pm", "3pm&#8212;4pm"]
	var videoLinks = ["_g7t7_NwX8Q", "SsgW30wjcLk","BB1H-MZTpKA", "0sEpt-Rlkfk","0sEpt-Rlkfk","2RCLTxUaWVo", "VatiJ4G11n8","yCanVrhb65k","VkQCB6xhtho","PLFh8rLhxZ8","VfDOS10SLhg","8Ra0yePItPc"];
	var videoSchedules = ["#4pm-7pm","#4pm-7pm","#4pm-7pm","#7pm-10pm","#7pm-10pm","#7pm-10pm","#10am-1pm","#10am-1pm","#10am-1pm","#1pm-4pm","#1pm-4pm","#1pm-4pm"]

	var videoObjs = [
	    {"vidid":"tc2dDB-33Pc", "vidindex":"14"},
	    {"vidid":"_g7t7_NwX8Q", "vidindex":"16"},
	    {"vidid":"SsgW30wjcLk", "vidindex":"19"},
	    {"vidid":"BB1H-MZTpKA", "vidindex":"21"},
	    {"vidid":"0sEpt-Rlkfk", "vidindex":"25"},
	    {"vidid":"2RCLTxUaWVo", "vidindex":"27"},
	    {"vidid":"VatiJ4G11n8", "vidindex":"0"},
	    {"vidid":"yCanVrhb65k", "vidindex":"3"},
	    {"vidid":"VkQCB6xhtho", "vidindex":"6"},
	    {"vidid":"PLFh8rLhxZ8", "vidindex":"7"},
	    {"vidid":"VfDOS10SLhg", "vidindex":"10"},
	    {"vidid":"7oaaNK6z4o4", "vidindex":"12"}

	];

	var videoListen;

	var hourScale = d3.scale.linear()
		.range([0,330])
		.domain([0,11])

	var width = 410,
	  height = 600,
	  τ = 2 * Math.PI;

	var dateVar = new Date();
	var minVar = dateVar.getMinutes();
	var hourVar = (((dateVar.getUTCHours() + 1) * 60) + minVar) / 1440;
	var halfdayVar = (((dateVar.getUTCHours() + 1) * 60) + minVar - 720) / 1440;

	var arc = d3.svg.arc()
	  .innerRadius(182)
	  .outerRadius(177)
	  .startAngle(0);

    var hourTickStart = 195;
    var hourTickLength = -5;

	var video = d3.select("#video-viz")
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + 200 + ")")

	// Add the background arc, from 0 to 100% (τ).
	var videoBackground = video.append("path")
		.datum({endAngle: τ})
		.style("fill", "#FFF")
		.attr("opacity","1")
		.attr("d", arc);

	var videoForeground;
	/* Video archive */

	var videoViewProgramme;
	var videoTime;
	var videoWatch;
	var videoplayButton;
	var archiveDial;

	var videoArchive1 = video.append("svg:text")
		.attr("x", 0)
		.attr("y", -30)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("Browse the");

	var videoArchive2 = video.append("svg:text")
		.attr("x", 0)
		.attr("y", 10)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("dial to access the");

	var videoArchive3 = video.append("svg:text")
		.attr("x", 0)
		.attr("y", 50)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("video archive");

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -110)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .text("OVER");

	video.selectAll('.hour-box')
		.data(d3.range(0,12)).enter()
			.append('rect')
			.attr('class', 'hour-box')
			.attr('x',0)
			.attr('y', hourTickStart - 30)
			.attr('width',30)
			.attr('height',50)
			.style("stroke-width", "2px")
			.style("opacity", "0")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			})
			/* For archive */
			.on("mouseover", function(d, i) {
				videoArchive1.text("");
				videoArchive2.text("");
				videoArchive3.text("");

				if (hourScale(d) >= 180) {
					archiveDial = hourScale(d) - 180;
				}
				else {
					archiveDial = hourScale(d) + 180;
				}

				/* Draw Path */
				if(videoForeground != null) {
					videoForeground.remove();
				};
				videoForeground = video.append("path")
					.datum({endAngle: (archiveDial / 360) * τ })
					.style("fill", "#4696ff")
					.attr("opacity","1")
					.attr("d", arc);

				if(videoTime != null) {
					videoTime.text("");
				};
				/* Time of video */
				videoTime = video.append("svg:text")
				 .attr("x", 0)
				 .attr("y", -7)
				 .style("fill", "#FFF")
				 .attr("stroke-width", -1)
				 .attr("text-anchor", "middle")
				 .attr("class", "name")
				 .html(archiveTimes[i]);
				/* View programme */
				if(videoViewProgramme != null) {
					videoViewProgramme.html("");
				};
				videoViewProgramme = video.append("svg:text")
				 .attr("x", 0)
				 .attr("y", 22)
				 .style("fill", "#FFF")
				 .attr("stroke-width", -1)
				 .attr("text-anchor", "middle")
				 .attr("class", "title")
				 .text("View Programme")
				 .on("click", function () { window.location = videoSchedules[i]});
				if(videoWatch != null) {
					videoWatch.text("");
				}
				videoWatch = video.append("svg:text")
					.attr("x", 6)
					.attr("y", 100)
					.style("fill", "#FFF")
					.attr("stroke-width", -1)
					.attr("class", "name")
					.attr("id","play-media")
					.attr("text-anchor", "middle")
					.text("watch")
					.attr("pointer-events", "all")
					.on("click", function() {
						//document.getElementById('youtube').src = 
						//showModal(); 
						window.open("https://www.youtube.com/embed?v=" + videoObjs[i].vidid + "&index=" + videoObjs[i].vidindex + "&list=PLLrFzV6gBibcE1cH1rBq7LtiKyoBi5HXz", "_blank"); // &hd=1&rel=0&autohide=1&showinfo=0";
					});
				if(videoplayButton != null) {
					videoplayButton.text("");
				}
				videoplayButton = video.append('svg:text')
					.attr("x", -55)
					.attr("y", 100)
					.attr('font-family', 'FontAwesome')
					.style("fill", "#FFF")
					.attr("font-size", "20px")
					.attr("id", "play-media")
					.text(function(d) { return '\uf04b' })
					.attr("pointer-events", "all")
					.on("click", function() {
						window.open("https://www.youtube.com/embed?v=" + videoObjs[i].vidid + "&index=" + videoObjs[i].vidindex + "&list=PLLrFzV6gBibcE1cH1rBq7LtiKyoBi5HXz", "_blank");// &hd=1&rel=0&autohide=1&showinfo=0";
					});
			 });


	/* Video links */

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 250)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "date-text")
		 .attr("text-anchor", "middle")
		 .text("Saturday October 17");

	/*video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 295)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Live feed from");*/

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 295)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Serpentine Sackler Gallery");

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

	/*********************
	Radio Player
	*********************/

	var radioArchiveTimes = ["6am&#8212;7am", "7am&#8212;8am", "8am&#8212;9am", "9am&#8212;10am", "10am&#8212;11am", "11am&#8212;12pm", "12am&#8212;1am", "1am&#8212;2am", "2am&#8212;3am", "3am&#8212;4am", "4am&#8212;5am", "5am&#8212;6am"];
	var radioSchedules = ["#6am-9am","#6am-9am","#6am-9am","#9am-12pm","#9am-12pm","#9am-12pm","#before-midnight","#12am-3am","#12am-3am","#3am-6am","#3am-6am","#3am-6am"];

	var radioObjs = [
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
	]
	var radioListen;

	var radio = d3.select("#radio-viz")
	.append("g")
	  .attr("transform", "translate(" + width / 2 + "," + 200 + ")")

	var radioBackground = radio.append("path")
	  .datum({endAngle: τ})
	  .style("fill", "#FFF")
	  .attr("opacity","1")
	  .attr("d", arc);

	var radioForeground;

	/* RADIO ARCHIVE START */

	var radioViewProgramme;
	var radioTime;
	var radioWatch;
	var radioplayButton;


	var radioArchive1 = radio.append("svg:text")
		.attr("x", 0)
		.attr("y", -30)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("Browse the");

	var radioArchive2 = radio.append("svg:text")
		.attr("x", 0)
		.attr("y", 10)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("dial to access the");

	var radioArchive3 = radio.append("svg:text")
		.attr("x", 0)
		.attr("y", 50)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("radio archive");

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -110)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .text("OVER");

	/* RADIO ARCHIVE DIAL */

	radio.selectAll('.hour-box')
		.data(d3.range(0,12)).enter()
			.append('rect')
			.attr('class', 'hour-box')
			.attr('x',0)
			.attr('y', hourTickStart - 30)
			.attr('width',30)
			.attr('height',50)
			.style("stroke-width", "2px")
			.style("opacity", "0")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			})
			/* For archive */
			.on("mouseover", function(d, i) {
				var stream = document.getElementById('radioStream');
				if(stream.paused) {
					radioArchive1.text("");
					radioArchive2.text("");
					radioArchive3.text("");
					stream.load();

					if (hourScale(d) >= 180) {
						archiveDial = hourScale(d) - 180;
					}
					else {
						archiveDial = hourScale(d) + 180;
					}

					/* Draw Path */
					if(radioForeground != null) {
						radioForeground.remove();
					};
					radioForeground = radio.append("path")
						.datum({endAngle: (archiveDial / 360) * τ })
						.style("fill", "#4696ff")
						.attr("opacity","1")
						.attr("d", arc);

					if(radioTime != null) {
						radioTime.text("");
					};
					/* Time of radio */
					radioTime = radio.append("svg:text")
					 .attr("x", 0)
					 .attr("y", -7)
					 .style("fill", "#FFF")
					 .attr("stroke-width", -1)
					 .attr("text-anchor", "middle")
					 .attr("class", "name")
					 .html(radioArchiveTimes[i]);
					/* View programme */
					if(radioViewProgramme != null) {
						radioViewProgramme.html("");
					};
					radioViewProgramme = radio.append("svg:text")
					 .attr("x", 0)
					 .attr("y", 22)
					 .style("fill", "#FFF")
					 .attr("stroke-width", -1)
					 .attr("text-anchor", "middle")
					 .attr("class", "title")
					 .text("View Programme")
					 .on("click", function () { window.location = radioSchedules[i]});
					if(radioplayButton != null) {
						radioplayButton.text("");
					}
					radioplayButton = radio.append('svg:text')
						.attr("x", -50)
						.attr("y", 100)
						.attr('font-family', 'FontAwesome')
						.style("fill", "#FFF")
						.attr("font-size", "20px")
						.attr("id", "radioPlayIcon")
						.attr("pointer-events", "all")
						.text(function(d) { return '\uf04b' })
						.attr("pointer-events", "all")

						.on("click", function() {
							var stream = document.getElementById('radioStream');
							var audioSrc = document.getElementById('audioSource');
							audioSrc.src = "http://www.serpentinegalleries.org/audio/" + radioObjs[i] + "-serpentine-radio-segments.mp3";
							if (stream.paused) {
								stream.play();
								radioplayButton.text(function(d) { return '\uf04c' });
								ga('send', 'event', 'Videos', 'play', 'Radio Archive');
							} else { 
								stream.pause();
								radioplayButton.text(function(d) { return '\uf04b' })
							}
						});
					if(radioWatch != null) {
						radioWatch.text("");
					}
					radioWatch = radio.append("svg:text")
						.attr("x", 6)
						.attr("y", 100)
						.style("fill", "#FFF")
						.attr("stroke-width", -1)
						.attr("class", "name")
						.attr("id","play-media")
						.attr("text-anchor", "middle")
						.text("listen")
						.on("click", function() {
							var stream = document.getElementById('radioStream');
							var audioSrc = document.getElementById('audioSource');
							audioSrc.src = "http://www.serpentinegalleries.org/audio/" + radioObjs[i] + "-serpentine-radio-segments.mp3";
							if (stream.paused) {
								stream.play();
								ga('send', 'event', 'Videos', 'play', 'Radio Archive');
								radioplayButton.text(function(d) { return '\uf04c' })
							} else { 
								stream.pause();
								radioplayButton.text(function(d) { return '\uf04b' })
							}
						});
					}
				 });

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

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 250)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "date-text")
		 .attr("text-anchor", "middle")
		 .text("Sunday October 18");

	/*radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 295)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Live streaming on");*/

	radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 295)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Serpentine Radio");

/*************
Resize player
*************/

	var aspect = width / height,
	    videoViz = $("#video-viz"),
	    radioViz = $("#radio-viz");

	$(window).on("resize", function() {
	    var targetWidth = videoViz.parent().height();
	    videoViz.attr("width", targetWidth);
	    videoViz.attr("height", targetWidth / aspect);
	    radioViz.attr("width", targetWidth);
	    radioViz.attr("height", targetWidth / aspect);
	});
	$(window).on("load", function() {
	    var targetWidth = videoViz.parent().height();
	    videoViz.attr("width", targetWidth / aspect);
	    videoViz.attr("height", targetWidth);
	    radioViz.attr("width", targetWidth / aspect);
	    radioViz.attr("height", targetWidth);
	});

/**************
JAVASCRIPT DOM
*************/

	$(window).on('load', function(e){
		if(window.location.hash == '#livestream') {
			$("#livestream").modal("show");
		}
	});

	$('#watch').on('click', function () {
		window.location.hash = "#livestream";
	});
	$('#livestream').on('hidden.bs.modal', function () {
        $('#livestream iframe').attr("src", jQuery("#livestream iframe").attr("src"));
        //window.location.href = "/";
    });

	$(window).on('load', function(e){
		if(window.location.hash == '#livestream') {
			$("#livestream").modal("show");
		}
	});

	$('.participant-video').on('click', function () {
		var $videoID = $(this).attr("id");
		console.log($videoID);
        $('#livestream iframe').attr("src", "https://www.youtube.com/embed/" + $videoID + "?hd=1&rel=0&autohide=1&showinfo=0");
	    $("#livestream").modal("show");
	});

	function showModal() {
        //$('#livestream iframe').attr("src", "https://www.youtube.com/embed/" + videoLink + "?hd=1&rel=0&autohide=1&showinfo=0");
	    $("#livestream").modal("show");
	}

});

/***************
VIDEO PLAYER
***************/

/*if(getTimeRemaining(saturday_end).total < 0) {
	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 20)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "description-text")
		 .attr("text-anchor", "middle")
		 .text("Archive Coming Soon");

	video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -110)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .text("OVER");

	videoBackground.attr("opacity", "1");
}
/* Day 1 Countdown text 
else if (saturdayArc < 0) {
	var saturdayCountdown = video.append("svg:text")
		 .attr("x", 0)
		 .attr("y", 29)
		 .style("fill", "#FFF")
		 .attr("text-anchor", "middle")
		 .attr("stroke-width", -1)
		 .attr("class", "countdown")
		 .attr("id", "saturdayHours");

	var tH = getTimeRemaining(saturday);
	var clockElem0 = document.getElementById('saturdayHours');
	clockElem0.innerHTML = (tH.hours<10?'0':'') + tH.hours + ":" + (tH.minutes<10?'0':'') + tH.minutes + ":" + (tH.seconds<10?'0':'') + tH.seconds;
	clockElem0.textContent = (tH.hours<10?'0':'') + tH.hours + ":" + (tH.minutes<10?'0':'') + tH.minutes + ":" + (tH.seconds<10?'0':'') + tH.seconds;
	initializeHoursClock(saturdayCountdown, saturday);
}*/

/*if (getTimeRemaining(saturday_end).total > 0 ) {
	var videoForeground = video.append("path")
	  .datum({endAngle: τ * saturdayArc})
	  .style("fill", "#FFF")
	  .attr("opacity","1")
	  .attr("d", arc);

	video.append('text')
	 .attr("x", -70)
	 .attr("y", 20)
    .attr('font-family', 'FontAwesome')
    .style("fill", "#FFF")
    .attr("font-size", "20px")
    .attr("id", "play-icon")
    .text(function(d) { return '\uf04b' })
	 .on("click", function() { $("#livestream").modal("show"); });

	video.append("svg:text")
	 .attr("x", 17)
	 .attr("y", 20)
	 .style("fill", "#FFF")
	 .attr("stroke-width", -1)
	 .attr("class", "name")
	 .attr("text-anchor", "middle")
	 .attr("id", "watch")
	 .text("watch live")
	 .on("click", function() { $("#livestream").modal("show"); });

	 video.append("svg:text")
	 .attr("x", 0)
	 .attr("y", -100)
	 .style("fill", "#FFF")
	 .attr("stroke-width", -1)
	 .attr("text-anchor", "middle")
	 .attr("class", "status")
	 .text("ON AIR");
}*/


/*****************
RADIO ARCHIVE
****************/

	/* For archive waiting text 
	if(getTimeRemaining(sunday_end).total < 0) {
		radio.append("svg:text")
			 .attr("x", 0)
			 .attr("y", 20)
			 .style("fill", "#FFF")
			 .attr("stroke-width", -1)
			 .attr("class", "description-text")
			 .attr("text-anchor", "middle")
			 .text("Archive Coming Soon");

		radio.append("svg:text")
			 .attr("x", 0)
			 .attr("y", -100)
			 .style("fill", "#FFF")
			 .attr("stroke-width", -1)
			 .attr("text-anchor", "middle")
			 .attr("class", "status")
			 .text("OVER");

		radioBackground.attr("opacity", "1");
	}
*/

	/* Day 1 Countdown text
	if (getTimeRemaining(sunday).total > 0) {
		var countdownSunday = radio.append("svg:text")
			 .attr("x", 0)
			 .attr("y", 29)
			 .style("fill", "#FFF")
			 .attr("stroke-width", -1)
			 .attr("text-anchor", "middle")
			 .attr("class", "countdown")
			 .attr("id", "sundayHours");

		var t = getTimeRemaining(sunday);
		var clockElem = document.getElementById('sundayHours');
		clockElem.textContent = (t.hours<10?'0':'') + t.hours + ":" + (t.minutes<10?'0':'') + t.minutes + ":" + (t.seconds<10?'0':'') + t.seconds;
		clockElem.innerHTML = (t.hours<10?'0':'') + t.hours + ":" + (t.minutes<10?'0':'') + t.minutes + ":" + (t.seconds<10?'0':'') + t.seconds;
		initializeHoursClock(countdownSunday, sunday);
	}
	else if(getTimeRemaining(sunday_end).total > 0) {

		// variable to store HTML5 audio element
		var stream = document.getElementById('radio-stream');
		var playI = document.getElementById('playIcon');
		var playB = document.getElementById('playButton');
		 
		function playAudio() {
			if (stream.paused) {
				stream.play();
				playButton.text(function(d) { return '\uf04c' })
			} else { 
				stream.pause();
				playButton.text(function(d) { return '\uf04b' })
			}
		}

		var radioForeground = radio.append("path")
		  .datum({endAngle: τ * sundayArc})
		  .style("fill", "#FFF")
		  .attr("opacity","1")
		  .attr("d", arc);

		var playButton = radio.append('text')
		 .attr("x", -71)
		 .attr("y", 20)
	     .attr('font-family', 'FontAwesome')
	     .style("fill", "#FFF")
	     .attr("font-size", "20px")
	     .attr("id", "play-icon")
	     .text(function(d) { return '\uf04b' })
	     .on("click", playAudio);

		radioListen = radio.append("text")
		 .attr("x", 10)
		 .attr("y", 20)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("class", "name")
		 .attr("text-anchor", "middle")
		 .attr("id", "watch")
		 .text("listen live")
		 .on("click", playAudio);

		radio.append("svg:text")
		 .attr("x", 0)
		 .attr("y", -100)
		 .style("fill", "#FFF")
		 .attr("stroke-width", -1)
		 .attr("text-anchor", "middle")
		 .attr("class", "status")
		 .text("ON AIR");
	} */


	/* Hour ticks */

	/*var radioTextName;
	var radioTextTitle;

	var radioArchive1 = radio.append("svg:text")
		.attr("x", 0)
		.attr("y", -30)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("Browse the");

	var radioArchive2 = radio.append("svg:text")
		.attr("x", 0)
		.attr("y", 10)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("dial to access the");

	var radioArchive3 = radio.append("svg:text")
		.attr("x", 0)
		.attr("y", 50)
		.style("fill", "#FFF")
		.attr("stroke-width", -1)
		.attr("class", "archive-text")
		.attr("text-anchor", "middle")
		.text("radio archive");

		radio.append("svg:text")
			 .attr("x", 0)
			 .attr("y", -110)
			 .style("fill", "#FFF")
			 .attr("stroke-width", -1)
			 .attr("text-anchor", "middle")
			 .attr("class", "status")
			 .text("OVER");

	radio.selectAll('.hour-box')
		.data(d3.range(0,12)).enter()
			.append('rect')
			.attr('class', 'hour-box')
			.attr('x',0)
			.attr('y', hourTickStart - 30)
			.attr('width',30)
			.attr('height',50)
			.style("stroke-width", "2px")
			.style("opacity", "0")
			.attr('transform',function(d){
				return 'rotate(' + hourScale(d) + ')';
			})
			/* For archive
			.on("mouseover", function(d, i) {
				radioArchive1.text("");
				radioArchive2.text("");
				radioArchive3.text("");
				if(radioTextTitle != null) {
					radioTextTitle.text("");
				};
				radioTextTitle = radio.append("svg:text")
				 .attr("x", 0)
				 .attr("y", -7)
				 .style("fill", "#FFF")
				 .attr("stroke-width", -1)
				 .attr("text-anchor", "middle")
				 .attr("class", "name")
				 .text(archiveTimes[i]);
				if(radioTextName != null) {
					radioTextName.text("");
				};
				radioTextName = radio.append("svg:text")
				 .attr("x", 0)
				 .attr("y", 22)
				 .style("fill", "#FFF")
				 .attr("stroke-width", -1)
				 .attr("text-anchor", "middle")
				 .attr("class", "title")
				 .text(radioArchiveDesc[i]);
				if(radioListen == null) {
					radioListen = radio.append("text")
						.attr("x", 5)
						.attr("y", 100)
						.style("fill", "#FFF")
						.attr("stroke-width", -1)
						.attr("class", "name")
						.attr("text-anchor", "middle")
						.attr("id", "watch")
						.text("listen")
						.on("click"); //, playAudio);
				};
				if(playButton == null) {
					playButton = radio.append('text')
						 .attr("x", -50)
						 .attr("y", 100)
					     .attr('font-family', 'FontAwesome')
					     .style("fill", "#FFF")
					     .attr("font-size", "20px")
					     .attr("id", "play-icon")
					     .text(function(d) { return '\uf04b' })
					     .on("click"); //, playAudio);
				}
			 });*/