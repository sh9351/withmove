<div align="center"><h1>Withmove</h1><h3>Create dynamic, data-driven videos on the fly.</h3><img alt="npm" src="https://img.shields.io/npm/v/withmove?style=for-the-badge"><img alt="npm" src="https://img.shields.io/npm/dw/withmove?style=for-the-badge"><img alt="npm" src="https://img.shields.io/npm/l/withmove?style=for-the-badge"><img alt="npm" src="https://img.shields.io/badge/FROM-%40pankod%2Fcanvas2video-red?style=for-the-badge"><img alt="Maintenance" src="https://img.shields.io/maintenance/yes/2022?style=for-the-badge"></div>

## About
### Withmove is a **fork of [@pankod/canvas2video](https://www.npmjs.com/package/@pankod/canvas2video)**
Withmove is a simple package capable of creating mp4 videos, directly on Node.js. The core is based on @pankod/canvas2video but with additional features. **The package is currently at version 0.0.1, being very unstable and is not recommended for production use.**

## Use Cases

📺 Personalized video advertising

🎞️ Programmatical customization of video templates

⛅ Creating dynamic videos with real-time data

## Getting Started
To install the module, run the following in the command line:
`npm i withmove`

## Example
```js
const withmove = require('withmove')
const gsap = require('gsap')

withmove({
    silent: false,
    output: 'hello-world.mp4',
    fps: {
        input: 30,
        output: 30,
    },
}, {
    width: 1920,
    height: 1080,
    fps: 30,
    silent: false
}, (prop, fabric, canvas, anim) => {
    prop(fabric.Text, 'Hello world!', {
        from: {
            left: -100,
            top: 0,
            fontFamily: 'Arial',
            fontWeight: 'Bold',
            fontSize: 100,
            fill: 'white',
        },
        to: {
            duration: 1,
            left: 0,
            ease: gsap.Power1.in
        }
    })
}).then(() => console.log('Video successfully rendered'))

```
## Usage
`withmove` itself is a function(promise), expecting three arguments: 2 config objects and 1 callback function. The first argument is the `config` for the **encoder** while the second argument being for the **renderer.** The differences between two config objects are well documented [here.](https://github.com/pankod/canvas2video#Options) The callback function will be called with four arguments: `prop`, `fabric`, `canvas` and `anim`. Basic usage of `prop` is explaind below:
```js
prop(fabric.Text, 'Hello world!', {
        from: {
            left: -100,
            top: 0,
            fontFamily: 'Arial',
            fontWeight: 'Bold',
            fontSize: 100,
            fill: 'white',
        },
        to: {
            duration: 1,
            left: 0,
            ease: gsap.Power1.in
        }
    })
```
With `prop`, you can add new objects directly to the `canvas`. The first argument is from `fabric`, and the `new` keyword is not required. The second argument is the main argument, which will be directly passed to your `fabric` class. The third, also the last argument is the `config` argument, which allows you to set specific configs and also animate easily. Without animations, you may also use as the following:
```js
prop(fabric.Text, 'Hello world!', {
    left: 0,
    top: 0,
    fontFamily: 'Arial',
    fontWeight: 'Bold',
    fontSize: 100,
    fill: 'white',
})
```
Because `withmove` is a `Promise`, you can use the `then` method to wait for the rendering process.
```js
...}).then(() => console.log('Video successfully rendered'))
```
## License
As the original project [@pankod/canvas2video](https://www.npmjs.com/package/@pankod/canvas2video) is licensed under `GPL-3.0`, `withmove` is also licensed under `WTFPL` which is [fully compatible with GPL-3.0](https://www.gnu.org/licenses/license-list.html#WTFPL).