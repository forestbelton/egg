import Operator from './Operator'

export default new Operator({
    name: '*',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer multiplication.',
            body: (context, left, right) => {
                context.push('bigint', left.value.multiply(right.value))
            }
        },
        {
            sig: ['float', 'float'],
            desc: 'Floating-point multiplication.',
            body: (context, left, right) => {
                context.push('float', left.value * right.value)
            }
        },
        {
            sig: ['array', 'float'],
            desc: 'Repeat the input N times to form a new array.',
            body: (context, arr, n) => {
                const out = []

                for (let i = 0; i < n.value; ++i) {
                    arr.forEach(a => out.push(a))
                }

                context.push('array', arr)
            }
        },
        {
            sig: ['string', 'float'],
            desc: 'Repeat the input N times to form a new string.',
            body: (context, str, n) => {
                let out = ''

                for (let i = 0; i < n.value; ++i) {
                    out += str.value
                }

                context.push('string', out)
            }
        },
        {
            sig: ['block', 'float'],
            desc: 'Execute a block N times.',
            body: (context, f, n) => {
                for (let i = 0; i < n.value; ++i) {
                    context.executeBlock(f, [])
                }
            }
        }
    ]
})