// Show information in information bar
// Data is come from webservice api
function showInfo(data) {
	// today's date
	var date = new Date();
	$("#date").html(date.toDateString());
	// Weather information
	weatherStr = data["city"]+" "+data["temperature"]+"&#176;C "+data["description"];
	$("#weather").html(weatherStr);
}

// Delete Button as jQuery plugin
$.fn.deleteBtn = function() {
    return this.each(function() {
    	$(this).click(function(){
    		// Click action
    		// Show loading hint
    		$("#loading").slideDown();
    		// Call AJAX for delete message
    		$.ajax({
    			url: "/delete",
    			type: "post",
    			data: {key: $(this).attr("id") },
    			dataType: "html",
    			success: function(response) {
    				// Close loading hint
    				$("#loading").slideUp();
    				// Hide message deleted
    				$("#post_"+response).slideUp();
    			}
    		});
    	}).hover(function(){
    		// Mouse Effect
    		$(this).addClass("hover");
    	}, function(){
    		// Mouse Effect
    		$(this).removeClass("hover");
    	});
    });
};

$(document).ready(function(){
	// Check Browser and make them different
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
	
	// Delete Button activation
	$(".postDelete").deleteBtn();
	
	// Load information bar with JSONP
	$.ajax({
		url: "http://ntu-taiwan-weather.appspot.com/json/current/Taipei/?callback=showInfo",
		dataType: "jsonp"
	});
	
	// Submit Button activation
	$("#content input[type='submit']").hover(function(){
		// Mouse Effect
		$(this).addClass("hover");
	}, function(){
		// Mouse Effect
		$(this).removeClass("hover");
	}).click(function(){
		// Show loading hint
		$("#loading").slideDown();
		// AJAX submit and return
		$.ajax({
			url: "/send",
			type: "post",
			data: { content: $("textarea[name='content']").val() },
			dataType: "json",
			success: function(response) {
				// Clean input
				$("textarea[name='content']").val("");
				// Close loading hint
				$("#loading").slideUp();
				// Show data from AJAX Result
				// New a message tag
				$("#board").prepend("<div class=\"post\"></div>");
				// Make basic structure
				$("#board div.post:first").append("<div class=\"postBody\" id=\"post_"+response["key"]+"\"></div>").hide();
				$("#board div.post:first").append("<div><span class=\"postAuthor\"></span><span class=\"postTime\"></span><span class=\"postDelete\">erase</span></div>");
				// Fill data and activate action
				$("#board div.post:first .postBody").html(response["content"]);
				$("#board div.post:first .postAuthor").html(response["author"]);
				$("#board div.post:first .postTime").html(response["date"]);
				$("#board div.post:first .postDelete").attr("id",response["key"]).deleteBtn();
				// Show the new message
				$("#board div.post:first").slideDown();
			}
		});
	});
});