const renderer = require('./renderer')
const encoder = require('./encoder')

module.exports = async (config_e, config_r, callback) => encoder({
    ...config_e, ...{
        frameStream: await renderer({
            ...config_r, ...{
                makeScene: (fabric, canvas, anim, compose) => {
                    callback((fabricClass, arg, config) => {
                        if (config?.from && config?.to) {
                            const prop = new fabricClass(arg, config.from)
                            canvas.add(prop)
                            anim.to(prop, config.to)
                            return prop
                        } else if (config?.from) {
                            const prop = new fabricClass(arg, config.from)
                            canvas.add(prop)
                            return prop
                        } else {
                            const prop = new fabricClass(arg, config)
                            canvas.add(prop)
                            return prop
                        }
                    }, fabric, canvas, anim)
                    compose()
                }
            }
        })
    }
})