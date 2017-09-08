import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '+',
    clauses: [
        {
            sig: ['float', 'float'],
            desc: 'Floating-point addition.',
            body: (context, left, right) => {
                context.push(
                    term('float', left.value + right.value)
                )
            }
        },
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer addition.',
            body: (context, left, right) => {
                context.push(
                    term('bigint', left.value.add(right.value))
                )
            }
        }
    ]
})
