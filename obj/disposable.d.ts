export declare type Disposer = (() => void) | (() => PromiseLike<void>);
export interface Disposable {
    dispose: Disposer;
}
export declare function isDisposable(maybeDisposable: any): maybeDisposable is Disposable;
export declare class DisposableComposition implements Disposable {
    private disposables;
    dispose(): Promise<void>;
    protected registerDisposable(...disposables: Disposable[]): void;
    protected deregisterDisposable(...disposables: Disposable[]): void;
}
