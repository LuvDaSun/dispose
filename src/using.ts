import { Disposable, isDisposable } from "./disposable";

export type Usable<TDisposable> = TDisposable | PromiseLike<TDisposable>;

export async function using<TResult, TDisposable extends Disposable>(
    usable: Usable<TDisposable>,
    job: (disposable: TDisposable) => TResult,
): Promise<TResult> {
    const disposable = await usable;
    if (!isDisposable(disposable)) throw new Error(`Not a disposable`);
    try {
        return await job(disposable);
    }
    finally {
        await disposable.dispose();
    }
}
