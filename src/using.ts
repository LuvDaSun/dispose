import {Disposable} from "./disposable";

export async function using<TResult, TDisposable extends Disposable>(
    disposable: TDisposable | PromiseLike<TDisposable>,
    job: (disposable: TDisposable) => TResult,
): Promise<TResult> {
    const resolvedDisposable = await disposable;
    try {
        return await job(resolvedDisposable);
    }
    finally {
        await resolvedDisposable.dispose();
    }
}


