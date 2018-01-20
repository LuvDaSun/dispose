import { Disposable, isDisposable } from "./disposable";

export type Usable<TDisposable extends Disposable> = TDisposable | PromiseLike<TDisposable>;

//#region tuples
export async function using<TResult,
    TDisposable1 extends Disposable,
    TDisposable2 extends Disposable,
    TDisposable3 extends Disposable,
    TDisposable4 extends Disposable,
    TDisposable5 extends Disposable>(
    usables: [
        Usable<TDisposable1>,
        Usable<TDisposable2>,
        Usable<TDisposable3>,
        Usable<TDisposable4>,
        Usable<TDisposable5>],
    job: (disposables: [
        TDisposable1,
        TDisposable2,
        TDisposable3,
        TDisposable4,
        TDisposable5]) => TResult,
): Promise<TResult>;
export async function using<TResult,
    TDisposable1 extends Disposable,
    TDisposable2 extends Disposable,
    TDisposable3 extends Disposable,
    TDisposable4 extends Disposable>(
    usables: [
        Usable<TDisposable1>,
        Usable<TDisposable2>,
        Usable<TDisposable3>,
        Usable<TDisposable4>],
    job: (disposables: [
        TDisposable1,
        TDisposable2,
        TDisposable3,
        TDisposable4]) => TResult,
): Promise<TResult>;
export async function using<TResult,
    TDisposable1 extends Disposable,
    TDisposable2 extends Disposable,
    TDisposable3 extends Disposable>(
    usables: [
        Usable<TDisposable1>,
        Usable<TDisposable2>,
        Usable<TDisposable3>],
    job: (disposables: [
        TDisposable1,
        TDisposable2,
        TDisposable3]) => TResult,
): Promise<TResult>;
export async function using<TResult,
    TDisposable1 extends Disposable,
    TDisposable2 extends Disposable>(
    usables: [
        Usable<TDisposable1>,
        Usable<TDisposable2>],
    job: (disposables: [
        TDisposable1,
        TDisposable2]) => TResult,
): Promise<TResult>;
export async function using<TResult, TDisposable extends Disposable>(
    usables: [Usable<TDisposable>],
    job: (disposables: [TDisposable]) => TResult,
): Promise<TResult>;
//#endregion

export async function using<TResult, TDisposable extends Disposable>(
    usables: Array<Usable<TDisposable>>,
    job: (disposables: TDisposable[]) => TResult,
): Promise<TResult>;
export async function using<TResult, TDisposable extends Disposable>(
    usable: Usable<TDisposable>,
    job: (disposable: TDisposable) => TResult,
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
