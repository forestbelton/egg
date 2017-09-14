import bigInt from 'big-integer'
import Operator from './Operator'

export default new Operator({
    name: '|',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Checks whether the first number is divisible by the second.',
            body: (context, left, right) => {
                const result = left.value.isDivisibleBy(right.value)
                    ? bigInt[1]
                    : bigInt[0]

                context.push('bigint', result)
            }
        }
    ]
})