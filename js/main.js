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
  $(document).on("click", ".post a", function(event){
    event.preventDefault();
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
});
