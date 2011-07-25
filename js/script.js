/* Author: Joel Foy

*/
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
	
	// Nav Scrolling 
	
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
	
	

	// Mosiac for portfolio
	
	$('.bar').mosaic({
		animation	:	'slide'		//fade or slide
	});

}); // end of jQuery






















