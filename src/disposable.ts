export type Disposer = (() => void) | (() => PromiseLike<void>);

export interface Disposable {
    dispose: Disposer;
}

export function isDisposable(
    maybeDisposable: any,
): maybeDisposable is Disposable {
    return typeof maybeDisposable.dispose === "function";
}

export class DisposableComposition implements Disposable {
    private disposables = new Set<Disposable>();

    constructor(...disposables: Disposable[]) {
        this.registerDisposable(...disposables);
    }

    public async dispose() {
        const disposables = Array.from(this.disposables.values());
        await Promise.all(disposables.map(disposable => disposable.dispose()));
    }

    protected registerDisposable(...disposables: Disposable[]) {
        for (const disposable of disposables)
            this.disposables.add(disposable);
    }
    protected deregisterDisposable(...disposables: Disposable[]) {
        for (const disposable of disposables)
            this.disposables.delete(disposable);
    }

}
