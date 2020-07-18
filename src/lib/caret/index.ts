import { throttle } from 'lodash-es'

export class Caret {
  private target: HTMLElement | null = null
  private isContentEditable = false
  private _position = 0
  private observer: MutationObserver | null = null
  private handler = () => {
    /** empty */
  }

  public setTarget(target: HTMLElement) {
    this.target = target
    this.isContentEditable = target.isContentEditable
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        this.isContentEditable = (mutation.target as HTMLElement).isContentEditable
      })
    })
  }

  get position() {
    return this._position
  }

  private getPos(): number {
    if (!this.target) {
      throw new Error('target is null')
    }

    // for contenteditable field
    if (this.isContentEditable) {
      this.target.focus()
      const _range = document.getSelection()!.getRangeAt(0)
      const range = _range.cloneRange()
      range.selectNodeContents(this.target)
      range.setEnd(_range.endContainer, _range.endOffset)
      return range.toString().length
    }
    // for textarea/input element
    return (this.target as HTMLTextAreaElement).selectionStart
  }

  private updateCaretPosition = throttle((): void => {
    const newPos = this.getPos()
    this._position = newPos
  }, 100)

  public observeStart(): void {
    if (!this.target) {
      throw new Error('target is null')
    }

    this.handler = this.updateCaretPosition.bind(this)

    this.target.addEventListener('keypress', this.handler)
    this.target.addEventListener('mousedown', this.handler)
    this.target.addEventListener('touchstart', this.handler)
    this.target.addEventListener('input', this.handler)
    this.target.addEventListener('paste', this.handler)
    this.target.addEventListener('cut', this.handler)
    this.target.addEventListener('mousemove', this.handler)
    this.target.addEventListener('select', this.handler)
    this.target.addEventListener('selectstart', this.handler)

    this.observer?.observe(this.target, {
      attributes: true,
      attributeFilter: ['contenteditable'],
    })
  }

  public observeEnd(): void {
    if (!this.target) {
      throw new Error('target is null')
    }

    this.target.removeEventListener('keypress', this.handler)
    this.target.removeEventListener('mousedown', this.handler)
    this.target.removeEventListener('touchstart', this.handler)
    this.target.removeEventListener('input', this.handler)
    this.target.removeEventListener('paste', this.handler)
    this.target.removeEventListener('cut', this.handler)
    this.target.removeEventListener('mousemove', this.handler)
    this.target.removeEventListener('select', this.handler)
    this.target.removeEventListener('selectstart', this.handler)

    this.observer?.disconnect()
  }
}
