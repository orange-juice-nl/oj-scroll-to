import "oj-event";
import { EventAggregator } from "oj-eventaggregator";
export declare const getRootElements: <T extends HTMLElement>(selector: string, loaded?: boolean) => T[];
export declare type IOptions = ScrollIntoViewOptions & {
    selector: string;
};
export default class ScrollTo extends EventAggregator<"change"> {
    root: HTMLElement;
    options: IOptions;
    constructor(root: HTMLElement, options: IOptions);
    private scroll;
    unmount(): void;
}
export declare const mount: (options: IOptions) => ScrollTo[];
