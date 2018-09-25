dispose

[![CircleCI](https://circleci.com/gh/LuvDaSun/dispose.svg?style=svg)](https://circleci.com/gh/LuvDaSun/dispose)

# what is this?
A C# inspired helper function to allow for automatic disposing of objects.

# how does it work
If a class implements the `Disposable` interface, it will expose the (async)
function `dispose`. An instance of this class cacn be passed to the `using`
helper function so that the `dispose` method is automatically executed.

# huh?
Ok, let me show you:

Without using:

```javascript
const i = await DisposableClass.create();
try {
    // do stuff...
}
finally {
    await i.dispose();
}
```

With using (does exactly the same)
```javascript
await using(DisposableClass.create(), async i => {
    // do stuff...
});
```

This is great for usage in test (cool) test-frameworks like [tape](https://github.com/substack/tape)
with [blue-tape](https://github.com/spion/blue-tape).

exaple:
```javascript
test(
    "test something",
     t => using(testContext.create(), async testContext => {
         const something = await testContext.createSomething();
         t.ok(something);
    }),
)
```

