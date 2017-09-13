import bigInt from 'big-integer'
import Operator from './Operator'

export default new Operator({
    name: '=',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer equality.',
            body: (context, left, right) => {
                const equal = left.value.equals(right.value)
                context.push('bigint', equal ? bigInt(1) : bigInt(0))
            }
        }
    ]
})