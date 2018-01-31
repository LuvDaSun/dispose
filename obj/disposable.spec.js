"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("blue-tape");
const disposable_1 = require("./disposable");
test("isDisposable", async (t) => {
    t.equal(disposable_1.isDisposable({}), false);
    t.equal(disposable_1.isDisposable({ dispose: null }), false);
    t.equal(disposable_1.isDisposable({ dispose: true }), false);
    t.equal(disposable_1.isDisposable({ dispose: () => null }), true);
});
//# sourceMappingURL=disposable.spec.js.map