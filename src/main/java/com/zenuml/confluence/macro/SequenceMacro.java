package com.zenuml.confluence.macro;

import com.atlassian.confluence.content.render.xhtml.ConversionContext;
import com.atlassian.confluence.macro.*;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.upm.api.license.PluginLicenseManager;
import com.atlassian.webresource.api.assembler.PageBuilderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Scanned
public class SequenceMacro implements Macro {

    private PageBuilderService pageBuilderService;
    private final PluginLicenseManager pluginLicenseManager;

    @Autowired
    public SequenceMacro(@ComponentImport PageBuilderService pageBuilderService, @ComponentImport PluginLicenseManager pluginLicenseManager) {
        this.pageBuilderService = pageBuilderService;
        this.pluginLicenseManager = pluginLicenseManager;
    }


    public String execute(Map<String, String> map, String s, ConversionContext conversionContext) throws MacroExecutionException {
        pageBuilderService.assembler().resources().requireWebResource("com.zenuml.confluence.sequence:active-sequence-resources");
        String licenseInfo = pluginLicenseManager.getLicense().isDefined() ? "" : "No license presented";
        return String.join("", "<sequence-diagram>", s, "</sequence-diagram>", licenseInfo);
    }

    public BodyType getBodyType() { return BodyType.PLAIN_TEXT; }

    public OutputType getOutputType() { return OutputType.BLOCK; }

}
