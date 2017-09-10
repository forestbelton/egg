import { term } from '../_util'
import Operator from '../Operator'

export default new Operator({
    name: 'mc',
    clauses: [
        {
            sig: ['float'],
            desc: 'Cosine function.',
            body: (context, left) => {
                context.stack.push(
                    term('float', Math.cos(left.value))
                )
            }
        }
    ]
})
