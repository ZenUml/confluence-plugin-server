package com.zenuml.confluence.macro;

import com.atlassian.confluence.content.render.xhtml.ConversionContext;
import com.atlassian.confluence.macro.*;
import com.atlassian.confluence.pages.Attachment;
import com.atlassian.confluence.pages.AttachmentManager;
import com.atlassian.confluence.setup.settings.SettingsManager;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.webresource.api.assembler.PageBuilderService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@Scanned
public class SequenceMacro implements Macro {

    private PageBuilderService pageBuilderService;
    private AttachmentManager attachmentManager;
    private SettingsManager settingsManager;

    @Autowired
    public SequenceMacro(
            @ComponentImport PageBuilderService pageBuilderService,
            @ComponentImport AttachmentManager attachmentManager,
            @ComponentImport SettingsManager settingsManager
    ) {
        this.pageBuilderService = pageBuilderService;
        this.attachmentManager = attachmentManager;
        this.settingsManager = settingsManager;
    }

    public String createMD5(String plaintext) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plaintext.getBytes());
            byte[] digest = md.digest();
            String myHash = DatatypeConverter.printHexBinary(digest).toLowerCase();
            return  myHash;
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }

    public String getPDFExportImgTag(String dsl, ConversionContext conversionContext) {
        String baseUrl = settingsManager.getGlobalSettings().getBaseUrl();
        String hash = createMD5(dsl);
        if(hash == null){
            return null;
        }
        Attachment attachment = attachmentManager.getAttachment(conversionContext.getEntity(),"zenuml-"+hash);
        if(attachment==null) {
            return null;
        }
        return String.join("", "<img src=\""+baseUrl+attachment.getDownloadPath()+"\"/>");
    }

    public String execute(Map<String, String> map, String s, ConversionContext conversionContext)
            throws MacroExecutionException, RuntimeException {
        pageBuilderService.assembler().resources().requireWebResource("com.zenuml.confluence.sequence:active-sequence-resources");
        String outputType = conversionContext.getOutputType();
        if (outputType=="pdf") {
            String tag = getPDFExportImgTag(s, conversionContext);
            if(tag != null){
                return tag;
            }
        }
        return String.join("", "<sequence-diagram>", s, "</sequence-diagram>");
    }

    public BodyType getBodyType() { return BodyType.PLAIN_TEXT; }

    public OutputType getOutputType() { return OutputType.BLOCK; }

}
