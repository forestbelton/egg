import { term } from '../_util'
import Operator from '../Operator'

export default new Operator({
    name: 'ms',
    clauses: [
        {
            sig: ['float'],
            desc: 'Sine function.',
            body: (context, left) => {
                context.stack.push(
                    term('float', Math.sin(left.value))
                )
            }
        }
    ]
})
