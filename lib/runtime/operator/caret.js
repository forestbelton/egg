import Operator from './Operator'

export default new Operator({
    name: '^',
    clauses: [
        {
            sig: ['block', 'block', 'float'],
            desc: 'Evaluates the first block if the number is nonzero, otherwise the second.',
            body: (context, t, f, n) => {
                if (n.value) {
                    context.executeBlock(t)
                } else {
                    context.executeBlock(f)
                }
            }
        },
        {
            sig: ['any', 'any', 'float'],
            desc: 'Pushes the first value if the number is nonzero, otherwise the second.',
            body: (context, t, f, n) => {
                context.push(n.value ? t : f)
            }
        },
        {
            sig: ['array', 'float'],
            desc: 'Looks up the Nth item in an array.',
            body: (context, arr, n) => {
                if (n.value >= arr.value.length) {
                    throw new Error(`expected array of length ${n.value + 1}, found length ${arr.value.length}`)
                }

                context.push(arr.value[n.value])
            }
        },
        {
            sig: ['string', 'float,
            desc: 'Looks up the Nth character in a string.',
            body: (context, str, n) => {
                context.push('char', str.value.charAt(n.value))
            }
        }
    ]
})