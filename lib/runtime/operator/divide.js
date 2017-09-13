import { commutative } from './helper'
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
        }
    ].concat(commutative(
        ['array', 'block'],
        'Maps over array with block.',
        (context, xs, f) => {
            const out = []

            xs.value.forEach(x => {
                context.executeBlock(f, [x])
                out.push(context.stack.pop())
            })

            context.push('array', out)
        }
    ))
})
