import Operator from './Operator'

export default new Operator({
    name: 'p',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Raises an integer to a power.',
            body: (context, left, right) => {
                context.push('bigint', left.value.pow(right.value))
            }
        }
    ]
})