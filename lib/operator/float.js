import Operator from './Operator'

export default new Operator({
    name: 'f',
    clauses: [
        {
            sig: ['string'],
            desc: 'Parses a floating-point value from a string.',
            body: (context, str) => {
                context.push('float', parseFloat(str.value))
            }
        },
        {
            sig: ['bigint'],
            desc: 'Converts a bigint to its floating-point representation (lossy).',
            body: (context, n) => {
                context.push('float', n.value.toJSNumber())
            }
        }
    ]
})