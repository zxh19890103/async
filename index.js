function isPromise(v) {
    return v instanceof Promise
}

/**
 * automatically run next method for the generator.
 * @param {*} g an generator / iterator
 * @param {*} input the init value
 * @param {*} ok callback while succeed
 * @param {*} fail callback while failed
 */
function auto(g, input, ok, fail) {
    const it = g.next(input)
    if (it.done) {
        ok.call(null, it.value)
        return
    }
    const v = it.value 
    if (isPromise(v)) {
        v.then(res => {
            auto(g, res, ok, fail)
        }, fail).catch(fail)
    } else {
        auto(g, v, ok, fail)
    }
}

/**
 * make a generator function async 
 * @param {*} gen the generator function define.
 */
function _async(gen) {
    const g = gen.call(null)
    return new Promise((resolve, reject) => {
        auto(g, '', resolve, reject)
    })
}

module.exports._async = _async