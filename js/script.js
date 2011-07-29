/* Author: Joel Foy

*/

//email validation
function isValidEmailAddress(emailAddress) {
var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
return pattern.test(emailAddress);
}

$(document).ready(function() {

	// hide floating nav
	$('#floating-nav').hide();

	// fade in floating menu
	$(function() {
		$(window).scroll(function(){
			if($(this).scrollTop() > 100) {
				$('#floating-nav').fadeIn();
			} else {
				$('#floating-nav').fadeOut();
			}
		});
	
	}); //end floating menu fade
	
	//////////////////////////////////////////////////////////////
	// Nav Scrolling 
	//////////////////////////////////////////////////////////////
	$('nav ul a').bind('click',function(event){
		var $anchor = $(this);
		
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000);
		event.preventDefault();
	});
	
	$('.nav-button').bind('click',function(event){
		var $anchor = $(this);
		
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1000);
		event.preventDefault();
	});	
	
	
	/////////////////////////////////////////////////////////////
	// Mosiac for portfolio
	/////////////////////////////////////////////////////////////
	$('.bar').mosaic({
		animation	:	'slide'		//fade or slide
	});


	////////////////////////////////////////////////
	//MODERNIZR PLACEHOLDER 
	////////////////////////////////////////////////

	if(!Modernizr.input.placeholder) { //Modernizr placeholder javascript
		// This adds placeholder text for any form element in browsers that do not support HTML5
		$("input[placeholder], textarea[placeholder]").each(function() {
			if($(this).val()==""){
				$(this).val($(this).attr("placeholder"));
				$(this).focus(function() {
					if($(this).val()==$(this).attr("placeholder")) {
						$(this).val("");
						$(this).removeClass("placeholder");
					}
				});
			}
		
		});
	
		$('form').submit(function() {
			// check for required element and form validation
			// Only remove placeholders before final submission
			var placeheld = $(this).find('[placeholder]');
			for (var i=0; i<placeheld.length; i++) {
				if($(placeheld[i]).val() == $(placeheld[i]) .attr('placeholder')) {
					//if not required, set value to empty before submitting
					$(placeheld[i]).attr('value','');
				}
			} 
		});
	}
	/////////////////////////////////////////////////////////////
	// Form Processing
	/////////////////////////////////////////////////////////////
	
	// Hide form errors
	$('.form-error').hide();
	
	// Submit 
	$('#contact-form #contact-submit').click(function() {
		
		$('.form-error').hide();
			
		// Validation
		var name = $("input#name").val();  
	        if (name == "") {  
	      	$("#name-error").show();
	      	$("input#name").focus();  
	      	return false;  
    	}
    	var email = $("input#email").val();  
	    	if (email == "" || !isValidEmailAddress(email)) { 
		      	$("#email-error").show(); 
		      	$("input#email").focus();  
		      	return false;  
	    }
	    var phone = $("input#phone").val();  
	    	if (phone == "") { 
		      	$("#phone-error").show(); 
		      	$("input#phone").focus();  
		      	return false;  
	    }
    	var comments = $("textarea#comments").val();  
	        if (comments == "") {  
	      	$("#comments-error").show();
	      	$("input#comments").focus();  
	      	return false;  
    	}
    	
    	// Collect Data
    	var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&comments=' + comments;
    	
    	// Send Form with a little AJAX
    	$.ajax({
    		type: "POST",
    		url: "http://www.createswitch.com/inc/contact-process.php", //change to correct host 
    		data: dataString, 
    		success: function() {
    			$('#contact-form').fadeOut(1000, function() {
    				$('#contact-form').replaceWith("<div id='message'></div>");
    				$('#message').html("<h3>Information Sent</h3>")
    				.append("<p>Your information has been sent to Joel Foy and you will be contacted as soon as possible. If you would like, feel free to call 678.591.7266 at any time to talk to me directly.</p>")
    				.append("<h4 class='thanks'>Thank you, " + name + "</h4>")
    			});
    		
    		},
    		error: function() {
    			$('#contact-form').append("<h4 class='h4'>There was an error sending your form. Call us at 904.437.7022.</h4>")
    		}
    	
    	}); //end AJAX sucka
		return false;
    	
    		
	});
}); // end of jQuery






















