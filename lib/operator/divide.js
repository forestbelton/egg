import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '/',
    clauses: [
        {
            sig: ['float', 'float'],
            desc: 'Floating-point division.',
            body: (context, left, right) => {
                context.stack.push(
                    term('float', left.value / right.value)
                )
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

                context.stack.push(term('array', out))
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

                context.stack.push(term('array', out))
            }
        }
    ]
})
