## A great tool to make a generator function more like async/await style.

```
const { _async } = require('sh-async')
_async(function* () {
    const s = yield 'Hello'
    const s2 = yield 'World'
    return s + s2
}).then(...).catch(...)
```