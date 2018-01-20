export type Disposer = (() => void) | (() => PromiseLike<void>);

export interface Disposable {
    dispose: Disposer;
}
