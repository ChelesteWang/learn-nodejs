// 逐帧动画 common.js 
const chalkWorker = require('chalk-animation')

// class es6
class Race extends Object {
    //  创建对象为了使用 forEach 有些炫技
    constructor(props = {}) {
        super(props)
            ;[
                ['rabbit', '兔子'],
                ['turtle', '乌龟'],
                ['turtleStep', 0],
                ['rabbitStep', 0],
                ['start', '|'],
                ['end', '》'],
                ['pad', '.'],
                ['speed', 1],
                ['steps', 50],
                ['stopAt', 42]
            ].forEach(elem => {
                const [key, value] = elem
                if (!(key in props)) {
                    this[key] = value
                }
            })
    }

    getRaceTrack() {
        // 解构赋值 const {} = object
        const {
            start,
            pad,
            turtle,
            turtleStep,
            rabbit,
            rabbitStep,
            steps,
            end
        } = this

        if (!turtleStep && !rabbitStep) {
            // es6 模板字符串
            return `${turtle}${rabbit}${start}${pad.repeat(steps)}${end}`
        }

        // 数组解构
        const [
            [minStr, min],
            [maxStr, max]
        ] = [
            [turtle, turtleStep],
            [rabbit, rabbitStep]
        ].sort((a, b) => a[1] - b[1])

        const prefix = `${pad.repeat((min || 1) - 1)}`
        const middle = `${pad.repeat(max - min)}`
        const suffix = `${pad.repeat(steps - max)}`

        const _start = `${start}${prefix}${minStr}`
        const _end = suffix ? `${maxStr}${suffix}${end}` : `${end}${maxStr}`
        return `${_start}${middle}${_end}`
    }

    updateRaceTrack(state, racing) {
        racing.replace(state)
    }

    updateSteps() {
        if (this.turtleStep >= this.steps) return
        if (this.rabbitStep <= this.stopAt) {
            this.rabbitStep += 3 * this.speed
        }
        this.turtleStep += 1 * this.speed
    }

    race() {
        const initState = this.getRaceTrack()
        const racing = chalkWorker.rainbow(initState)
        let t = 0
        let timer = setInterval(() => {
            if (t <= 6) {
                t += 1
                return
            }
            const state = this.getRaceTrack()
            this.updateRaceTrack(state, racing)
            this.updateSteps()
        }, 150)
    }
}

// new proxy 并没有看出来有啥用（看起来也是在炫技）
const proxy = new Proxy(Race, {
    apply(target, ctx, args) {
        const race = new target(...args)
        return race.race()
    }
})

proxy()