import Operator from './Operator'

export default new Operator({
    name: '-',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer subtraction.',
            body: (context, left, right) => {
                context.push('bigint', left.value.subtract(right.value))
            }
        },
        {
            sig: ['float', 'float'],
            desc: 'Floating-point subtraction.',
            body: (context, left, right) => {
                context.push('float', left.value - right.value)
            }
        }
    ]
})
