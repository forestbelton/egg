import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '-',
    clauses: [
        {
            sig: ['float', 'float'],
            desc: 'Floating-point subtraction.',
            body: (context, left, right) => {
                context.push(
                    term('float', left.value - right.value)
                )
            }
        },
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer subtraction.',
            body: (context, left, right) => {
                context.push(
                    term('bigint', left.value.subtract(right.value))
                )
            }
        }
    ]
})
