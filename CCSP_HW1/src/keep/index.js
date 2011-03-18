////function showInfo(data) {
////	// Date
////	var date = new Date();
////	$("#date").html(date.toDateString());
////	// Weather
////	weatherStr = data["city"]+" "+data["temperature"]+"&#176;C "+data["description"];
////	$("#weather").html(weatherStr);
////}
////
////$(document).ready(function(){
////	// Check Browser
////	if (navigator.userAgent.match("Chrome")) {
////		$("div#info").addClass("chrome");
////	} else if (navigator.userAgent.match("Safari")) {
////		$("div#info").addClass("safari");
////	} else if (navigator.userAgent.match("Firefox")) {
////		$("div#info").addClass("firefox");
////	} else if (navigator.userAgent.match("Opera")) {
////		$("div#info").addClass("opera");
////	} else if (navigator.userAgent.match("MSIE")) {
////		$("div#info").addClass("msie");
////	}
////	// Load info
////	$.ajax({
////		url: "http://ntu-taiwan-weather.appspot.com/json/current/Taipei/?callback=showInfo",
////		dataType: "jsonp"
////	});
////	// Button
////	$("#content input[type='submit']").hover(function(){
////		$(this).addClass("hover");
////	}, function(){
////		$(this).removeClass("hover");
////	}).click(function(){
////		// AJAX submit and return
////		$.ajax({
////			url: "/send",
////			type: "post",
////			data: { content: $("textarea[name='content']").val() },
////			dataType: "json",
////			success: function(response) {
////				// Clean input
////				$("textarea[name='content']").val("");
////				$("#board").prepend("<div class=\"post\"></div>");
////				$("#board div.post:first").append("<div class=\"postBody\"></div>").hide();
////				$("#board div.post:first").append("<div><span class=\"postAuthor\"></span><span class=\"postTime\"></span></div>");
////				$("#board div.post:first .postBody").html(response["content"]);
////				$("#board div.post:first .postAuthor").html(response["author"]);
////				$("#board div.post:first .postTime").html(response["date"]);
////				$("#board div.post:first").slideDown();
////			}
////		});
////	});
////});
//function s(data) {
//	d=new Date();
//	$("#date").html(d.toDateString());
//	w=data["city"]+" "+data["temperature"]+"&#176;C "+data["description"];
//	$("#weather").html(w);
//}
//
//$(document).ready(function(){
//	if (navigator.userAgent.match("Chrome")) $("div#info").addClass("chrome"); else if (navigator.userAgent.match("Safari")) {
//		$("div#info").addClass("safari");
//	} else if (navigator.userAgent.match("Firefox")) {
//		$("div#info").addClass("firefox");
//	} else if (navigator.userAgent.match("Opera")) {
//		$("div#info").addClass("opera");
//	} else if (navigator.userAgent.match("MSIE")) {
//		$("div#info").addClass("msie");
//	}
//	// Load info
//	$.ajax({
//		url: "http://ntu-taiwan-weather.appspot.com/json/current/Taipei/?callback=s",
//		dataType: "jsonp"
//	});
//	// Button
//	$("#content input[type='submit']").hover(function(){
//		$(this).addClass("hover");
//	}, function(){
//		$(this).removeClass("hover");
//	}).click(function(){
//		// AJAX submit and return
//		$.ajax({
//			url: "/send",
//			type: "post",
//			data: { content: $("textarea[name='content']").val() },
//			dataType: "json",
//			success: function(response) {
//				// Clean input
//				$("textarea[name='content']").val("");
//				$("#board").prepend("<div class=\"post\"></div>");
//				$("#board div.post:first").append("<div class=\"postBody\"></div>").hide();
//				$("#board div.post:first").append("<div><span class=\"postAuthor\"></span><span class=\"postTime\"></span></div>");
//				$("#board div.post:first .postBody").html(response["content"]);
//				$("#board div.post:first .postAuthor").html(response["author"]);
//				$("#board div.post:first .postTime").html(response["date"]);
//				$("#board div.post:first").slideDown();
//			}
//		});
//	});
//});
function s(data) {
	d=new Date();
	$("#date").html(d.toDateString());
	w=data["city"]+" "+data["temperature"]+"&#176;C "+data["description"];
	$("#weather").html(w);
}
$(document).ready(function(){
	if (navigator.userAgent.match("Chrome"))$("div#info").addClass("chrome");
	else if (navigator.userAgent.match("Safari"))$("div#info").addClass("safari");
	else if (navigator.userAgent.match("Firefox"))$("div#info").addClass("firefox");
	else if (navigator.userAgent.match("Opera"))$("div#info").addClass("opera");
	else if (navigator.userAgent.match("MSIE"))$("div#info").addClass("msie");
	$.ajax({
		url:"http://ntu-taiwan-weather.appspot.com/json/current/Taipei/?callback=s",
		dataType:"jsonp"
	});
	// Button
	$("#content input[type='submit']").hover(function(){
		$(this).addClass("hover");
	}, function(){
		$(this).removeClass("hover");
	}).click(function(){
		// AJAX submit and return
		$.ajax({
			url: "/send",
			type: "post",
			data: { content: $("textarea[name='content']").val() },
			dataType: "json",
			success: function(response) {
				// Clean input
				$("textarea[name='content']").val("");
				$("#board").prepend("<div class=\"post\"></div>");
				$("#board div.post:first").append("<div class=\"postBody\"></div>").hide();
				$("#board div.post:first").append("<div><span class=\"postAuthor\"></span><span class=\"postTime\"></span></div>");
				$("#board div.post:first .postBody").html(response["content"]);
				$("#board div.post:first .postAuthor").html(response["author"]);
				$("#board div.post:first .postTime").html(response["date"]);
				$("#board div.post:first").slideDown();
			}
		});
	});
});