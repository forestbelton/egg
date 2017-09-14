import bigInt from 'big-integer'
import Operator from './Operator'

export default new Operator({
    name: '<',
    clauses: [
        {
            sig: ['array', 'float'],
            desc: 'Drops the first N elements from an array.',
            body: (context, arr, n) => {
                return context.push('array', arr.value.slice(n.value))
            }
        },
        {
            sig: ['float', 'float'],
            desc: 'Floating-point lesser than comparison.',
            body: (context, a, b) => {
                const value = a.value < b.value ? bigInt[1] : bigInt[0]
                context.push('bigint', value)
            }
        },
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer lesser than comparison.',
            body: (context, a, b) => {
                const value = a.value.lesser(b.value) ? bigInt[1] : bigInt[0]
                context.push('bigint', value)
            }
        },
        {
            sig: ['string', 'string'],
            desc: 'String lesser than comparison.',
            body: (context, a, b) => {
                const value = a.value.localeCompare(b.value, [], { sensitivity: 'case', caseFirst: 'upper' }) < 0 ? bigInt[1] : bigInt[0]
                context.push('bigint', value)
            }
        }
    ]
})