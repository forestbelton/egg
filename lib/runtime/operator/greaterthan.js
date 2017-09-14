import bigInt from 'big-integer'
import Operator from './Operator'

export default new Operator({
    name: '>',
    clauses: [
        {
            sig: ['array', 'float'],
            desc: 'Takes the first N elements from an array.',
            body: (context, arr, n) => {
                context.push('array', arr.value.slice(0, n.value))
            }
        },
        {
            sig: ['float', 'float'],
            desc: 'Floating-point greater than comparison.',
            body: (context, a, b) => {
                const value = a.value > b.value ? bigInt[1] : bigInt[0]
                context.push('bigint', value)
            }
        },
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer greater than comparison.',
            body: (context, a, b) => {
                const value = a.value.greater(b.value) ? bigInt[1] : bigInt[0]
                context.push('bigint', value)
            }
        },
        {
            sig: ['string', 'string'],
            desc: 'String greater than comparison.',
            body: (context, a, b) => {
                const value = a.value.localeCompare(b.value) > 0 ? bigInt[1] : bigInt[0]
                context.push('bigint', value)
            }
        }
    ]
})