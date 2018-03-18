import { Disposable, isDisposable } from "./disposable";

export type Usable<TDisposable extends Disposable> = TDisposable | PromiseLike<TDisposable>;

export async function using<TResult, TDisposable extends Disposable>(
    usable: Usable<TDisposable>,
    job: (disposable: TDisposable) => TResult,
): Promise<TResult> {
    const disposable = await usable;
    if (!isDisposable(disposable))
        throw new Error(`Not a disposable`);
    try {
        const result = await job(disposable);
        await disposable.dispose();
        return result;
    }
    catch (err) {
        await disposable.dispose(err);
        throw err;
    }
}
