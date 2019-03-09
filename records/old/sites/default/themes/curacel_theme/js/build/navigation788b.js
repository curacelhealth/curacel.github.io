!function($) {
    $(function() {
        function openSubNav(data) {
            subNav = !0,
            $(window).on("touchstart", function() {
                subNav && (touchingBg = !0)
            }),
            $(window).on("touchend", function() {
                touchingBg = !1
            }),
            $subMenuLayers.each(function() {
                var _this = $(this);
                "login" !== data ? _this.hasClass("search") && _this.css("display", "block") : _this.hasClass("login") && _this.css("display", "block")
            }),
            $subNav.css("left", "0").transition({
                opacity: 1
            }, animations.speed, animations.easing, function() {
                is_open = !0,
                "search" === data ? (animateSearchDivs(),
                animateColumns()) : "login" === data ? login = !0 : (animateNonSearchDivs(),
                animateColumns())
            })
        }
        function scrollMinipulate(disable) {
            if (disable) {
                var scrollPosition = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop]
                  , html = jQuery("html");
                html.data("scroll-position", scrollPosition),
                html.data("previous-overflow", html.css("overflow")),
                html.css("overflow", "hidden"),
                scrollPosition.length >= 2 && window.scrollTo(scrollPosition[0], scrollPosition[1])
            } else {
                var html = jQuery("html")
                  , scrollPosition = html.data("scroll-position");
                html.css("overflow", html.data("previous-overflow")),
                scrollPosition && scrollPosition.length >= 2 && window.scrollTo(scrollPosition[0], scrollPosition[1])
            }
        }
        function animateSearchDivs(reset) {
            $searchBox.attr("placeholder", "Search Here..."),
            "reset" !== reset ? ($searchIcon.transition({
                opacity: 1,
                x: 0
            }, animations.speed, animations.easing),
            $searchBox.css("visibility", "visible").transition({
                opacity: 1
            }, animations.speed, animations.easing, function() {
                searching = !0,
                $searchBox.focus()
            })) : ($searchIcon.transition({
                opacity: 0,
                x: -50
            }, animations.speed_instant, animations.easing_linear),
            $searchBox.transition({
                opacity: 0
            }, animations.speed_instant, animations.easing_linear, function() {
                $(this).css("visibility", "hidden"),
                searching = !1
            }))
        }
        function animateNonSearchDivs(reset) {
            "reset" !== reset ? ($heading.css("visibility", "visible").transition({
                opacity: 1
            }, animations.speed, animations.easing),
            $footer.length > 0 && $footer.transition({
                y: 0,
                opacity: 1
            }, animations.speed, animations.easing)) : ($heading.transition({
                opacity: 0
            }, animations.speed_instant, animations.easing_linear, function() {
                $(this).css("visibility", "hidden")
            }),
            $footer.length > 0 && $footer.transition({
                y: 100,
                opacity: 0
            }, animations.speed_instant, animations.easing_linear))
        }
        function animateColumns(reset) {
            var i = 0;
            $(".column").each("reset" !== reset ? function() {
                $(this).transition({
                    x: 0,
                    opacity: 1,
                    delay: i * animations.delay
                }, animations.speed, animations.easing),
                i++
            }
             : function() {
                $(this).transition({
                    x: 100,
                    opacity: 0
                }, animations.speed_instant, animations.easing_linear)
            }
            )
        }
        function closeSubNav() {
            is_open === !0 && $subNav.transition({
                opacity: 0
            }, animations.speed, animations.easing, function() {
                $(this).css("left", "-9999em"),
                is_open = !1,
                animateColumns("reset"),
                animateSearchDivs("reset"),
                animateNonSearchDivs("reset"),
                $subMenuLayers.each(function() {
                    $(this).css("display", "none")
                })
            })
        }
        function showSubNavFollow(scrollPos) {
            scrollPos > primeNavHeight + 40 ? $subNavFollow.css("top", "0") : $subNavFollow.css("top", -1 * (Math.abs(primeNavHeight) + 40))
        }
        function showMobileContainer() {
            mobile_nav = !0,
            $("#page").css({
                right: "80%"
            }),
            $mobileToolbar.css({
                right: "80%"
            }),
            $mobileNaviContainer.css({
                right: "0"
            }),
            $(".mobile-navigation-background").addClass("active"),
            mobile_nav === !0 && ($(window).on("touchstart", function(e) {
                "mobile-navigation-background active" === $(e.target).attr("class") && (touchingBg = !0)
            }),
            $(window).on("touchend", function() {
                touchingBg = !1
            }))
        }
        function hideMobileContainer() {
            mobile_nav = !1,
            $("#page").css({
                right: "0"
            }),
            $mobileToolbar.css({
                right: "0"
            }),
            $mobileNaviContainer.css({
                right: "-80%"
            }),
            $(".mobile-navigation-background").removeClass("active")
        }
        function accordianMobileContainer(elem, control) {
            switch (control) {
            case !1:
                elem.parent().removeClass("open");
                break;
            case "reset":
                elem.parent().removeClass("open"),
                $mobileMenuLinks.each(function() {
                    $(this).hasClass("expand-trigger") && $(this).parent().removeClass("open")
                });
                break;
            default:
                $mobileMenuLinks.each(function() {
                    $(this).hasClass("expand-trigger") && !$(this).parent().hasClass("expand-more") && $(this).parent().removeClass("open")
                }),
                setTimeout(function() {
                    elem.parent().addClass("open")
                }, animations.collapse_delay)
            }
        }
        function disableMenuLinksForMobile($link) {
            var $li = $mobileMenu.find("li");
            $li.each(function() {
                return $(this).hasClass("last") ? ($(this).addClass("toplevel").addClass("expand-more"),
                !1) : void 0
            }),
            $link.each(function() {
                "http://fake.link" === $(this).attr("href") && ($(this).attr("href", "javascript:void(0);"),
                $(this).attr("target", "_self"),
                $(this).addClass("expand-trigger"))
            })
        }
        function injectLogoTitle() {
            function hideStuff(elementArray) {
                $(elementArray).each(function() {
                    $(this).hide()
                })
            }
            function prepPage(borderColor, $list) {
                var stuff_to_hide = [$followNavTop, $listLast];
                hideStuff(stuff_to_hide),
                $subMenuNav.css({
                    "border-bottom-color": borderColor,
                    "border-bottom-width": "2px",
                    "border-bottom-style": "solid"
                }),
                $navBottom.append($list)
            }
            switch (cleanPath) {
            case "practice management":
                prepPage("#a8c531", $pmList);
                break;
            case "billing services":
                prepPage("#8fa929", $bsList);
                break;
            case "ehr":
                prepPage("#f26649", $ehrList);
                break;
            default:
                $navBottom.css("margin-top", "14px"),
                $logo.css("margin-top", "-7px")
            }
        }
        var $primeNav = $("#prime-nav")
          , $subNav = $("#sub_menu")
          , $subNavFollow = $("#sub_nav_follow")
          , $subMenuLayers = $(".sub-menu-layer")
          , $closeSubNavButton = $("a.close-sub-menu")
          , $heading = $(".header-content h1")
          , $searchIcon = $(".header-content i.icon-search")
          , $footer = $(".footer-content")
          , $searchBox = ($("#login-form-subnav"),
        $(".header-content #edit-search-block-form--2"))
          , $navigationLinks = $primeNav.find("a")
          , $mobileToolbar = $("#mobile_nav_toolbar")
          , $mobileNaviContainer = $("#mobile_container")
          , $mobileMenu = $("#block-menu-menu-mobile-menu ul:first")
          , $mobileMenuLinks = $("#block-menu-menu-mobile-menu ul.menu a")
          , $mobileNaviTrigger = ($("#block-menu-menu-mobile-menu a"),
        $(".mobile-menu-activator"))
          , $mobileNaviCloseTrigger = $(".mobile-navigation-close-trigger")
          , $logo = $("#follow-nav .logo")
          , $followNavTop = $("#followSubTopNav")
          , $subMenuNav = $(".sub-menu-follow-nav")
          , $navBottom = ($("#follow-nav .nav-menu"),
        $("#follow-nav .navpart--bottom #primary"))
          , $ehrList = $('<li><a href="http://www.signup.kareo.com/signup/ehr">SIGN UP FREE</a></li>')
          , $pmList = $('<li><a href="http://www.signup.kareo.com/signup/ehr">SIGN UP</a></li>')
          , $bsList = $('<li><a href="/contact">CONTACT US</a></li>')
          , $listLast = $("#follow-nav .menu-2064")
          , $kareoDialogClose = $("a.kareo-dialog-close");
        primeNavHeight = $primeNav.outerHeight(!1),
        topScrollPos = $(window).scrollTop(),
        login = !1,
        searching = !1,
        is_open = !1,
        touchingBg = !1,
        mobile_nav = !1,
        subNav = !1,
        winWidth = $(window).width(),
        path = window.location.pathname,
        cleanPath = path.replace("/", ""),
        cleanPath = cleanPath.replace("-", " "),
        cleanPathCaps = '<span class="title-inject-caps">' + cleanPath + "</span>",
        cleanPathAllCaps = '<span class="title-inject-all-caps">' + cleanPath + "</span>",
        animations = {
            speed: "250",
            speed_long: "500",
            collapse_delay: "260",
            delay: "50",
            speed_instant: "10",
            easing: "ease",
            easing_linear: "linear",
            custom_easing: "linear"
        },
        768 >= winWidth && $mobileToolbar.css("width", winWidth + "px"),
        $(window).resize(function() {
            winWidth = $(window).width(),
            768 >= winWidth && $mobileToolbar.css("width", winWidth + "px")
        }),
        $(window).on("touchmove", function(e) {
            touchingBg && e.preventDefault()
        }),
        $navigationLinks.each(function() {
            $(this).on("click", function(e) {
                "More" === $(this).html() ? (scrollMinipulate(!0),
                openSubNav(!1),
                e.preventDefault()) : $(this).data("secondarysearch") ? (scrollMinipulate(!0),
                winWidth > 768 && (e.preventDefault(),
                openSubNav("search")),
                openSubNav("search")) : $(this).data("login") && (window.location.href = "https://app.kareo.com/login-ui/#/login")
            })
        }),
        $subNavFollow.find("a").each(function() {
            $(this).on("click", function(e) {
                "More" === $(this).html() ? (scrollMinipulate(!0),
                $subNavFollow.css("top", -1 * (Math.abs(primeNavHeight) + 40)),
                openSubNav(!1),
                e.preventDefault()) : $(this).data("secondarysearch") ? (scrollMinipulate(!0),
                winWidth > 768 && (e.preventDefault(),
                openSubNav("search")),
                $subNavFollow.css("top", -1 * (Math.abs(primeNavHeight) + 40)),
                openSubNav("search")) : $(this).data("login") && (window.location.href = "https://app.kareo.com/login-ui/#/login")
            })
        }),
        $closeSubNavButton.on("click", function() {
            subNav = !1,
            scrollMinipulate(!1),
            closeSubNav(),
            $(window).scrollTop() > primeNavHeight + 40 && $subNavFollow.css("top", 0)
        }),
        $mobileMenuLinks.each(function() {
            disableMenuLinksForMobile($(this))
        }),
        setTimeout(function() {
            $(".toplevel").append('<span class="icon-close"><svg version="1.1" id="Layer_1" x="0px" y="0px"\n     width="100%" height="100%" viewBox="0 0 24.391 24.02" enable-background="new 0 0 24.391 24.02" xml:space="preserve">\n<path fill-rule="evenodd" clip-rule="evenodd" fill="#7F8384" d="M24.145,1.682l-1.43-1.435c-0.394-0.396-1.125-0.305-1.633,0.204\n    l-8.93,8.954L3.291,0.542C2.786,0.038,2.059-0.053,1.667,0.339L0.244,1.762c-0.393,0.393-0.302,1.119,0.202,1.624l8.867,8.866\n    l-8.429,8.452c-0.507,0.507-0.598,1.241-0.203,1.637l1.429,1.433c0.395,0.396,1.126,0.305,1.633-0.205l8.432-8.455l8.365,8.364\n    c0.504,0.507,1.232,0.597,1.625,0.203l1.422-1.42c0.393-0.393,0.302-1.122-0.202-1.625l-8.369-8.369l8.927-8.95\n    C24.449,2.809,24.54,2.077,24.145,1.682z"/>\n</svg></span>')
        }, animations.speed_instant),
        $searchBox.keyup(function() {
            $(this).val().length > 0 ? $searchIcon.addClass("searching") : $searchIcon.removeClass("searching")
        }),
        $mobileNaviTrigger.on("click", function() {
            $("#page").hasClass("mobile-container-open") || showMobileContainer()
        }),
        $mobileNaviCloseTrigger.on("click", function() {
            hideMobileContainer()
        }),
        $mobileMenuLinks.each(function() {
            $(this).on("click", function() {
                $(this).hasClass("expand-trigger") && !$(this).parent().hasClass("open") ? accordianMobileContainer($(this), !0) : $(this).hasClass("expand-trigger") && $(this).parent().hasClass("open") && !$(this).parent().hasClass("expand-more") ? accordianMobileContainer($(this), !1) : $(this).hasClass("expand-trigger") && $(this).parent().hasClass("expand-more") && accordianMobileContainer($(this), "reset")
            })
        }),
        $(document).ready(function() {
            injectLogoTitle(),
            $kareoDialogClose.on("click", function() {
                scrollMinipulate(!1)
            })
        }),
        $("body:not(.page-node-11,.page-node-16,.page-node-21,.page-node-56,.page-node-59,.page-node-57,.page-node-60,.page-node-61,.page-node-58,.page-node-79,.page-node-62,.page-node-143,.page-node-144,.page-node-145,.page-node-146,.page-node-147,.page-node-3976,.page-node-470,.page-node-3526,.page-node-5166,.page-node-5171,.page-node-5176,.page-node-5181,.page-node-5186,.page-node-5191,.page-node-5196)").length > 0 && $(window).on("scroll", function() {
            topScrollPos = $(window).scrollTop(),
            showSubNavFollow(topScrollPos)
        }),
        $(".live-chat-link").on("click", function(e) {
            return e.preventDefault(),
            window.open("/chat", "_blank", "width=410, height=400,modal=yes,alwaysRaised=yes,toolbar=0,location=0,menubar=0"),
            $(".LPMcontainer").css("border", "none"),
            $(".LPMoverlay").css("border", "none"),
            !1
        });
        var menuKMB = {
            width: 390,
            height: 150,
            placement: "bottom",
            trigger: "hover",
            content: '<div class="submenuKMB"><a href="/practice-management/" class="subBilling"><img src="http://curacel.co/img/convergence/billing.png" width="48" />Billing<span>Learn how Curacel-Health Billing helps you easily manage your patients and finances</span></a></div><div>',
            delay: 75,
            animation: "pop",
            padding: !1
        }
          , menuK1 = {
            width: 240,
            height: 256,
            placement: "bottom",
            trigger: "hover",
            content: '<div class="submenuK"><a href="/ehr/">EHR</a><a href="/practice-marketing/">Marketing</a><a href="/practice-management/">Practice Management</a><a href="/medical-billing/">Medical Billing</a><a href="/mobile/">Mobile Apps</a><a href="/marketplace/">Marketplace</a></div>',
            delay: 75,
            animation: "pop",
            padding: !1
        }
          , menuK2 = {
            width: 240,
            height: 230,
            placement: "bottom",
            trigger: "hover",
            content: '<div class="submenuK"><a href="/doctors/">For Doctors</a><a href="/administrators/">For Administrators</a><a href="/hmo/">For HMOs</a><a href="/specialty/">For Your Specialty</a><a href="portal.curacel.co/">For Patients</a></div>',
            delay: 75,
            animation: "pop",
            padding: !1
        }
          , menuK3 = {
            width: 390,
            height: 150,
            placement: "bottom",
            trigger: "hover",
            content: '<div class="submenuKMB oneItem"><a href="/ehr/" class="subBilling"><img src="http://curacel.co/img/convergence/clinical.png" width="48" />Clinical<span>Learn how Curacel-Health Clinical delivers the EHR you always wanted</span></a><div></div></div>',
            delay: 75,
            animation: "pop",
            padding: !1
        }
          , menuK4 = {
            width: 390,
            height: 150,
            placement: "bottom",
            trigger: "hover",
            content: '<div class="submenuKMB oneItem"><a href="/practice-marketing/" class="subBilling"><img src="http://curacel.co/img/convergence/marketing.png" width="48" />Marketing<span>Learn how to build your online brand and connect with patients</span></a></div>',
            delay: 75,
            animation: "pop",
            padding: !1
        };
        $(".with-primary li.menu-1901 a").attr("href", "javascript:void(0)").webuiPopover(menuKMB),
        $(".with-primary li.menu-1886 a").attr("href", "javascript:void(0)").webuiPopover(menuK1),
        $(".with-primary li.menu-1896 a").attr("href", "javascript:void(0)").webuiPopover(menuK2),
        $(".with-primary li.menu-1891 a").webuiPopover(menuK3),
        $(".with-primary li.menu-10501 a").webuiPopover(menuK4)
    })
}(jQuery);
