# Steam OpenID Node.JS API

## Install

```
npm install --save openid-steam
```

## Usage

```js
import Steam from "openid-steam"

// Pass return URL as an argument, the URL you want Steam to return
// user to where you will parse query parameters and extract steam ID
const steam = new Steam("http://localhost:3333/auth")
steam.url()
  .then((url) => {
    // Redirect user to this url
    console.log(url)
  })
  .catch((error) => {
    console.log(error.message)
  })

// Then user will be returned to a similar URL as below:
const url = window.location.href

// Which you can verify in order to identify the user
steam.verify(url)
  .then((steamId) => {
    console.log(steamId)
  })
  .catch((err) => {
    console.log(err.message)
  })
```

## Development

- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

# License

Released under [MIT license][]

[mit license]: http://sergey.mit-license.org/
