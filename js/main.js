jQuery(function($){
	$("#photo-carasoul").owlCarousel({
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem: true,
    autoPlay: true
  });
  $(".link-down").click(function(){
    $("html, body").animate({scrollTop: $(window).height()}, 500)
  });
  // $(".load-more").click(function(){
  //   for(i=0; i<3; i++){
  //     card = $(this).siblings(".cards-group").children(".card").first().clone();
  //     $(this).siblings(".cards-group").append(card)
  //   }
  // });
  // $(document).on("click", ".box-card a", function(event){
  //   event.preventDefault();
  //   $('#modal-iFrame').iziModal('open', this);  
  // });

  // $("#modal-iFrame").iziModal({
  //     title: 'The Mountain', //Modal title
  //     subtitle: 'A gorgeous nature time lapse.', //Modal subtitle
  //     fullscreen: true, //Icon to expand modal to fullscreen
  //     headerColor: 'rgb(51, 76, 123)', //Color of modal header. Hexa colors allowed.
  //     overlayColor: 'rgba(0, 0, 0, 0.4)', //Color of overlay behind the modal
  //     iconColor: '',
  //     iconClass: 'icon-chat',
  //     iframe: true, //In this example, this flag is mandatory. Izimodal needs to understand you will call an iFrame from here
  //     iframeURL: "https://player.vimeo.com/video/22439234?autoplay=1" //Link will be opened inside modal
  // });
});
