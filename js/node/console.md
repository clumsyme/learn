# examples for the console module

## The Console class

### get the class

```js
const Console = require('console').Console
```

### or

```js
const Console = console.Console
```

## Create a new instance of Console

```javascript
const fs = require('fs')
const output = fs.createWriteStream('./stdout.log')
const errorOutput = fs.createWriteStream('./stderr.log')
const logger = new Console(out, err)

// code below will write log to stdout.log
// error to stderr.log
logger.log('Hello')
logger.error('no...')
```

*The global console is a special Console whose output is sent to process.stdout and process.stderr. It is equivalent to calling:*

```js
new Console(process.stdout, process.stderr)
```

## console.assert

```js
console.assert(1==2, 'you are wrong')
```

The above code will print the failed message printed to the console without interruption.
While in node, this will throw a AssertionError with the message.