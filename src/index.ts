import Quill from 'quill'

class QuillHtmlSourceModule {

  public quill: Quill
  public options: object
  public container: HTMLElement
  public toolbar: any

  public classToolbarButton = 'ql-html'
  public classEditor = 'ql-html-editor'

  public showingHtml = false

  constructor(quill: Quill, options: object = {}) {
    this.quill = quill
    this.options = options

    this.container = this.quill.root.parentElement as HTMLElement
    this.toolbar = this.quill.getModule('toolbar')

    this.initToolbar()
    this.initHtmlTextArea()
  }

  public initToolbar() {
    // create toolbar button
    const toolbarEl = this.toolbar.container
    const buttonContainer = document.createElement('span')
    buttonContainer.setAttribute('class', 'ql-formats')
    const button = document.createElement('button')
    button.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="code" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path></svg>'
    button.type = 'button'
    button.classList.add(this.classToolbarButton)

    // event binding
    button.onclick = e => {
      e.preventDefault()
      const htmlEditor = this.container.querySelector(`.${this.classEditor}`) as HTMLElement
      const htmlTextArea = htmlEditor.querySelector('textarea') as HTMLTextAreaElement
      htmlEditor.style.display = this.showingHtml ? 'none' : ''
      const textEditor = this.container.querySelector('.ql-editor') as HTMLElement
      textEditor.style.display = this.showingHtml ? '' : 'none'

      if (this.showingHtml) {
        textEditor.innerHTML = htmlTextArea.value
      } else {
        htmlTextArea.value = textEditor.innerHTML
      }

      this.showingHtml = !this.showingHtml
    }

    // append button
    buttonContainer.appendChild(button)
    toolbarEl.appendChild(buttonContainer)
  }

  /**
   * <div class="ql-html-editor">
   *   <textarea class="ql-html-editor-textarea"></textarea>
   * </div>
   */
  public initHtmlTextArea() {
    const htmlTextAreaEditor = this.container.querySelector(`.${this.classEditor}`)

    if (htmlTextAreaEditor == null) {
      // Textarea
      const txtArea = document.createElement('textarea')
      txtArea.style.cssText =
        'width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;resize: none;'
      txtArea.classList.add('ql-html')

      // Textarea Wrapper (Html Editor)
      const htmlEditor = document.createElement('div')
      htmlEditor.classList.add(this.classEditor)
      htmlEditor.style.cssText =
        'position: absolute; height: 100%; width: 100%; display: none'
      htmlEditor.appendChild(txtArea)
      this.container.appendChild(htmlEditor)
    }
  }
}

export default QuillHtmlSourceModule
