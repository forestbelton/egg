import { term } from '../_util'
import Operator from '../Operator'

export default new Operator({
    name: 'mt',
    clauses: [
        {
            sig: ['float'],
            desc: 'Tangent function.',
            body: (context, left) => {
                context.stack.push(
                    term('float', Math.tan(left.value))
                )
            }
        }
    ]
})
