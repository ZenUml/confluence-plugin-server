Currently there is always a second diagram on the viewing page. Why?

One extra diagram come from `zenuml-editor-dialog.vm`. It is always loaded to the page.

1. Can we disable it?
1. Where the data is provided to it?


# Code analysis of "macro-customise.js"
```
AJS.bind('init.rt', ...)
```
This callback is call when

```
  let macroName = 'active-sequence';
```

