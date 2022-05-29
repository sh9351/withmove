const ffmpeg = require('fluent-ffmpeg')
const fabric_1 = require('fabric')
const gsap_1 = require('gsap')
const stream_1 = require('stream')
const cliProgress = require('cli-progress')
const ffmpegPath = require('ffmpeg-static')
const ffprobe = require('ffprobe-static')
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobe.path)
const typeCheck = (reject, config) => {
  const { width, height, fps, makeScene } = config
  if (!(typeof width === 'number')) {
    reject(
      new Error('width should be a number. You provided ' + typeof width)
    )
  }
  if (!(typeof height === 'number')) {
    reject(
      new Error('height should be a number. You provided ' + typeof height)
    )
  }
  if (!(typeof fps === 'number')) {
    reject(new Error('fps should be a number. You provided ' + typeof fps))
  }
  if (!(typeof makeScene === 'function')) {
    reject(
      new Error('makeScene should be a function. You provided ' + typeof makeScene)
    )
  }
}
const progressBar = new cliProgress.SingleBar({
  format: 'Rendering | {bar} | {percentage}%',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
})
module.exports = config => {
  return new Promise((resolve, reject) => {
    try {
      const width = config.width,
        height = config.height,
        fps_1 = config.fps,
        makeScene = config.makeScene,
        _a = config.silent,
        silent_1 = _a === void 0 ? true : _a
      const canvas_1 = new fabric_1.fabric.StaticCanvas(null, {
        width: width,
        height: height,
      })
      const anim_1 = new gsap_1.TimelineMax({ paused: true })
      const stream_2 = new stream_1.Readable()
      typeCheck(reject, config)
      let totalFrames_1
      let currentFrame_1 = 0
      gsap_1.default.ticker.fps(fps_1)
      const renderFrames_1 = () => {
        anim_1.progress(currentFrame_1++ / totalFrames_1)
        if (currentFrame_1 <= totalFrames_1) {
          if (!silent_1) progressBar.update(currentFrame_1)
          canvas_1.renderAll()
          const buffer = Buffer.from(
            canvas_1.toDataURL().replace(/^data:\w+\/\w+;base64,/, ''),
            'base64'
          )
          stream_2.push(buffer)
          renderFrames_1()
        } else {
          if (!silent_1) progressBar.update(100)
          if (!silent_1) progressBar.stop()
          if (!silent_1) console.log('Rendering complete...')
          stream_2.push(null)
          resolve(stream_2)
        }
      }
      makeScene(fabric_1.fabric, canvas_1, anim_1, () => {
        const duration = anim_1.duration()
        totalFrames_1 = Math.max(1, Math.ceil((duration / 1) * fps_1))
        if (!silent_1) progressBar.start(totalFrames_1, 0)
        renderFrames_1()
      })
    } catch (e) {
      reject(e)
    }
  })
}