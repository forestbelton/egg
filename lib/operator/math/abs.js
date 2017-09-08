import { term } from '../_util'
import Operator from '../Operator'

export default new Operator({
    name: 'ma',
    clauses: [
        {
            sig: ['float'],
            body: (context, left) => {
                context.stack.push(
                    term('float', Math.abs(left.value))
                )
            },
            sig: ['bigint'],
            body: (context, left) => {
                context.push(
                    term('bigint', left.value.abs())
                )
            }
        }
    ]
})
