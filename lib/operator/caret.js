import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '^',
    clauses: [
        {
            sig: ['block', 'block', 'float'],
            desc: 'Evaluates the first block if the number is nonzero, otherwise the second.',
            body: (context, t, f, n) => {
                if (n.value) {
                    context.executeBlock(t)
                } else {
                    context.executeBlock(f)
                }
            }
        },
        {
            sig: ['any', 'any', 'float'],
            desc: 'Pushes the first value if the number is nonzero, otherwise the second.',
            body: (context, t, f, n) => {
                context.stack.push(n.value ? t : f)
            }
        }
    ]
})