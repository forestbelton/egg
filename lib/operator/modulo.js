import Operator from './Operator'

export default new Operator({
    name: '%',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer modulo operation.',
            body: (context, left, right) => {
                context.push('bigint', left.value.mod(right.value))
            }
        },
        {
            sig: ['float'],
            desc: 'Generate a random number from 0 to N - 1.',
            body: (context, n) => {
                const value = Math.floor(Math.random() * n.value)
                context.push('float', value)
            }
        }
    ]
})