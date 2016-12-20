jQuery(function($){
  var SortByCreate = function (a, b){
    if (a.sort == b.sort) {
      var a_create = new Date(`${a.create}:00+08:00`);
      var b_create = new Date(`${b.create}:00+08:00`);

      if (a_create === b_create) {
        return 0;
      }
      return a_create < b_create ? 1 : -1;
    }
    return a.sort > b.sort ? 1 : -1;
  }

  $('img.bg').each(function(i) {
    var url = $(this).attr('src').replace('/mobile/', '/pc/');
    if (window.matchMedia("screen and (max-width: 667px)").matches) {
      url = $(this).attr('src').replace('/pc/', '/mobile/');
    }
    $(this).attr('src', url);
  });

  $(window).scroll(function() {
    var windowScroll = $(window).scrollTop();
    $('.main-cocontainer section').each(function(i) {
        var id = $(this).attr("id");
        if (id === "about2" || id === "about3") {
          id = "about";
        }
        if ($(this).position().top <= (windowScroll + $('.navbar-header').height()) ) {
            $("#menu li.active").removeClass('active');
            $("#menu a[href='#"+id+"']").parent().addClass('active');
        }
    });

    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      $("#menu li.active").removeClass('active');
      $("#menu a[href='#contact']").parent().addClass('active');
    }
  }).scroll();

  window.onresize = function(e) {
    $('img.bg').each(function(i) {
      var url = $(this).attr('src').replace('/mobile/', '/pc/');
      if (window.matchMedia("screen and (max-width: 667px)").matches) {
        url = $(this).attr('src').replace('/pc/', '/mobile/');
      }
      $(this).attr('src', url);
    });
  }

  $('body').on('click', '#menu a', function(e){
    e.preventDefault();
    var hash = this.hash;
    var target = $(hash);

    if($(".navbar-toggle").is(":visible") && $("#navbar").hasClass("in") === true){
      $(".navbar-toggle").click();
    }

    $("#menu li.active").removeClass('active');
    $(this).parent().addClass('active');

    $('html, body').stop().animate({
      'scrollTop': target.offset().top - ($('.navbar-header').height()/2)
    }, 800, function () {
      window.location.hash = hash;
    });
  }).on("click", "#photo-carasoul a", function(e){
    e.preventDefault();
    var link = $(this).attr('href');
    var link_array = ["#case","#about","#qa","#media","#activity","#contact","#info","#location"];
    if (link !== "") {
      if (link_array.indexOf(link) !== -1) {
          $('#menu a[href="'+link+'"]').click();
        } else {
          window.open(link,'_blank');
        }
    }
  }).on("click", ".link-down", function(e){
    e.preventDefault();
    $('#menu a[href="#about"').click();

  }).on("click", ".yt-video", function(e){
    e.preventDefault();
    $.colorbox({
        'width' : '70%',
        'height' : '70%',
        'href' : 'https://www.youtube.com/embed/'+$(this).attr('data-id')+'?autoplay=1&rel=0',
        'iframe' : true,
        'onComplete': function() {
            $("body").css({"overflow-y":"hidden"});
            $(".cboxIframe").attr('webkitallowfullscreen', '').attr('mozallowfullscreen', '').attr('allowFullScreen', '');
        },
        'onClosed' : function() {
            $("body").css({"overflow-y":"visible"});
        }
    });
  }).on("click", ".post a.colorbox", function(e){
    e.preventDefault();
    $.colorbox({
      'maxWidth': '80%',
      'maxHeight': '80%',
      'href' : $(this).attr('href'),
      'title' : $(this).attr('title'),
      'onComplete': function() {
        $("body").css({"overflow-y":"hidden"});
      },
      'onClosed' : function() {
        $("body").css({"overflow-y":"visible"});
      }
    });
  }).on("click", ".post a.colorbox-youtube", function(e){
    e.preventDefault();
    $.colorbox({
        'width' : '70%',
        'height' : '70%',
        'href' : 'https://www.youtube.com/embed/'+$(this).attr('data-id')+'?autoplay=1&rel=0',
        'iframe' : true,
        'onComplete': function() {
            $("body").css({"overflow-y":"hidden"});
            $(".cboxIframe").attr('webkitallowfullscreen', '').attr('mozallowfullscreen', '').attr('allowFullScreen', '');
        },
        'onClosed' : function() {
            $("body").css({"overflow-y":"visible"});
        }
    });
  }).on("mouseover", ".marquee", function(e){
    $('.marquee').marquee('pause');
  }).on("mouseout", ".marquee", function(e){
    $('.marquee').marquee('resume');
  });

  $.ajax({
      type: "GET",
      url: "http://data.shockwave.com.tw/output",
      dataType: 'json',
  }).done(function (data) {
    var banner_html = "";
    data.banner.sort(SortByCreate);
    $.each(data.banner, function(k, v){
      banner_html += '<div class="item"><a href="'+v.url+'" target="_blank">';
      banner_html += '<img src="'+v.photo+'" alt="'+v.title+'"></a></div>';
    });

    $('#photo-carasoul').append(banner_html).owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
      autoPlay: true
    });

    var news_html = "";
    data.news.sort(SortByCreate);
    $.each(data.news, function(k, v){
      news_html += '<a href="'+v.url+'">'+v.title+'</a>';
    });
    $('.marquee').append(news_html).marquee({
      duration: 8000,
      duplicated: true
    });

    var indication_html = "";
    data.indication.sort(SortByCreate);
    $.each(data.indication, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      indication_html += '<div class="post"><a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
      indication_html += '<div class="item"><div class="cover"></div><img src="'+v.photo+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        indication_html += '<span class="media">'+v.media+'</span>';
        indication_html += '<span class="date">'+v.date+'</span>';
      }
      indication_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(1, 39) + '⋯⋯';
        }
        indication_html += '<span class="summary">'+v.summary+'</span>';
      }
      indication_html += '</a></div>';
    });
    $('.indication-list').append(indication_html);

    var indication_count = $('.indication-list .post').length;
    if (indication_count <= 8) {
      $('.indication-list .post').addClass('show-post');
    } else {
      $('.indication-list .post:lt(8)').addClass('show-post');
      $('.indication-list').append('<button class="btn more-btn white">Read More</button>');

      $('.indication-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.indication-list .show-post').length;
        offset += 8;

        $('.indication-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= indication_count) {
          $(this).remove();
        }
      });
    }

    var media_html = "";
    data.media.sort(SortByCreate);
    $.each(data.media, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      media_html += '<div class="post">';
      switch(v.type) {
        case '':
          media_html += '<a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
        break;
        case 'link':
          media_html += '<a href="'+v.url+'" title="'+v.title+'" target="_blank">';
        break;
        case 'youtube':
          media_html += '<a class="colorbox-youtube" data-id="'+v.url+'" title="'+v.title+'">';
        break;
      }
      media_html += '<div class="item"><div class="cover"></div><img src="'+v.cover+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        media_html += '<span class="media">'+v.media+'</span>';
        media_html += '<span class="bdate">'+v.date+'</span>';
      }
      media_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(1, 39) + '⋯⋯';
        }
        media_html += '<span class="summary">'+v.summary+'</span>';
      }
      media_html += '</div>';
    });
    $('.media-list').append(media_html);

    var media_count = $('.media-list .post').length;
    if (media_count <= 8) {
      $('.media-list .post').addClass('show-post');
    } else {
      $('.media-list .post:lt(8)').addClass('show-post');
      $('.media-list').append('<button class="btn more-btn white">Read More</button>');

      $('.media-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.media-list .show-post').length;
        offset += 8;

        $('.media-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= media_count) {
          $(this).remove();
        }
      });
    }

    var case_html = "";
    data.case.sort(SortByCreate);
    $.each(data.case, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      case_html += '<div class="post">';
      if (v.url !== "") {
        case_html += '<a href="'+v.url+'" target="_blank">';
      } else {
        case_html += '<a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
      }

      case_html += '<div class="item"><div class="cover"></div><img src="'+v.photo+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        case_html += '<span class="media">'+v.media+'</span>';
        case_html += '<span class="date">'+v.date+'</span>';
      }
      case_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(1, 39) + '⋯⋯';
        }
        case_html += '<span class="summary">'+v.summary+'</span>';
      }
      case_html += '</a></div>';
    });
    $('.case-list').append(case_html);

    var case_count = $('.case-list .post').length;
    if (case_count <= 8) {
      $('.case-list .post').addClass('show-post');
    } else {
      $('.case-list .post:lt(8)').addClass('show-post');
      $('.case-list').append('<button class="btn more-btn green">Read More</button>');

      $('.case-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.case-list .show-post').length;
        offset += 8;

        $('.case-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= case_count) {
          $(this).remove();
        }
      });
    }

    var info_html = "";
    data.activity.sort(SortByCreate);
    $.each(data.info, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      info_html += '<div class="post"><a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
      info_html += '<div class="item"><div class="cover"></div><img src="'+v.photo+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        info_html += '<span class="media">'+v.media+'</span>';
        info_html += '<span class="bdate">'+v.date+'</span>';
      }
      info_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(1, 39) + '⋯⋯';
        }
        info_html += '<span class="summary">'+v.summary+'</span>';
      }
      info_html += '</a></div>';
    });
    $('.info-list').append(info_html);

    var info_count = $('.info-list .post').length;
    if (info_count <= 8) {
      $('.info-list .post').addClass('show-post');
    } else {
      $('.info-list .post:lt(8)').addClass('show-post');
      $('.info-list').append('<button class="btn more-btn white">Read More</button>');

      $('.info-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.info-list .show-post').length;
        offset += 8;

        $('.info-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= info_count) {
          $(this).remove();
        }
      });
    }

    var activity_html = "";
    data.activity.sort(SortByCreate);
    $.each(data.activity, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      activity_html += '<div class="post"><a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
      activity_html += '<div class="item"><div class="cover"></div><img src="'+v.photo+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        activity_html += '<span class="media">'+v.media+'</span>';
        activity_html += '<span class="date">'+v.date+'</span>';
      }
      activity_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(1, 39) + '⋯⋯';
        }
        activity_html += '<span class="summary">'+v.summary+'</span>';
      }
      activity_html += '</a></div>';
    });
    $('.activity-list').append(activity_html);

    var activity_count = $('.activity-list .post').length;
    if (activity_count <= 8) {
      $('.activity-list .post').addClass('show-post');
    } else {
      $('.activity-list .post:lt(8)').addClass('show-post');
      $('.activity-list').append('<button class="btn more-btn green">Read More</button>');

      $('.activity-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.activity-list .show-post').length;
        offset += 8;

        $('.activity-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= activity_count) {
          $(this).remove();
        }
      });
    }

  });
});