import Operator from './Operator'

export default new Operator({
    name: '/',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer division.',
            body: (context, left, right) => {
                context.push('bigint', left.value.divide(right.value))
            }
        },
        {
            sig: ['float', 'float'],
            desc: 'Floating-point division.',
            body: (context, left, right) => {
                context.push('float', left.value / right.value)
            }
        },
        {
            sig: ['string', 'string'],
            desc: 'Split a string by a separator.',
            body: (context, str, sep) => {
                const words = str.value.split(sep.value)
                    .map(value => ({ type: 'string', value }))

                context.push('array', words)
            }
        },
        {
            sig: ['array', 'block'],
            desc: 'Maps over array with block.',
            body: (context, xs, f) => {
                const out = []

                xs.value.forEach(x => {
                    context.executeBlock(f, [x])
                    out.push(context.stack.pop())
                })

                context.push('array', out)
            }
        },
        {
            sig: ['block', 'array'],
            desc: 'Maps over array with block.',
            body: (context, f, xs) => {
                const out = []

                xs.value.forEach(x => {
                    context.executeBlock(f, [x])
                    out.push(context.stack.pop())
                })

                context.push('array', out)
            }
        }
    ]
})
