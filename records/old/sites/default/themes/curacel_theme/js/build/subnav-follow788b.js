(function($) {

    $(function() {

        // Subnav config
        jQuery(function($) {

            // Do our DOM lookups beforehand
            var sections = $('section[data-subnav]');
            var subnavLink = $(".sticky-menu ul li a");

            subnavLink.click(function(event) {
                var subnavHeight = $(".sticky-menu").height();
                var targetSubnav = $(this).attr('href');
                targetSubnav = targetSubnav.replace('#', '');
                $('html, body').animate({
                    scrollTop: $('*[data-subnav="' + targetSubnav + '"]').offset().top - subnavHeight
                }, 500);
                window.location.hash = targetSubnav;
                event.preventDefault();
            });

            $("a.pageLogo").click(function() {
                $('html, body').animate({
                    scrollTop: $('#page').offset().top
                }, 250);
            });

            sections.waypoint({
                handler: function(direction) {

                    var active_section;
                    active_section = this;

                    if (direction === "up") {
                        active_section = active_section.previous();
                    }

                    if (active_section != null) {
                        var active_link = $('.sticky-menu ul li a[href="#' + active_section['element']['attributes'][1].value + '"]');
                        subnavLink.removeClass("active");
                        active_link.addClass("active");
                    }
                },
                offset: 140
            });
        });

        var $subNav = $('.sticky-menu'),
            winWidth = $(window).width(),
            subNavIsFollowing = false;

        if($('.sticky-menu').length > 0) {

            //Check the window width and reassign to winWidth variable
            $(window).resize(function() {

                winWidth = $(this).width();

            });

            $(window).scroll(function () {

                var scrollTop   = $(window).scrollTop(),
                    aboutNavTop = $subNav.offset().top,
                    menuHeight  = $('#mobile_nav_toolbar').outerHeight(),
                    subNavTop    = $('.main-hero').offset().top + $('.main-hero').outerHeight(),
                    subNavHeight = $subNav.outerHeight();

                //Check to see if winWidth is mobile width
                if(winWidth > 768) {

                    if(scrollTop >= aboutNavTop && !subNavIsFollowing) {

                        $subNav.addClass('follow');
                        subNavIsFollowing = true;

                    }

                    else if(scrollTop <= subNavTop && subNavIsFollowing) {

                        $subNav.removeClass('follow');
                        subNavIsFollowing = false;

                    }

                } else {

                    if(scrollTop >= ((subNavTop - 18) - subNavHeight) && !subNavIsFollowing) {

                        $subNav.addClass('follow');
                        subNavIsFollowing = true;

                    }

                    else if(scrollTop <= ((subNavTop - 18) - subNavHeight) && subNavIsFollowing) {

                        $subNav.removeClass('follow');
                        subNavIsFollowing = false;
                    }

                }

            });
        }

    });

})(jQuery);

