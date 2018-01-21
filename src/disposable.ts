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

    public async dispose() {
        const disposables = Array.from(this.disposables.values());
        await Promise.all(disposables.map(async disposable => {
            await disposable.dispose();
            this.deregisterDisposable(disposable);
        }));
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
