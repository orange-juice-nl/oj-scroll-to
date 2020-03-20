# ScrollTo
Scroll to elements on a page.

## mount
`mount(): ScrollTo[]`
Mounts all elements with the `[data-scroll-to]` attribute.

## constructor
`constructor(root: HTMLElement, options: IOptions): ScrollTo`
Binds a click and touchend event listener to the given root element.
When the event is emitted, the options.selector gets queried and scrolled into view.

## unmount
`unmount(): void`
Removes theevent listeners.

## Events
### change
`.on("change")`
Listen to changes (scroll to command)
