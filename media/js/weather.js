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
	})

	$('#icon-weather').click(function() {
		if (showWeather) {
			$('#text-weather').html("");
			showWeather = false;
		}
		else {
			$('#text-weather').html(weather);
			showWeather = true;
			showWind = false;				
		}
	});

	$('#icon-wind').click(function() {
		if (showWind) {
			$('#text-weather').html("");
			showWind = false;
		}
		else {
			$('#text-weather').html(wind);
			showWind = true;
			showWeather = false;	
		}
	});

});
