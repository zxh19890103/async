// import { _async } from '../index'
const { _async } = require('../index')

const fetch = (uri) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hello, World from ${uri}`)
        }, 3 * 1000)
    })
}

const messages = function *() {
    let data = yield fetch('http://www.zhangxinghai.cn')
    let data2 = yield fetch('https://github.com/zxh19890103')
    let data3 = yield 'Over'
    return [data, data2, data3]
}

// test
_async(messages).then(r => {
    console.log('Done', r);
}).catch(err => {
    console.log('Err', err)
})