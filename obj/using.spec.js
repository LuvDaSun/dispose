"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("blue-tape");
const using_1 = require("./using");
class Context {
    constructor() {
        this.disposed = false;
    }
    dispose() {
        this.disposed = true;
    }
}
test("using", async (t) => {
    {
        const c = new Context();
        await using_1.using(c, c => {
            t.equal(c.disposed, false);
        });
        t.equal(c.disposed, true);
    }
    {
        const c = new Context();
        await using_1.using([c], ([c]) => {
            t.equal(c.disposed, false);
        });
        t.equal(c.disposed, true);
    }
    {
        const c = new Context();
        const c1 = new Context();
        await using_1.using([c, c1], ([c, c1]) => {
            t.equal(c.disposed, false);
            t.equal(c1.disposed, false);
        });
        t.equal(c.disposed, true);
        t.equal(c1.disposed, true);
    }
});
test("using unusable", async (t) => {
    {
        const u = {};
        try {
            await using_1.using(u, u => null);
            t.fail();
        }
        catch (err) {
            t.pass();
        }
    }
    {
        const u = {};
        try {
            await using_1.using([u], ([u]) => null);
            t.fail();
        }
        catch (err) {
            t.pass();
        }
    }
    {
        const c = new Context();
        const u = {};
        try {
            await using_1.using([u, c], ([u, c]) => null);
            t.fail();
        }
        catch (err) {
            t.pass();
        }
    }
});
//# sourceMappingURL=using.spec.js.map