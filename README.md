# Quill source code button

## Register module

```js
import Quill from 'quill'
import QuillHtmlSourceButton from 'quill-source-code-button'

Quill.register('modules/htmlSource', QuillHtmlSourceButton)
```

## Enable module

```js
editorOption: {
  modules: {
    htmlSource: {},
  }
}
```
