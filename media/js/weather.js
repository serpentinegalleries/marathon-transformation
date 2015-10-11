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

	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=21d88c5657030fc12d5d4a62dbf0f053", function( data ) {
		 weather = "London, " + month + " " + day + "<br>" + data.weather[0].main + ", " + data.main.temp + "°C" ;
		 wind = "London, " + month + " " + day + "<br>" + data.wind.speed + ", " + data.wind.deg ;
		console.log(data);
	})

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


	$('.participant-title').on('click', function () {

		$participant = $(this);

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

	 /* $(this).closest('.participant');

	  if (box.hasClass('hidden')) {
	    
	    box.removeClass('hidden');
	    setTimeout(function () {
	      box.removeClass('visuallyhidden');
	    }, 20);

	  } else {
	    
	    box.addClass('visuallyhidden');
	    
	    box.one('transitionend', function(e) {

	      box.addClass('hidden');

	    });
	    
	  }*/

});
