!function($) {
    function opInit() {
        kop.initModList||("desktop"==kop.st||"tablet"==kop.st?kop.tl.to(kop.appscr, .75, {
            y: 176, boxShadow: "0 -2px 17px 1px rgba(0, 0, 0, 0.1)", ease: Back.easeOut.config(1.4)
        }
        , "-=0.15"):kop.tl.to(kop.appscr, .75, {
            y: 0, boxShadow: "0 -2px 17px 1px rgba(0, 0, 0, 0.1)", ease: Back.easeOut.config(1.4)
        }
        , "-=0.15"), "desktop"==kop.st&&kop.tl.from(kop.appmodTree, .75, {
            y: 30, clip: "rect(60px, 812px, 812px, 0px)", autoAlpha: 0, ease: Power0.easeNone
        }
        , "-=.1"), kop.tl.staggerFrom(kop.appmods, .75, {
            y: 30, autoAlpha: 0, scale: 1, delay: .15, ease: Back.easeOut
        }
        , -.15).to(kop.appscrShadow, .25, {
            bottom:-5, height:50, onComplete:function() {
                kop.initModList=!0
            }
        }
        , "-=0.15"), kop.initModList=!0, pConsole("fired once"))
    }
    function getMod(dir) {
        return"next"==dir?kop.currMod+1!==5?kop.currMod+1: 1: kop.currMod-1!==0?kop.currMod-1: 4
    }
    function pConsole(msg) {
        kop.debug&&console.log(msg)
    }
    function hideModule(mod) {
        1==mod?kop.tl1.to(kop.featureHero1, .3, {
            x: 0, autoAlpha: 0, ease: Power1.easeOut
        }
        , "=0").set(kop.featureHero1, {
            clearProps: "opacity, visibility,transform"
        }
        ):2==mod?kop.tl2.to(kop.featureHero2, .3, {
            x: 0, autoAlpha: 0, ease: Power1.easeOut
        }
        , "=0").set(kop.featureHero2, {
            clearProps: "opacity, visibility,transform"
        }
        ):3==mod?kop.tl3.to(kop.featureHero3, .3, {
            x: 0, autoAlpha: 0, ease: Power1.easeOut
        }
        , "=0").set(kop.featureHero3, {
            clearProps: "opacity, visibility,transform"
        }
        ):4==mod&&kop.tl4.to(kop.featureHero4, .3, {
            x: 0, autoAlpha: 0, ease: Power1.easeOut
        }
        , "=0").set(kop.featureHero4, {
            clearProps: "opacity, visibility,transform"
        }
        ),
        pConsole("hide "+mod)
    }
    function showModule(mod) {
        hideModTree(),
        kop.currMod>0&&hideModule(kop.currMod),
        1==mod?kop.tl.from(kop.featureHero1, .3, {
            x: 0, autoAlpha: 0, ease: Power1.easeOut
        }
        , "=0.1").to(kop.appscr, .2, {
            backgroundImage: "url('http://www.kareo.com/sites/default/files/ck/webupload/images/banners/04/clinical.jpg')", autoAlpha: 1, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        ):2==mod?kop.tl.from(kop.featureHero2, .3, {
            x: 0, autoAlpha: 0, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        , "=0.1").to(kop.appscr, .2, {
            backgroundImage: "url('http://www.kareo.com/sites/default/files/ck/webupload/images/banners/04/billing.jpg')", autoAlpha: 1, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        ):3==mod?kop.tl.from(kop.featureHero3, .3, {
            x: 0, autoAlpha: 0, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        , "=0.1").to(kop.appscr, .2, {
            backgroundImage: "url('http://www.kareo.com/sites/default/files/ck/webupload/images/banners/04/managed-billing.jpg')", autoAlpha: 1, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        ):4==mod&&kop.tl.from(kop.featureHero4, .3, {
            x: 0, autoAlpha: 0, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        , "=0.1").to(kop.appscr, .2, {
            backgroundImage: "url('http://www.kareo.com/sites/default/files/ck/webupload/images/banners/04/marketing.jpg')", autoAlpha: 1, onComplete: modShowComplete(mod), ease: Power1.easeOut
        }
        ),
        showModNav(),
        pConsole("show "+mod)
    }
    function modShowComplete(mod) {
        kop.currMod=mod
    }
    function hideModTree() {
        kop.initModTree||(kop.tl.staggerTo(kop.appmods, .5, {
            y:20, autoAlpha:0, onComplete:function() {
                kop.initModTree=!0
            }
            , ease:Back.easeOut
        }
        , "-=0.2"), "desktop"==kop.st&&kop.tl.to(kop.appmodTree, .3, {
            y:15, clip:"rect(0px, 812px, 60px, 0px)", autoAlpha:0, onComplete:function() {
                kop.initModTree=!0
            }
            , ease:Power2.easeOut
        }
        , "-=0.2"), kop.initModTree=!0)
    }
    function showModNav() {
        kop.initModNav||(kop.tl.staggerFrom(kop.modnav, ".4", {
            cycle: {
                x: [-25, 25]
            }
            , autoAlpha:0, onComplete:function() {
                kop.initModNav=!0
            }
            , ease:Bounce.easeInOut
        }
        , 0), kop.initModNav=!0)
    }
    var kop= {
        op:$("#oplatform"),
        h2:$("#oplatform h2.header"),
        h3:$("#oplatform h3.header"),
        modnav:$("#oplatform .nav"),
        leftnav:$("#oplatform .navleft"),
        rightnav:$("#oplatform .navright"),
        appscr:$("#oplatform .appscreen.base"),
        appscrShadow:$("#oplatform .bgoverlay.botShadow"),
        appmodTree:$("#oplatform .modtree"),
        appmods:$("#oplatform .mod"),
        appmods1:$("#oplatform .mod.clinical"),
        appmods2:$("#oplatform .mod.billing"),
        appmods3:$("#oplatform .mod.mbilling"),
        appmods4:$("#oplatform .mod.marketing"),
        featureHero1:$("#oplatform .featureHero.mod1"),
        featureHero2:$("#oplatform .featureHero.mod2"),
        featureHero3:$("#oplatform .featureHero.mod3"),
        // featureHero4:$("#oplatform .featureHero.mod4"),
        tl:new TimelineLite( {
            delay: .15
        }
        ),
        tl1:new TimelineLite( {}
        ),
        tl2:new TimelineLite( {}
        ),
        tl3:new TimelineLite( {}
        ),
        tl4:new TimelineLite( {}
        ),
        initModList:!1,
        initModNav:!1,
        initModTree:!1,
        currMod:0,
        debug:!1,
        sw:window.innerWidth||d.documentElement.clientWidth||d.getElementsByTagName("body")[0].clientWidth,
        st:"desktop"
    }
    ;
    kop.st=kop.sw<1024&&kop.sw>568?"tablet":"desktop",
    kop.sw<=1024&&kop.sw>568?kop.st="tablet":kop.sw<=568&&(kop.st="mobile"),
    "desktop"==kop.st||"tablet"==kop.st?(kop.tl.from(kop.h2, .3, {
        y: -15, autoAlpha: 0, ease: Power1.easeOut
    }
    ).from(kop.h3, .3, {
        y: -15, autoAlpha: 0, ease: Power1.easeOut
    }
    , "-=0.15").set(kop.appscr, {
        boxShadow: "0 0px 8px 1px rgba(0, 0, 0, 0.2)"
    }
    ).from(kop.appscr, .5, {
        y: 30, autoAlpha: 0, ease: Power1.easeOut
    }
    , "=0"), kop.op.hover(function() {
        opInit(), kop.op.unbind("mouseenter").unbind("mouseleave")
    }
    ), kop.appmods.on("click", function() {
        showModule($(this).data("mod"))
    }
    ), kop.leftnav.on("click", function() {
        showModule(getMod("prev")), pConsole("left nav fired")
    }
    ), kop.rightnav.on("click", function() {
        showModule(getMod("next")), pConsole("right nav fired")
    }
    )):(kop.op.find(".mod.clinical").on("click", function() {
        window.location.href="/ehr"
    }
    ), kop.op.find(".mod.billing").on("click", function() {
        window.location.href="/practice-management"
    }
    ), kop.op.find(".mod.mbilling").on("click", function() {
        window.location.href="/medical-billing"
    }
    ), kop.op.find(".mod.marketing").on("click", function() {
        window.location.href="/practice-marketing"
    }
    ), kop.tl.set(kop.appscr, {
        clearProps: "opacity, visibility,transform"
    }
    ));
    var sectionOp=$("#oplatform");
    sectionOp.waypoint( {
        handler:function() {
            opInit()
        }
        , offset:"40%"
    }
    )
}

(jQuery);