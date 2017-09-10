import Operator from '../Operator'

export default new Operator({
    name: 'ma',
    clauses: [
        {
            sig: ['bigint'],
            desc: 'Integer absolute value.',
            body: (context, left) => {
                context.push('bigint', left.value.abs())
            }
        },
        {
            sig: ['float'],
            desc: 'Floating-point absolute value.',
            body: (context, left) => {
                context.push('float', Math.abs(left.value))
            }
        }
    ]
})
