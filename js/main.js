jQuery(function(t){t("img.bg").each(function(){var a=t(this).attr("src").replace("/mobile/","/pc/");window.matchMedia("screen and (max-width: 667px)").matches&&(a=t(this).attr("src").replace("/pc/","/mobile/")),t(this).attr("src",a)}),t(window).scroll(function(){var a=t(window).scrollTop();t(".main-cocontainer section").each(function(){var o=t(this).attr("id");("about2"===o||"about3"===o)&&(o="about"),t(this).position().top<=a+t(".navbar-header").height()&&(t("#menu li.active").removeClass("active"),t("#menu a[href='#"+o+"']").parent().addClass("active"))}),t(window).scrollTop()+t(window).height()>=t(document).height()&&(t("#menu li.active").removeClass("active"),t("#menu a[href='#contact']").parent().addClass("active"))}).scroll(),window.onresize=function(){t("img.bg").each(function(){var a=t(this).attr("src").replace("/mobile/","/pc/");window.matchMedia("screen and (max-width: 667px)").matches&&(a=t(this).attr("src").replace("/pc/","/mobile/")),t(this).attr("src",a)})},t("body").on("click","#menu a",function(a){a.preventDefault();var o=this.hash,i=t(o);t(".navbar-toggle").is(":visible")&&t("#navbar").hasClass("in")===!0&&t(".navbar-toggle").click(),t("#menu li.active").removeClass("active"),t(this).parent().addClass("active"),t("html, body").stop().animate({scrollTop:i.offset().top-t(".navbar-header").height()/2},800,function(){window.location.hash=o})}).on("click","#photo-carasoul a",function(a){a.preventDefault();var o=t(this).attr("href"),i=["#case","#about","#qa","#media","#activity","#contact","#info","#location"];""!==o&&(-1!==i.indexOf(o)?t('#menu a[href="'+o+'"]').click():window.open(o,"_blank"))}).on("click",".link-down",function(a){a.preventDefault(),t('#menu a[href="#about"').click()}).on("click",".yt-video",function(a){a.preventDefault(),t.colorbox({width:"70%",height:"70%",href:"https://www.youtube.com/embed/"+t(this).attr("data-id")+"?autoplay=1&rel=0",iframe:!0,onComplete:function(){t("body").css({"overflow-y":"hidden"}),t(".cboxIframe").attr("webkitallowfullscreen","").attr("mozallowfullscreen","").attr("allowFullScreen","")},onClosed:function(){t("body").css({"overflow-y":"visible"})}})}).on("click",".post a.colorbox",function(a){a.preventDefault(),t.colorbox({maxWidth:"80%",maxHeight:"80%",href:t(this).attr("href"),title:t(this).attr("title"),onComplete:function(){t("body").css({"overflow-y":"hidden"})},onClosed:function(){t("body").css({"overflow-y":"visible"})}})}).on("click",".post a.colorbox-youtube",function(a){a.preventDefault(),t.colorbox({width:"70%",height:"70%",href:"https://www.youtube.com/embed/"+t(this).attr("data-id")+"?autoplay=1&rel=0",iframe:!0,onComplete:function(){t("body").css({"overflow-y":"hidden"}),t(".cboxIframe").attr("webkitallowfullscreen","").attr("mozallowfullscreen","").attr("allowFullScreen","")},onClosed:function(){t("body").css({"overflow-y":"visible"})}})}).on("mouseover",".marquee",function(){t(".marquee").marquee("pause")}).on("mouseout",".marquee",function(){t(".marquee").marquee("resume")}),t(".marquee").marquee({duration:3e3,delayBeforeStart:10,direction:"up",duplicated:!0}),t.ajax({type:"GET",url:"http://data.shockwave.com.tw/output",dataType:"json"}).done(function(a){var o="";t.each(a.banner,function(t,a){o+='<div class="item"><a href="'+a.url+'" target="_blank">',o+='<img src="'+a.photo+'" alt="'+a.title+'"></a></div>'}),t("#photo-carasoul").append(o).owlCarousel({slideSpeed:300,paginationSpeed:400,singleItem:!0,autoPlay:!0});var i="";t.each(a.news,function(t,a){i+='<li><a href="'+a.url+'">'+a.title+"</a></li>"}),t(".news-list ul").append(i);var e="";t.each(a.indication,function(t,a){e+='<div class="post"><a class="colorbox" href="'+a.photo+'" title="'+a.title+'">',e+='<div class="item"><div class="cover"></div><img src="'+a.photo+'"></div>',e+="<span>"+a.title+"</span></a></div>"}),t(".indication-list").append(e);var s=t(".indication-list .post").length;8>=s?t(".indication-list .post").addClass("show-post"):(t(".indication-list .post:lt(8)").addClass("show-post"),t(".indication-list").append('<button class="btn more-btn white">Read More</button>'),t(".indication-list .more-btn").click(function(a){a.stopPropagation();var o=t(".indication-list .show-post").length;o+=8,t(".indication-list .post:lt("+o+")").addClass("show-post"),o>=s&&t(this).remove()}));var l="";t.each(a.media,function(t,a){switch(l+='<div class="post">',a.type){case"":l+='<a class="colorbox" href="'+a.photo+'" title="'+a.title+'">';break;case"link":l+='<a href="'+a.url+'" title="'+a.title+'" target="_blank">';break;case"youtube":l+='<a class="colorbox-youtube" data-id="'+a.url+'" title="'+a.title+'">'}l+='<div class="item"><div class="cover"></div><img src="'+a.cover+'"></div>',l+="<span>"+a.title+"</span></a>",""!==a.date&&(l+='<span class="date">'+a.date+"</span>"),""!==a.media&&(l+="<span>"+a.media+"</span>"),l+="</div>"}),t(".media-list").append(l);var n=t(".media-list .post").length;8>=n?t(".media-list .post").addClass("show-post"):(t(".media-list .post:lt(8)").addClass("show-post"),t(".media-list").append('<button class="btn more-btn white">Read More</button>'),t(".media-list .more-btn").click(function(a){a.stopPropagation();var o=t(".media-list .show-post").length;o+=8,t(".media-list .post:lt("+o+")").addClass("show-post"),o>=n&&t(this).remove()}));var c="";t.each(a.case,function(t,a){c+='<div class="post">',c+=""!==a.url?'<a href="'+a.url+'" target="_blank">':'<a class="colorbox" href="'+a.photo+'" title="'+a.title+'">',c+='<div class="item"><div class="cover"></div><img src="'+a.photo+'"></div>',c+="<span>"+a.title+"</span></a></div>"}),t(".case-list").append(c);var r=t(".case-list .post").length;8>=r?t(".case-list .post").addClass("show-post"):(t(".case-list .post:lt(8)").addClass("show-post"),t(".case-list").append('<button class="btn more-btn green">Read More</button>'),t(".case-list .more-btn").click(function(a){a.stopPropagation();var o=t(".case-list .show-post").length;o+=8,t(".case-list .post:lt("+o+")").addClass("show-post"),o>=r&&t(this).remove()}));var d="";t.each(a.activity,function(t,a){d+='<div class="post"><a class="colorbox" href="'+a.photo+'" title="'+a.title+'">',d+='<div class="item"><div class="cover"></div><img src="'+a.photo+'"></div>',d+="<span>"+a.title+"</span></a></div>"}),t(".info-list").append(d);var p=t(".info-list .post").length;8>=p?t(".info-list .post").addClass("show-post"):(t(".info-list .post:lt(8)").addClass("show-post"),t(".info-list").append('<button class="btn more-btn white">Read More</button>'),t(".info-list .more-btn").click(function(a){a.stopPropagation();var o=t(".info-list .show-post").length;o+=8,t(".info-list .post:lt("+o+")").addClass("show-post"),o>=p&&t(this).remove()}));var h="";t.each(a.activity,function(t,a){h+='<div class="post"><a class="colorbox" href="'+a.photo+'" title="'+a.title+'">',h+='<div class="item"><div class="cover"></div><img src="'+a.photo+'"></div>',h+="<span>"+a.title+"</span></a></div>"}),t(".activity-list").append(h);var u=t(".activity-list .post").length;8>=u?t(".activity-list .post").addClass("show-post"):(t(".activity-list .post:lt(8)").addClass("show-post"),t(".activity-list").append('<button class="btn more-btn green">Read More</button>'),t(".activity-list .more-btn").click(function(a){a.stopPropagation();var o=t(".activity-list .show-post").length;o+=8,t(".activity-list .post:lt("+o+")").addClass("show-post"),o>=u&&t(this).remove()}))})});