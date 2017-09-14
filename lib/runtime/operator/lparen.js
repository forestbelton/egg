import bigInt from 'big-integer'
import Operator from './Operator'

export default new Operator({
    name: '(',
    clauses: [
        {
            sig: ['bigint'],
            desc: 'Decrement by one.',
            body: (context, x) => {
                context.push('bigint', x.value.subtract(bigInt[1]))
            }
        },
    ]
})