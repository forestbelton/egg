import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '-',
    clauses: [
        {
            sig: ['float', 'float'],
            body: (context, left, right) => {
                context.push(
                    term('float', left.value - right.value)
                )
            }
        },
        {
            sig: ['bigint', 'bigint'],
            body: (context, left, right) => {
                context.push(
                    term('bigint', left.value.subtract(right.value))
                )
            }
        }
    ]
})
