"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDisposable(maybeDisposable) {
    return typeof maybeDisposable.dispose === "function";
}
exports.isDisposable = isDisposable;
class DisposableComposition {
    constructor() {
        this.disposables = new Set();
    }
    async dispose() {
        const disposables = Array.from(this.disposables.values()).reverse();
        for (const disposable of disposables) {
            await disposable.dispose();
        }
    }
    registerDisposable(...disposables) {
        for (const disposable of disposables)
            this.disposables.add(disposable);
    }
    deregisterDisposable(...disposables) {
        for (const disposable of disposables)
            this.disposables.delete(disposable);
    }
}
exports.DisposableComposition = DisposableComposition;
//# sourceMappingURL=disposable.js.map