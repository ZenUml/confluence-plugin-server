AJS.bind('init.rte', function () {
  // mount the editor
  VueModel.$mount('#app');
  let macroName = 'active-sequence';
  // The dialog is defined in zenuml-editor-dialog.vm
  let dialog = AJS.dialog2("#zenuml-editor-dialog");
  AJS.$("#zenuml-editor-dialog-submit-button").click(function (e) {
    var newParams = {};
    // var dsl = VueModel.$store.state.code || 'A.method()';
    newParams["Desc"] = 'Double-click to see preview';
    // newParams["DslHash"] = md5(dsl.replace(/\s/g, ''));
    var macro = {
      name: macroName,
      params: newParams,
      defaultParameterValue: "",
      body: VueModel.$store.state.code
    };
    var selection = AJS.Rte.getEditor().selection.getNode();
    tinymce.plugins.Autoconvert.convertMacroToDom(macro, function (data, textStatus, jqXHR) {
      AJS.$(selection).replaceWith(data);
      dialog.hide();
    }, function (jqXHR, textStatus, errorThrown) {
      AJS.log("error converting macro to DOM");
    });
  });

  // override opener: get old DSL from data-macro-parameters and set it to zenUmlStore
  AJS.MacroBrowser.setMacroJsOverride(macroName, {
    opener: function (macro) {
      console.log('macro', macro);
      VueModel.$store.state.code = (macro && macro.body) || 'A.method()';
      // open custom dialog
      dialog.show();
    }
  });

});

AJS.$(document).ready(function () {
  var pageId = AJS.Meta.get("page-id");
  var baseUrl = AJS.Confluence.getBaseUrl();
  // Get all shadow elements from page
  // return a dom node list
  function getAllShadowElements() {
    var elements = [];
    AJS.$('sequence-diagram').each(function () {
      if (this.shadowRoot.querySelector(".sequence-diagram-container")) {
        elements.push(this.shadowRoot.querySelector(".sequence-diagram-container"))
      }
    });
    return elements;
  }
  // Get all Macro nodes and its dsl
  // return dsl text and convertToBlob promise
  function getConvertPromiseAndDsl() {
    var doms = getAllShadowElements();
    var objects = [];
    if (doms.length > 0) {
      var dslList = [];
      AJS.$.each(doms, function (index, dom) {
        var dslEls = AJS.$(dom).find('.zenuml-dsl');
        if (dslEls.length > 0) {
          var dslText = dslEls.text();
          // remove duplicate when upload mutiple same uml at the same time
          if (dslList.indexOf(dslText) < 0) {
            objects.push({
              dsl: dslText,
              domtoimagePromise: domtoimage.toBlob(dom, { bgcolor: 'white' })
            });
            dslList.push(dslText);
          }
        }
      })
    }
    return objects;
  }
  // Get all attachments based on page id 
  // return a ajax promise
  function getAttachments() {
    return AJS.$.ajax({
      url: baseUrl + '/rest/api/content/' + pageId + '/child/attachment?expand=version',
      type: 'GET'
    });
  }
  // Create and Upload a new attchment 
  // return a ajax promise
  function uploadAttachment(blob, dsl) {
    var hash = md5(dsl);
    var file = new File([blob], "zenuml-" + hash, { type: 'image/png' });
    var fd = new FormData();
    fd.append("file", file);
    fd.append('comment', hash);
    fd.append('minorEdit', "true");

    return AJS.$.ajax({
      url: baseUrl + '/rest/api/content/' + pageId + '/child/attachment',
      type: 'POST',
      beforeSend: function (request) {
        request.setRequestHeader("X-Atlassian-Token", "nocheck");
      },
      processData: false,
      contentType: false,
      data: fd
    });
  }
  // Validate a list of promise
  // return Promise.all
  function resolveAllPromises(promiseList) {
    if (!Array.isArray(promiseList)) {
      console.error("Wrong Promise Array");
    }
    return Promise.all(promiseList);
  }

  setTimeout(function () {
    var dslPromiseList = getConvertPromiseAndDsl();
    var promises = [];
    var dsls = [];
    if (dslPromiseList.length > 0) {
      AJS.$.each(dslPromiseList, function (index, item) {
        promises.push(item.domtoimagePromise);
        dsls.push(item.dsl);
      });
      resolveAllPromises(promises).then(function (blobArray) {
        getAttachments().then(function (res) {
          var existingAttachments = res.results;
          AJS.$.each(blobArray, function (index, blob) {
            var dslhash = md5(dsls[index]);
            var found = existingAttachments.filter(function (attachment) {
              return attachment.title === "zenuml-" + dslhash;
            });
            if (found.length === 0) {
              uploadAttachment(blob, dsls[index]).then(function (res) {
                console.log("New Attachment is uploaded successfully");
              });
            }
          });
        });
      });
    }
  });

})