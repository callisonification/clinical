// JavaScript Document
// CSS Document 
// author : Christopher Allison
// date :   6.27.13
// version : 1.0


//init function to load Google map
function initialize() {
    var myLatlng = new google.maps.LatLng(34.251278, -84.473791);
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(34.251278, -84.473791),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    //create content for info window
    var contentString = '<div id="content">' +
        '<h4 id="firstHeading" class="firstHeading">Clinical-Security</h4>' +
        '<div id="bodyContent">' +
        '<address>1353 Riverstone Parkway<br>' +
        'Ste 120-195<br>' +
        'Canton, Georgia 30114<br>' +
        '<strong>Phone : </strong>1-866-642-2305</address>' +
        '</div>' +
        '</div>';

    //instantiate info window
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    //instantiate map marker
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click for more info'
    });

    //add click event listener
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

//loads script tags into body once window is loaded

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBlvwQsAsW5ZNIHpcgrTZjkenlWkNaKQyc&sensor=false&callback=initialize";
    document.body.appendChild(script);
}

//runs functions on window.load
window.onload = loadScript;

//begin doc.read()
$(document).ready(function () {

    //click function for profile modals
    $('.bio a').on('click', function () {

        //declare local variables
        var title = $(this).attr('data-title');
        var src = $(this).attr('data-src');
        var imgHtml = '<img src="../img/profiles/' + src + '" />';

        //append data to elements
        $('#myModalLabel').empty().append(title);
        $('.modal-body p').empty().append(imgHtml);

    }); //end click function

	
	//auto-start carousel
	$('.carousel').carousel({
		interval : 5000,
		pause : ''
	});
	
    //local vars for glyph image
    var glyph = $('.icon-forward');
    var read = $('.readmore');

    //hide glyph on init
    $(glyph).css({
        opacity: 0
    });

    //hover function for glyph-read more links
    $(read).on('mouseover', function () {
        $(this).find(glyph).animate({
            opacity: 1
        }, 500);
    });
    $(read).on('mouseout', function () {
        $(this).find(glyph).animate({
            opacity: 0
        }, 500);
    });

    //local vars for validation function
    //these vars hold data that is submitted to email.php
    var conname = $('.con-name');
    var conemail = $('.con-email');
    var subject = $('.con-sub');
    var mssg = $('.con-mssg');

    //click handler for mini-contact form - HOME PAGE FORM
    //checks inputs and turns borders red if empty or invalid
    //submits ajax data to email.php 
    $('#mini-contact .submit').on('click', function (e) {

        $('.contact input').each(function (index, element) {
            if ($(this).val() === '' || $(this).val().length < 2) {
                $(this).css({
                    'border': '1px solid #b94a48'
                });
            }
        });
        $('.contact textarea').each(function (index, element) {
            if ($(this).val() === '' || $(this).val().length < 2) {
                $(this).css({
                    'border': '1px solid #b94a48'
                });
            }
        });

        $('#mini-contact').validate({
            rules: {
                'con-name': "required",
                'con-email': {
                    required: true,
                    email: true
                },
                subject: "required",
                message: "required"
            },
            messages: {
                'con-name': "Please enter your name",
                'con-email': {
                    required: "Please enter your contact email address",
                    email: "Please enter a valid email address"
                },
                subject: "Please enter a valid subject line",
                message: "Pleaes enter a valid message"
            },
            submitHandler: function () {
                //send AJAX mail once validation passes
                $.ajax({
                    type: 'POST',
                    url: 'php/email.php',
                    data: {
                        con_name: conname.val(),
                        con_email: conemail.val(),
                        subject: subject.val(),
                        message: mssg.val()
                    },
                    success: function () {
						
						//display success message
                        $('.alert-success').fadeIn(500);
						
						//reset input fields
						$(conname).val('');
						$(conemail).val('');
						$(subject).val('');
						$(mssg).val('');
						
						//resets input borders if they are set to red
						$('.contact input').each(function (index, element) {
							if ($(this).val() === '' || $(this).val().length < 2) {
								$(this).css({
									'border': '1px solid #ccc'
								});
							}
						});
						$('.contact textarea').each(function (index, element) {
							if ($(this).val() === '' || $(this).val().length < 2) {
								$(this).css({
									'border': '1px solid #ccc'
								});
							}
						});
						
                    },
					error: function() {
						$('.alert-error').fadeIn(500);
					}

                });//end AJAX function
            }

        }); //end validate function

    }); //end click function


    //click handler for main-contact form - CONTACT PAGE FORM
    //checks inputs and turns borders red if empty or invalid
    //submits ajax data to email.php 	
    $('#main-contact .submit').on('click', function (e) {

        $('.contact input').each(function (index, element) {
            if ($(this).val() === '' || $(this).val().length < 2) {
                $(this).css({
                    'border': '1px solid #b94a48'
                });
            }
        });
        $('.contact textarea').each(function (index, element) {
            if ($(this).val() === '' || $(this).val().length < 2) {
                $(this).css({
                    'border': '1px solid #b94a48'
                });
            }
        });

        $('#main-contact').validate({
            rules: {
                'con-name': "required",
                'con-email': {
                    required: true,
                    email: true
                },
                subject: "required",
                message: "required"
            },
            messages: {
                'con-name': "Please enter your name",
                'con-email': {
                    required: "Please enter your contact email address",
                    email: "Please enter a valid email address"
                },
                subject: "Please enter a valid subject line",
                message: "Pleaes enter a valid message"
            },
            submitHandler: function () {
                //send AJAX mail once validation passes
                $.ajax({
                    type: 'POST',
                    url: '../php/email.php',
                    data: {
                        con_name: conname.val(),
                        con_email: conemail.val(),
                        subject: subject.val(),
                        message: mssg.val()
                    },
                    success: function () {
						
						//display success message
                        $('.alert-success').fadeIn(500);
						
						//reset input fields
						$(conname).val('');
						$(conemail).val('');
						$(subject).val('');
						$(mssg).val('');
						
						//resets input borders if they are set to red
						$('.contact input').each(function (index, element) {
							if ($(this).val() === '' || $(this).val().length < 2) {
								$(this).css({
									'border': '1px solid #ccc'
								});
							}
						});
						$('.contact textarea').each(function (index, element) {
							if ($(this).val() === '' || $(this).val().length < 2) {
								$(this).css({
									'border': '1px solid #ccc'
								});
							}
						});
																	
                    },
					error: function() {
						$('.alert-error').fadeIn(500);
					}
                });//end AJAX function
            }

        }); //end validate function

    }); //end click function	

}); //end doc.ready();