/*
--------------------------------------------------------

www.danielalbu.com

--------------------------------------------------------
*/

/*  ------------------
    Remove Preloader
    ------------------  */

$(window).load(function () {
    $('#preloader').delay(350).fadeOut('slow', function () {
        $('.profile-page, .resume-page, .contact-page').hide();
    });
});

$(document).ready(function () {

    

    'use strict';

    //history.pushState(null,null,"#");

    /*  ---------------------
         Homepage Responsive
        ---------------------  */

        function hideHomepage()
        {
            $('.home-page').css({
                visibility: 'hidden'
            });
        }
    

    function homepageResponsive() {

        // Homepage Main Portions Responsive

        var windowsWidth = $(window).width(),
            windowsHeight = $(window).height();

        if (windowsWidth > windowsHeight) {

            $('.introduction , .menu').css({
                width: '50%',
                height: '100%'
            });

        } else {

            $('.introduction , .menu').css({
                width: '100%',
                height: '50%'
            });

        }

        // Homepage Profile Image Responsive

        var introWidth = $('.introduction').width(),
            introHeight = $('.introduction').height(),
            bgImage = $('.introduction').find('img');

        if (introWidth > introHeight) {

            bgImage.css({
                width: '100%',
                height: 'auto'
            });

        } else {

            bgImage.css({
                width: 'auto',
                height: '100%'
            });

        }

    }

    $(window).on('load resize', homepageResponsive);

    /*  --------------
         Menu Settings
        --------------  */

    // Hide Menu

    $('.menu > div').on('click', function () {

        var introWidth = $('.introduction').width(),
            menuWidth = $('.menu').width();

            TweenLite.to($('.introduction'), 0.8, {left:-introWidth});
            TweenLite.to($('.menu'), 0.8, {left:menuWidth,onComplete: hideHomepage});
            
            

        /*$('.introduction').animate({
            left: '-' + introWidth
        }, 1000, 'easeOutQuart');
        $('.menu').animate({
            left: menuWidth
        }, 1000, 'easeOutQuart', function () {
            $('.home-page').css({
                visibility: 'hidden'
            });
        });*/

    });

    // Show Relative Page Onclick

    $('.menu div.profile-btn').on('click', function () {
        history.pushState(null,"Profile","#Profile");
        ga('set', 'page', '/index.html#Profile');
        ga('send', 'pageview');
        $('.profile-page').fadeIn(1200);
    });

    $('.menu div.resume-btn').on('click', function () {
        history.pushState(null,"Resume","#Resume");
        ga('set', 'page', '/index.html#Resume');
        ga('send', 'pageview');
        $('.resume-page').fadeIn(1200);
    });

    $('.menu div.portfolio-btn').on('click', function () {
        history.pushState(null,"Portfolio","#Portfolio");
        ga('set', 'page', '/index.html#Portfolio');
        ga('send', 'pageview');
        $('.portfolio-page').fadeIn(1200);
    });

    $('.menu div.contact-btn').on('click', function () {
        history.pushState(null,"Contact","#Contact");
        ga('set', 'page', '/index.html#Contact');
        ga('send', 'pageview');
        $('.contact-page').fadeIn(1200);
    });

    // Close Button, Hide Menu

    $('.close-btn').on('click', function () {
        $('.home-page').css({
            visibility: 'visible'
        });

        history.pushState(null,null,"#");

        TweenLite.to($('.introduction'), 0.8, {left:0});
        TweenLite.to($('.menu'), 0.8, {left:0});
        //TweenLite.to($('.profile-page'), 0.8, {opacity:0});
        

        $('.profile-page, .resume-page, .portfolio-page, .contact-page').fadeOut(800);
    });
    
    /*  --------------------------------
         Maximize Services Items Height
        --------------------------------  */
    
    function maximizeHeight() {
        
        var minHeight = 0;
        
        $('.services').each(function () {
            
            var maxHeight = $(this).height();
            
            if (maxHeight > minHeight) {
                minHeight = maxHeight;
            }
            
        });
        
        $('.services').height(minHeight);
    }
    
    maximizeHeight();
    
    $(window).on('resize', maximizeHeight);

    /*  ----------------------------------------
         Tooltip Starter for Social Media Icons
        ----------------------------------------  */

    $('.intro-content .social-media [data-toggle="tooltip"]').tooltip({
        placement: 'bottom'
    });

    $('.contact-details .social-media [data-toggle="tooltip"]').tooltip();

    /*  ------------
         Pie Charts
        ------------  */

    $(function () {

        var fillColor = $('.footer').css('background-color'); // Get background color of footer to set relevent fill color in pie charts

        // Initiate EasyPieChart

        $('.skill').easyPieChart({
            barColor: fillColor,
            trackColor: '#c6c6c6',
            scaleColor: '#c6c6c6',
            scaleLength: 8,
            lineWidth: 8,
            size: 150,
            lineCap: 'butt'
        });

    });

    /*  -------------------------------
         MixItUp ( for portfolio page )
        -------------------------------  */

    $(function () {

        // Initiate MixItUp

        $('#projects').mixItUp({
            
            callbacks: {
                onMixLoad: function (state) {
                    $('.portfolio-page').hide();
                }
            }
            
        });

    });

    /*  -------------------------------
         PopUp ( for portfolio page )
        -------------------------------  */

    $(function () {
        $('.show-popup').popup({
            keepInlineChanges: true,
            speed: 500
        });
    });

    /*  -----------------------------------------------------
         MixItUp ( for portfolio page : testimonials slider )
        -----------------------------------------------------  */

    $(function () {
        $(".owl-carousel").owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 200,
            paginationSpeed: 300,
            singleItem: true
        });
    });
    
    /*  -------------
         Contact Form
        ------------- */

    $('#contactForm').submit(function () {
        
        $.ajax({
            type: "POST",
            url: "php/contact.php",
            data: $('#contactForm').serialize(),
            success: function (msg) {
                if (msg == 'SEND') {
                    $('.success').fadeIn();
                    ga('send', 'event', 'Contact', 'Email Sent', '');
                    $('.error').fadeOut();
                    $('#contactForm')[0].reset();
                } else {
                    $('.success').fadeOut();
                    $('.error').fadeIn().find('h3').text(msg);
                }
            }
        });
        return false;
    });

    /*  -------------------------------
         Google Map ( for contact page )
        -------------------------------  */

    $('#google-map').gMap({
        latitude: 31.562130,
        longitude: 74.319460,
        maptype: 'TERRAIN',
        scrollwheel: false,
        zoom: 14,
        markers: [
            {
                latitude: 31.562130,
                longitude: 74.319460,
                html: "I am Here!",
                icon: {
                    image: "images/icon/map_marker.png",
                    iconsize: [46, 46],
                    iconanchor: [12, 46]
                }
            }
        ],
        controls: {
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        }
    });

});
