import { Disposable, isDisposable } from "./disposable";

export type Usable<TDisposable extends Disposable> = TDisposable | PromiseLike<TDisposable>;

export async function using<TResult, TDisposable extends Disposable>(
    usable: Usable<TDisposable>,
    job: (disposable: TDisposable) => TResult,
): Promise<TResult>;
export async function using<TResult, TDisposable extends Disposable>(
    usable: Array<Usable<TDisposable>>,
    job: (disposable: TDisposable[]) => TResult,
): Promise<TResult>;

export async function using<TResult, TDisposable extends Disposable>(
    usable: Usable<TDisposable> | Array<Usable<TDisposable>>,
    job: (disposable: TDisposable | TDisposable[]) => TResult,
): Promise<TResult> {
    if (Array.isArray(usable)) {
        const disposable = await Promise.all(usable);
        if (!disposable.every(isDisposable))
            throw new Error(`Not all are disposable`);
        try {
            return await job(disposable);
        }
        finally {
            await Promise.all(
                disposable.map(disposable => disposable.dispose()),
            );
        }
    }
    else {
        const disposable = await usable;
        if (!isDisposable(disposable))
            throw new Error(`Not a disposable`);
        try {
            return await job(disposable);
        }
        finally {
            await disposable.dispose();
        }
    }
}
