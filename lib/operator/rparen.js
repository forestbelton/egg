import bigInt from 'big-integer'
import Operator from './Operator'

export default new Operator({
    name: ')',
    clauses: [
        {
            sig: ['bigint'],
            desc: 'Increment by one.',
            body: (context, x) => {
                context.push('bigint', x.value.add(bigInt[1]))
            }
        },
    ]
})