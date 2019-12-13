AJS.bind('init.rte', function () {
  // mount the editor
  VueModel.$mount('#app');
  let macroName = 'active-sequence';
  // The dialog is defined in zenuml-editor-dialog.vm
  let dialog = AJS.dialog2("#zenuml-editor-dialog");
  AJS.$("#zenuml-editor-dialog-submit-button").click(function (e) {
    var newParams = {};
    // dsl = zenUmlStore;
    newParams["dsl"] = VueModel.$store.state.code || 'A.method()';
    var macro = {
      name: macroName,
      params: newParams,
      defaultParameterValue: "",
      body: ""
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
      VueModel.$store.state.code = (macro && macro.params && macro.params.dsl) || 'A.method()';
      // open custom dialog
      dialog.show();
    }
  });

});