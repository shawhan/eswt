jQuery(function($){
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

  }).on("click", ".link-down", function(e){
    e.preventDefault();
    $('#menu a[href="#about"').click();

  }).on("click", ".post a", function(e){
    e.preventDefault();
    $('#modal-iFrame').iziModal('open', this); 

  });

  $("#modal-iFrame").iziModal({
      title: 'The Mountain', //Modal title
      subtitle: 'A gorgeous nature time lapse.', //Modal subtitle
      fullscreen: true, //Icon to expand modal to fullscreen
      headerColor: 'rgb(51, 76, 123)', //Color of modal header. Hexa colors allowed.
      overlayColor: 'rgba(0, 0, 0, 0.4)', //Color of overlay behind the modal
      iconColor: '',
      iconClass: 'icon-chat',
      iframe: true, //In this example, this flag is mandatory. Izimodal needs to understand you will call an iFrame from here
      iframeURL: "https://www.youtube.com/embed/BmMzt02ainQ?autoPlay=1" //Link will be opened inside modal
  });

  $.getJSON("data.json", function(data) {
      var banner_html = "";
      $.each(data.banner, function(k, v){
        //TODO order by sort ASC
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
      $.each(data.news, function(k, v){
        news_html += '<li><a href="'+v.url+'">'+v.title+'</a></li>';
      });
      $('.news-list ul').append(news_html);

      var indication_html = "";
      $.each(data.indication, function(k, v){
        indication_html += '<div class="post"><img src="'+v.photo+'"><span>'+v.title+'</span></div>';
      });
      $('.indication-list').append(indication_html);

      var media_html = "";
      $.each(data.media, function(k, v){
        media_html += '<div class="post"><a href=""><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.media-list').append(media_html);

      var case_html = "";
      $.each(data.case, function(k, v){
        case_html += '<div class="post"><a href=""><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.case-list').append(case_html);

      var info_html = "";
      $.each(data.info, function(k, v){
        info_html += '<div class="post"><a href=""><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.info-list').append(info_html);

      var activity_html = "";
      $.each(data.activity, function(k, v){
        activity_html += '<div class="post"><a href=""><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.activity-list').append(activity_html);
    });
});