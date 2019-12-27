$(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  // GA_MEASUREMENT_ID need to be replaced
  gtag('config', '');
  AJS.$("#zenuml-editor-dialog-submit-button").click(function(){
    gtag('event', 'zenuml_create_success');
  });
});