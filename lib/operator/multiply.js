import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '*',
    clauses: [
        {
            sig: ['float', 'float'],
            desc: 'Floating-point multiplication.',
            body: (context, left, right) => {
                context.stack.push(
                    term('float', left.value * right.value)
                )
            }
        }
    ]
})