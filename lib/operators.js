function arity(name, count, body) {
    return (context) => {
		const { stack } = context
        const args = [context]

        for (var i = 0; i < count; ++i) {
            const arg = stack.pop()

            if (typeof arg === 'undefined') {
                throw new Error(`${name} has an arity of ${count}, and only found ${i}`)
            }

            args.push(arg)
        }

        return body.apply(null, args)
    }
}

module.exports = {
    '+': arity('+', 2, (context, left, right) => {
        if (left.type !== 'float' || right.type !== 'float') {
            throw new Error('+ only supported for float,float')
        }

        context.stack.push({ type: 'float', value: left.value + right.value })
    })
};
