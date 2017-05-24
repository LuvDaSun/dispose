import * as test from "tape";
import { Disposable } from "./disposable";
import { using } from "./using";

class Context implements Disposable {
    public disposed = false;

    public dispose() {
        this.disposed = true;
    }
}

test("using", async t => {
    const c = new Context();
    await using(c, c => {
        t.equal(c.disposed, false);
    });
    t.equal(c.disposed, true);

    t.end();
});

