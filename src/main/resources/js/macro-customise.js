//================EDITOR========================
AJS.bind('init.rte', function () {
  let macroName = 'active-sequence';
  // The dialog is defined in zenuml-editor-dialog.vm
  let dialog = AJS.dialog2("#zenuml-editor-dialog");
  // When we click the submit button on the editor
  AJS.$("#zenuml-editor-dialog-submit-button").click(function (e) {
    var newParams = {};
    // var dsl = VueModel.$store.state.code || 'A.method()';
    newParams["Desc"] = 'Double-click to see preview';
    // newParams["DslHash"] = md5(dsl.replace(/\s/g, ''));
    var editorSection = document.getElementById('zenuml-editor-dialog')
    var code = editorSection.getElementsByTagName('diagram-as-code')[0]
      .vueComponent.$store.state.code;
    var macro = {
      name: macroName,
      params: newParams,
      defaultParameterValue: "",
      body: code
    };
    var selection = AJS.Rte.getEditor().selection.getNode();
    tinymce.plugins.Autoconvert.convertMacroToDom(macro, function (data, textStatus, jqXHR) {
      // Is this data from macro.body?
      AJS.$(selection).replaceWith(data);
      dialog.hide();
    }, function (jqXHR, textStatus, errorThrown) {
      AJS.log("error converting macro to DOM");
    });
  });

  // override opener: get old DSL from data-macro-parameters and set it to zenUmlStore
  AJS.MacroBrowser.setMacroJsOverride(macroName, {
    opener: function (macro) {
      // open custom dialog
      dialog.show();
      var editorSection = document.getElementById('zenuml-editor-dialog')
      editorSection.getElementsByTagName('diagram-as-code')[0]
        .vueComponent.$store.dispatch('updateCode', {code: (macro && macro.body) || 'A.method()'})
    }
  });

});

//================VIEWER========================
// We have to do attachment upload in Viewer but not Editor because users can change the code without going into the Editor.
AJS.$(document).ready(function () {
  const pageId = AJS.Meta.get("page-id");
  const baseUrl = AJS.Confluence.getBaseUrl();
  const attachmentEndpoint = baseUrl + '/rest/api/content/' + pageId + '/child/attachment'

  // Get all attachments based on page id
  // return a ajax promise
  function getAttachments() {
    return AJS.$.ajax({ url: attachmentEndpoint, type: 'GET' });
  }
  // Create and Upload a new attchment
  // return a ajax promise
  function uploadAttachment(blob, hash) {
    var file = new File([blob], "zenuml-" + hash, { type: 'image/png' });
    var fd = new FormData();
    fd.append("file", file);
    fd.append('comment', hash);
    fd.append('minorEdit', "true");

    return AJS.$.ajax({
      url: attachmentEndpoint,
      type: 'POST',
      beforeSend: function (request) {
        request.setRequestHeader("X-Atlassian-Token", "nocheck");
      },
      processData: false,
      contentType: false,
      data: fd
    });
  }

  setTimeout(function () {
    AJS.$('diagram-as-code.conf-macro.output-block').each(async function (index, el) {
      const existingAttachments = await getAttachments();
      const dsl = el.shadowRoot.querySelector('.sequence-diagram').__vue__.$store.state.code;
      const hash = md5(dsl);

      el.shadowRoot.querySelector('.frame').__vue__.toBlob().then(function (blob) {
        if (!existingAttachments.results.some(function (att) {
          return att.title === 'zenuml-' +  hash;
        })) {
          uploadAttachment(blob, hash);
          console.log('Attachment updated.', hash)
        }
      })
    });
    }, 2000);

})
