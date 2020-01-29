$(function() {  
  //Google TagManager
  var GTM_ID = 'GTM-PVFGNPM';
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer',GTM_ID);

  var tgmIframe = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id='+GTM_ID+'"'+
  ' height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
  $(document.body).prepend(tgmIframe)
  //GetBrowserType
  navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();
  //DataLayer of GTM
  var baseUrl = AJS.Confluence.getBaseUrl();
  var browserVersion = navigator.sayswho;
  var confluenceVersion = AJS.Meta.get("version-number");
  var serverName = AJS.Meta.get("server-name");
  var userFullName = AJS.Meta.get("current-user-fullname");
  AJS.$.ajax({
    url: baseUrl+ '/rest/plugins/1.0/com.zenuml.confluence-addon-key/summary',
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
      UsesLicensing: res.usesLicensing===true ? 'N':'Y',
      event: "UserStatus"
    })
  });
});