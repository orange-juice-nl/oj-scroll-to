import "oj-event";
import Component from "oj-component";
export interface IOptions {
    timing?: (step: any, from: any, change: any, duration: any) => number;
    duration?: number;
    offset?: number;
    container?: string;
}
export default class ScrollTo extends Component<"change"> {
    static mount(options?: IOptions): ScrollTo[];
    private selector;
    private timer;
    private from;
    private to;
    private duration;
    private offset;
    private container;
    private timing;
    private _body;
    private _html;
    static scrollTo(selector: string, options?: IOptions): ScrollTo;
    constructor(root: HTMLElement, options?: IOptions);
    protected initialize(selector: any): void;
    scrollTo(): void;
    private getScrollContainer;
    private smoothScroll;
    unmount(): void;
}
