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
		 setWindIcon(data.wind.deg);
		 wind = "London, " + month + " " + day + "<br>" + data.wind.speed + " m/s, " + windDirection ;
	})

	function setIcon(icon) {
		$("#icon-weather").attr("src", "/wp-content/themes/transformation/media/img/weather/white/" + icon + ".svg");
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


	/*********************
	PARTICIPANTS
	*********************/

	$('.participant-title').on('click', function () {

		$participant = $(this);

		//window.location.hash = '#' + $participant.attr('id');

		$participant_section = $participant.closest('.participant-text');

		$participant_section.find('.participant-body').toggle(700);

		$participant_section.find('.participant-hide').toggle(700);

	});

	$('.participant-hide').on('click', function () {

		$participant = $(this);

		$participant_section = $participant.closest('.participant-text');

		$participant_section.find('.participant-body').hide(700);

		$participant_section.find('.participant-hide').hide(700);

	});

	var participant_ids = [];

	$(".participant-title").map(function() { participant_ids.push(('#' + this.id)); });

	$(window).on('load', function(e){
		if(participant_ids.indexOf(window.location.hash))
			{
				var $participantId = $(window.location.hash);
				$participantId.closest('.participant-text').find('.participant-body').show(700);
				$participantId.closest('.participant-text').find('.participant-hide').show(700);
			}
	});	

	$(window).on('hashchange', function(e){
		if(participant_ids.indexOf(window.location.hash))
			{
				var $participantId = $(window.location.hash);
				$participantId.closest('.participant-text').find('.participant-body').show(700);
				$participantId.closest('.participant-text').find('.participant-hide').show(700);
			}
	});

	if ($(window).width() < 540) {
		$('#supporters').attr('src', "/wp-content/themes/transformation/media/img/marathon_supporters_mobile.svg");
	}


});
