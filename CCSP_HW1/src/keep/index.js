function showInfo(data) {
	// Date
	var date = new Date();
	$("#date").html(date.toDateString());
	// Weather
	weatherStr = data["city"]+" "+data["temperature"]+"&#176;C "+data["description"];
	$("#weather").html(weatherStr);
}

// Delete Button
$.fn.deleteBtn = function() {
    return this.each(function() {
    	$(this).click(function(){
    		$("#loading").slideDown();
    		$.ajax({
    			url: "/delete",
    			type: "post",
    			data: {key: $(this).attr("id") },
    			dataType: "html",
    			success: function(response) {
    				$("#loading").slideUp();
    				$("#post_"+response).slideUp();
    			}
    		});
    	}).hover(function(){
    		$(this).addClass("hover");
    	}, function(){
    		$(this).removeClass("hover");
    	});
    });
};

$(document).ready(function(){
	// Check Browser
	if (navigator.userAgent.match("Chrome")) {
		$("div#info").addClass("chrome");
	} else if (navigator.userAgent.match("Safari")) {
		$("div#info").addClass("safari");
	} else if (navigator.userAgent.match("Firefox")) {
		$("div#info").addClass("firefox");
	} else if (navigator.userAgent.match("Opera")) {
		$("div#info").addClass("opera");
	} else if (navigator.userAgent.match("MSIE")) {
		$("div#info").addClass("msie");
	}
	// Delete Button
	$(".postDelete").deleteBtn();
	// Load info
	$.ajax({
		url: "http://ntu-taiwan-weather.appspot.com/json/current/Taipei/?callback=showInfo",
		dataType: "jsonp"
	});
	// Submit Button
	$("#content input[type='submit']").hover(function(){
		$(this).addClass("hover");
	}, function(){
		$(this).removeClass("hover");
	}).click(function(){
		$("#loading").slideDown();
		// AJAX submit and return
		$.ajax({
			url: "/send",
			type: "post",
			data: { content: $("textarea[name='content']").val() },
			dataType: "json",
			success: function(response) {
				// Clean
				$("textarea[name='content']").val("");
				$("#loading").slideUp();
				// Show
				$("#board").prepend("<div class=\"post\"></div>");
				$("#board div.post:first").append("<div class=\"postBody\" id=\"post_"+response["key"]+"\"></div>").hide();
				$("#board div.post:first").append("<div><span class=\"postAuthor\"></span><span class=\"postTime\"></span><span class=\"postDelete\">erase</span></div>");
				$("#board div.post:first .postBody").html(response["content"]);
				$("#board div.post:first .postAuthor").html(response["author"]);
				$("#board div.post:first .postTime").html(response["date"]);
				$("#board div.post:first .postDelete").attr("id",response["key"]).deleteBtn();
				$("#board div.post:first").slideDown();
			}
		});
	});
});