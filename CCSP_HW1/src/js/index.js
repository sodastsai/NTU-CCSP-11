function showInfo(data) {
	// Date
	var date = new Date();
	$("#date").html(date.toDateString());
	// Weather
	weatherStr = data["city"]+" "+data["temperature"]+"&#176;C "+data["description"];
	$("#weather").html(weatherStr);
}

$(document).ready(function(){
	// Load info
	$.ajax({
		url: "http://ntu-taiwan-weather.appspot.com/json/current/Taipei/?callback=showInfo",
		dataType: "jsonp"
	});
	// Button
	$("#content input[type='submit']").hover(function(){
		$(this).addClass("hover");
	}, function(){
		$(this).removeClass("hover");
	});
});