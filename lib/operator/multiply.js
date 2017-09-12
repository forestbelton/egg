import bigInt from 'big-integer'
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
            sig: ['array', 'string'],
            desc: 'Join an array of strings by a string.',
            body: (context, arr, str) => {
                let value = ''

                if (arr.value.length > 0) {
                    value += arr.value[0].value

                    for (let i = 1; i < arr.value.length; ++i) {
                        value += str.value + arr.value[i].value
                    }
                }

                context.push('string', value)
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
            desc: 'Execute a block N times. I is set to the number of previously executed blocks.',
            body: (context, f, n) => {
                for (let i = 0; i < n.value; ++i) {
                    context.env['I'] = { type: 'bigint', value: bigInt(i) }
                    context.executeBlock(f, [])
                }
            }
        }
    ]
})