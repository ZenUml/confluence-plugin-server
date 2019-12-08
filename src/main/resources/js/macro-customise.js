
AJS.bind("init.rte", function() {
    console.log("$$$ init.rte");
    var macroName = 'sequence';

    // 1. create dialog to add macro
    // var dialog = new AJS.Dialog(800, 655);

    var template = `
    <section id="demo-dialog" class="aui-dialog2 aui-dialog2-small aui-layer" role="dialog" aria-hidden="true">
    <header class="aui-dialog2-header">
        <h2 class="aui-dialog2-header-main">Captain...</h2>
        <a class="aui-dialog2-header-close">
            <span class="aui-icon aui-icon-small aui-iconfont-close-dialog">Close</span>
        </a>
    </header>
    <div class="aui-dialog2-content">
        <p>We've detected debris of some sort in a loose orbit.</p>
        <sequence-diagram>A.method</sequence-diagram>
        <p>I suggest we beam a section aboard for analysis...</p>
    </div>
    <footer class="aui-dialog2-footer">
        <div class="aui-dialog2-footer-actions">
            <button id="dialog-submit-button" class="aui-button aui-button-primary">Make it so</button>
        </div>
    </footer>
</section>`;
    var vm = new Vue({
        template: template
    });

    var root = document.createElement("div")
    root.setAttribute("id", "root")
    document.body.append(root);

    vm.$mount(root);
    var dialog = AJS.dialog2("#demo-dialog");

    // Hides the dialog
    AJS.$("#dialog-submit-button").click(function (e) {
        e.preventDefault();
        console.log('$$$ creating macro');
        var currentParams = {};
        currentParams["name"] = "this" + Date.now();
        currentParams["arg2"] = "that";

        // 3. get current selection in editor
        var selection = AJS.Rte.getEditor().selection.getNode();
        console.log('$$$ get current selection:', selection);
        var macro = {
            name: macroName,
            params: currentParams,
            defaultParameterValue: "",
            body : ""
        };

        // 4. convert macro and insert in DOM
        tinymce.plugins.Autoconvert.convertMacroToDom(macro, function(data, textStatus, jqXHR ) {
            console.log('$$$ converting macro to dom');
            console.log('$$$ data', data);
            console.log('$$$ textStatus', textStatus);
            console.log('$$$ jqXHR', jqXHR);
            AJS.$(selection).replaceWith(data + " <p>Replaced! something<br/>something else</p>");
        }, function(jqXHR, textStatus, errorThrown ) {
            AJS.log("error converting macro to DOM");
        });
        AJS.dialog2("#demo-dialog").hide();
    });


    // 5. bind event to open macro browser
    AJS.MacroBrowser.setMacroJsOverride(macroName, {opener: function(macro) {
            // open custom dialog
            dialog.show();
        }});
});