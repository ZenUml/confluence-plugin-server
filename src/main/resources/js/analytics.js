$(function() {  
  //Google TagManager
  var GTM_ID = 'GTM-TVFNJ9V';
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer',GTM_ID);

  var tgmIframe = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id='+GTM_ID+'"'+
  ' height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
  $(document.body).prepend(tgmIframe)

  //DataLayer of GTM
  var baseUrl = AJS.Confluence.getBaseUrl();
  var browserVersion = window.navigator.userAgent;
  var confluenceVersion = AJS.Meta.get("version-number");
  var serverName = AJS.Meta.get("server-name");
  var userFullName = AJS.Meta.get("current-user-fullname");
  AJS.$.ajax({
    url: baseUrl + '/rest/plugins/1.0/com.zenuml.confluence.sequence-key',
    type: 'Get',
    beforeSend: function (request) {
      request.setRequestHeader("X-Atlassian-Token", "nocheck");
    },
    processData: false,
    contentType: false,
  }).then(function(res) {
    dataLayer.push({
      UserFullName: userFullName,
      ServerName: serverName,
      BrowserVersion: browserVersion,
      ConfluenceVersion: confluenceVersion,
      ZenUMLVersion: res.version,
      UserLicensed: res.usesLicensing===true ? 'N':'Y',
      event: "UserStatus"
    })
  });
});