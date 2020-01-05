$(function() {
  // GA_MEASUREMENT_ID is the tracking ID
  var GA_MEASUREMENT_ID = "";
  var s = document.createElement('script');
  s.type = "text/javascript";
  s.src = 'https://www.googletagmanager.com/gtag/js?id='+GA_MEASUREMENT_ID;
  $('head').append(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', GA_MEASUREMENT_ID);
  
  $("#zenuml-editor-dialog-submit-button").click(function(){
    gtag('event', 'zenuml_create_success');
  });
  $("#action-export-pdf-link").click(function(){
    if($('sequence-diagram').length!==0) {
      gtag('event', 'zenuml_export_pdf_success');
    }
  });
});