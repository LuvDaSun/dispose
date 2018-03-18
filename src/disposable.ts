export type Disposer = (err?: any) => void | PromiseLike<void>;

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

    public async dispose(err?: any) {
        const disposables = Array.from(this.disposables.values()).reverse();
        for (const disposable of disposables) {
            await disposable.dispose(err);
            this.deregisterDisposable(disposable);
        }
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
