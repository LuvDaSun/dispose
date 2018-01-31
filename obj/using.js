"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disposable_1 = require("./disposable");
async function using(usable, job) {
    if (Array.isArray(usable)) {
        const disposable = await Promise.all(usable);
        if (!disposable.every(disposable_1.isDisposable))
            throw new Error(`Not all are disposable`);
        try {
            return await job(disposable);
        }
        finally {
            await Promise.all(disposable.map(disposable => disposable.dispose()));
        }
    }
    else {
        const disposable = await usable;
        if (!disposable_1.isDisposable(disposable))
            throw new Error(`Not a disposable`);
        try {
            return await job(disposable);
        }
        finally {
            await disposable.dispose();
        }
    }
}
exports.using = using;
//# sourceMappingURL=using.js.map