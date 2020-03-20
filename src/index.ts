import "oj-event";
import { EventAggregator } from "oj-eventaggregator";

export const getRootElements = <T extends HTMLElement>(selector: string, loaded: boolean = false) => {
  let elements = (Array.from(document.querySelectorAll(selector)) as T[])
  if (loaded) {
    elements = elements.filter(x => x.getAttribute("data-loaded") !== null)
    elements.forEach(x => x.setAttribute("data-loaded", "loaded"))
  }
  return elements
}

export type IOptions = ScrollIntoViewOptions & { selector: string }

export default class ScrollTo extends EventAggregator<"change"> {
  root: HTMLElement
  options: IOptions

  constructor(root: HTMLElement, options: IOptions) {
    super()
    this.root = root
    this.options = options
    this.root.on([
      "click.scroll-to",
      "touchend.scroll-to"
    ], e => this.scroll())
  }

  private scroll() {
    const t = document.querySelector(this.options.selector)
    if (!t)
      console.error(`No element found for selector ${this.options.selector}`)
    t.scrollIntoView(this.options)
    this.emit("change")
  }

  public unmount() {
    this.root.off([
      "click.scroll-to",
      "touchend.scroll-to"
    ])
  }
}

export const mount = (options: IOptions) =>
  getRootElements("[data-scroll-to]", true)
    .map(x => new ScrollTo(x, { ...options, selector: x.getAttribute("data-scroll-to") }))