package com.zenuml.confluence.servlet;

import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.upm.api.license.PluginLicenseManager;
import com.atlassian.upm.license.storage.lib.ThirdPartyPluginLicenseStorageManager;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * A license administration servlet that uses {@link ThirdPartyPluginLicenseStorageManager} to:
 *  - get the current plugin license,
 *  - update the plugin license,
 *  - remove the plugin license,
 *  - buy, try, upgrade, and renew your license directly from My Atlassian,
 *  - check for a licensing-aware UPM,
 *  - and properly handle if a licensing-aware UPM is detected.
 *
 * This servlet can be reached at http://localhost:2990/jira/plugins/servlet/com.zenuml.confluence.sequence/license
 */
@Scanned
public class LicenseServlet extends HttpServlet
{
    private static final String TEMPLATE = "license-admin.vm";
    @ComponentImport
    private final PluginLicenseManager pluginLicenseManager;

    @Inject
    public LicenseServlet(PluginLicenseManager pluginLicenseManager)
    {
       this.pluginLicenseManager = pluginLicenseManager;
    }

    @Override
       protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           PrintWriter w = resp.getWriter();
           if (pluginLicenseManager.getLicense().isDefined()) {
               w.println(pluginLicenseManager.getLicense().get().getRawLicense());
           } else {
               w.println("License missing!");
           }
           w.close();
       }


}
