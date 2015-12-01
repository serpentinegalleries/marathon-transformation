jQuery(document).ready(function( $ ) {

	var d = new Date();

	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	];

	var month = monthNames[d.getMonth()];
	var day = d.getDate();
	var weather;
	var wind;
	var showWeather = false;
	var showWind = false;
	var windDirection;

	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=21d88c5657030fc12d5d4a62dbf0f053", function( data ) {
		 weather = "London, " + month + " " + day + "<br>" + data.weather[0].main + ", " + data.main.temp + "°C" ;
		 setIcon(data.weather[0].icon);
		 setIconBlack(data.weather[0].icon);
		 setWindIcon(data.wind.deg);
		 setWindIconBlack(data.wind.deg);
		 wind = "London, " + month + " " + day + "<br>" + data.wind.speed + " m/s, " + windDirection ;
	})

	function setIcon(icon) {
		$("#icon-weather").attr("src", "/wp-content/themes/transformation/media/img/weather/white/" + icon + ".svg");
	}


	function setIconBlack(icon) {
		$("#icon-weather-black").attr("src", "/wp-content/themes/transformation/media/img/weather/black/" + icon + ".svg");
	}

	function setWindIcon(wind_direction) {
	    if (wind_direction > 337.5 || wind_direction <= 22.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/n.svg");
	        windDirection = 'North';
	    }
	    else if (22.5 < wind_direction && wind_direction <= 67.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/ne.svg");
	        windDirection = 'Northeast';
		}
	    else if (67.5 < wind_direction && wind_direction <= 112.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/e.svg");
	        windDirection = 'East';
		}
	    else if (112.5 < wind_direction && wind_direction <= 157.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/se.svg");
			        windDirection = 'Southeast';
		}
	    else if (157.5 < wind_direction && wind_direction <= 202.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/s.svg");
	        windDirection = 'South';
		}
	    else if (202.5 < wind_direction && wind_direction <= 247.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/sw.svg");
	        windDirection = 'Southwest';
		}
	    else if (247.5 < wind_direction && wind_direction <= 292.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/w.svg");
	        windDirection = 'West';
		}
	    else if (292.5 < wind_direction && wind_direction <= 337.5) {
	        $("#icon-wind").attr("src", "/wp-content/themes/transformation/media/img/wind/white/nw.svg");
	        windDirection = 'Northwest';
		}
	}

function setWindIconBlack(wind_direction) {
	    if (wind_direction > 337.5 || wind_direction <= 22.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/n.svg");
	        windDirection = 'North';
	    }
	    else if (22.5 < wind_direction && wind_direction <= 67.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/ne.svg");
	        windDirection = 'Northeast';
		}
	    else if (67.5 < wind_direction && wind_direction <= 112.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/e.svg");
	        windDirection = 'East';
		}
	    else if (112.5 < wind_direction && wind_direction <= 157.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/se.svg");
			        windDirection = 'Southeast';
		}
	    else if (157.5 < wind_direction && wind_direction <= 202.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/s.svg");
	        windDirection = 'South';
		}
	    else if (202.5 < wind_direction && wind_direction <= 247.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/sw.svg");
	        windDirection = 'Southwest';
		}
	    else if (247.5 < wind_direction && wind_direction <= 292.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/w.svg");
	        windDirection = 'West';
		}
	    else if (292.5 < wind_direction && wind_direction <= 337.5) {
	        $("#icon-wind-black").attr("src", "/wp-content/themes/transformation/media/img/wind/black/nw.svg");
	        windDirection = 'Northwest';
		}
	}

	$('#icon-weather').mouseenter(function() {
		$('#text-weather').html(weather);
	});
	$('#icon-weather').mouseout(function() {
		$('#text-weather').html("");
	});

	$('#icon-wind').mouseenter(function() {
		$('#text-weather').html(wind);
	});
	$('#icon-wind').mouseout(function() {
		$('#text-weather').html("");
	});

	$('#icon-weather-black').mouseenter(function() {
		$('#text-weather').html(weather);
	});
	$('#icon-weather-black').mouseout(function() {
		$('#text-weather').html("");
	});

	$('#icon-wind-black').mouseenter(function() {
		$('#text-weather').html(wind);
	});
	$('#icon-wind-black').mouseout(function() {
		$('#text-weather').html("");
	});


	/*********************
	PARTICIPANTS
	*********************/

	$('.participant').on('click', function () {

		$participant = $(this);

		window.location.hash = '#' + $participant.find('.participant-title').attr('id');

		$participant.find('.participant-body').slideToggle(400);

		$participant.find('.participant-up').toggle();
		$participant.find('.participant-down').toggle();

	});

	var participant_ids = [];

	$(".participant-title").map(function() { participant_ids.push(('#' + this.id)); });

	$(window).on('load', function(e){
		if(participant_ids.indexOf(window.location.hash))
			{
				var $participantId = $(window.location.hash);
				$participantId.closest('.participants-list').show();
				$participantId.closest('.participant').find('.participant-body').slideToggle(400);
			}
	});	

	$(window).on('hashchange', function(e){
		if(participant_ids.indexOf(window.location.hash))
			{
				var $participantId = $(window.location.hash);
				$participantId.closest('.participants-list').show();
				$participantId.closest('.participant').find('.participant-body').slide(400);
			}
	});

	if ($(window).width() < 540) {
		$('img#supporter-block').attr('src', "/wp-content/themes/transformation/media/img/marathon_supporters_mobile.svg");
	}

	/* Logo Animation: If mobile, set logo to static image rather than video */
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('#logo-animation').html('<img class="tm-logo" src="/wp-content/themes/transformation/media/img/logo_black.svg">');
		$('footer #logo-animation').html('<img class="tm-logo" src="/wp-content/themes/transformation/media/img/logo.svg">');
		$('footer #logo-animation').css("margin-left", 0)
	}

	if ($(window).width() < 1200) {
		$("#social-icons").removeClass("pull-right");
		$("#serpentine-marathon").removeClass("pull-right");
	}

	$('a#participants-a-i-link').on('click', function () {
		$('a.participants-active').removeClass("participants-active");
		$(this).attr("class", "participants-active");

		$('#participants-a-i').slideToggle(1000);
		$('#participants-j-s').hide();
		$('#participants-t-z').hide();

	});

	$('a#participants-j-s-link').on('click', function () {
		$('a.participants-active').removeClass("participants-active");
		$(this).attr("class", "participants-active");
		$('#participants-j-s').slideToggle(1000);
		$('#participants-a-i').hide();
		$('#participants-t-z').hide();

	});

	$('a#participants-t-z-link').on('click', function () {
		$('a.participants-active').removeClass("participants-active");
		$(this).attr("class", "participants-active");
		$('#participants-t-z').slideToggle(1000);
		$('#participants-a-i').hide();
		$('#participants-j-s').hide();

	});

	$('a#participants-all').on('click', function () {
		$('a.participants-active').removeClass("participants-active");
		$(this).attr("class", "participants-active");
		$('#participants-a-i').slideToggle(1000);
		$('#participants-j-s').show(1000);
		$('#participants-t-z').show(1000);

	});

	$('.programme-anchor').prepend("<a name='programme'></a>");
	$('.participants-anchor').prepend("<a name='participants'></a>");
	$('.live-blog-anchor').prepend("<a name='live-blog'></a>");


	/******************
	SMOOTH SCROLL
	******************/

	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});

});
