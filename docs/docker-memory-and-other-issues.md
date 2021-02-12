Error: initial heap size set to a larger value than the maximum heap size

Make sure the `JVM_MAXIMUM_MEMORY` is set to 2048m. 

If you see below errors, just wait for a few minutes, it will start.

```
confluence_1  | 12-Feb-2021 22:05:54.660 INFO [http-nio-8090-exec-2] org.apache.tomcat.util.http.parser.Cookie.logInvalidHeader A cookie header was received [inTest":true,"controlGroup":true,"isForced":false,"variant":"multipage"}; paddlejs_campaign_referrer=localhost:8080; Idea-173e8fce=2934f99c-1660-466c-93c2-ec7288d5b3dc; JSESSIONID=C10D8FC9F64809C69BDC6931AE65C55A; seraph.confluence=524289%3A2909814a5e159d5c7c65c31c486616dbe29bd380] that contained an invalid cookie. That cookie will be ignored.
confluence_1  |  Note: further occurrences of this error will be logged at DEBUG level.
```

```
confluence_1  | 12-Feb-2021 22:15:07.599 INFO [http-nio-8090-exec-7] com.sun.jersey.api.wadl.config.WadlGeneratorLoader.loadWadlGenerator Loading wadlGenerator com.atlassian.plugins.rest.doclet.generators.resourcedoc.AtlassianWadlGeneratorResourceDocSupport
confluence_1  | 12-Feb-2021 22:16:46.984 WARNING [Catalina-utility-1] org.apache.catalina.valves.StuckThreadDetectionValve.notifyStuckThreadDetected Thread [http-nio-8090-exec-9] (id=[192]) has been active for [67,221] milliseconds (since [2/12/21 10:15 PM]) to serve the same request for [http://localhost:9090/pages/createpage.action?spaceKey=ZEN&src=quick-create] and may be stuck (configured threshold for this StuckThreadDetectionValve is [60] seconds). There is/are [1] thread(s) in total that are monitored by this Valve and may be stuck.
confluence_1  | 	java.lang.Throwable
confluence_1  | 		at com.atlassian.plugin.webresource.legacy.DefaultResourceDependencyResolver.getDependenciesInContext(DefaultResourceDependencyResolver.java:82)
```

However, it stuck at loading the editor when we see this in console:
```
confluence_1  | 12-Feb-2021 22:16:57.013 WARNING [Catalina-utility-3] org.apache.catalina.valves.StuckThreadDetectionValve.notifyStuckThreadCompleted Thread [http-nio-8090-exec-9] (id=[192]) was previously reported to be stuck but has completed. It was active for approximately [68,165] milliseconds.
```

This could be because we are using mac. Let's try AWS ECS.

Error:

You may be using a proxy server that prevents WebSocket connections.

It may be related to ports mapping. We changed to ports to 9090 and 9091. Let's change it back.

# Update URL
If your URL does not match, it may cause issues.

# Change collaborate mode to limited
