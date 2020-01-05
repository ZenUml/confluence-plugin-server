$(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  // GA_MEASUREMENT_ID need to be replaced
  gtag('config', '');
  $("#zenuml-editor-dialog-submit-button").click(function(){
    gtag('event', 'zenuml_create_success');
  });
  $("#action-export-pdf-link").click(function(){
    if($('sequence-diagram').length!==0) {
      gtag('event', 'zenuml_export_pdf_success');
    }
  });
});