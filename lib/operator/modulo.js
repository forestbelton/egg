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
        }
    ]
})