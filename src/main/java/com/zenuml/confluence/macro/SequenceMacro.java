package com.zenuml.confluence.macro;

import com.atlassian.confluence.content.render.image.ImageDimensions;
import com.atlassian.confluence.content.render.xhtml.ConversionContext;
import com.atlassian.confluence.macro.*;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.webresource.api.assembler.PageBuilderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Scanned
public class SequenceMacro implements Macro, EditorImagePlaceholder {

    private PageBuilderService pageBuilderService;

    @Autowired
    public SequenceMacro(@ComponentImport PageBuilderService pageBuilderService) {
        this.pageBuilderService = pageBuilderService;
    }


    public String execute(Map<String, String> map, String s, ConversionContext conversionContext) throws MacroExecutionException {

        pageBuilderService.assembler().resources().requireWebResource("com.zenuml.confluence.sequence:sequence-resources");

        return "<sequence-diagram>A.method</sequence-diagram>";
    }
    public BodyType getBodyType() { return BodyType.NONE; }

    public OutputType getOutputType() { return OutputType.BLOCK; }

    @Override
    public ImagePlaceholder getImagePlaceholder(Map<String, String> map, ConversionContext conversionContext) {
        return new DefaultImagePlaceholder("http://xpmac.local:1990/confluence/s/d41d8cd98f00b204e9800998ecf8427e-CDN/en_US/7901/NOCACHE/1.0.0-SNAPSHOT/_/download/resources/com.zenuml.confluence.sequence:sequence-resources/images/zenuml_logo.png",
                false, new ImageDimensions(100, 100));
    }
}
