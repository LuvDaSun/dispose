export type Disposer = (() => void) | (() => PromiseLike<void>);

export interface Disposable {
    dispose: Disposer;
}

export function isDisposable(maybeDisposable: any): maybeDisposable is Disposable {
    return typeof maybeDisposable.dispose === "function";
}
