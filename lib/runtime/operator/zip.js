import Operator from './Operator'

export default new Operator({
    name: 'z',
    clauses: [
        {
            sig: ['array', 'array', 'block'],
            desc: 'Zip two arrays together, combining elements with the block.',
            body: (context, left, right, block) => {
                const value = []
                const max = Math.min(left.value.length, right.value.length)

                for (var i = 0; i < max; ++i) {
                    context.push(left.value[i])
                    context.push(right.value[i])

                    context.executeBlock(block)
                    value.push(context.stack.pop())
                }

                context.push('array', value)
            }
        },
        {
            sig: ['array', 'array'],
            desc: 'Zip two arrays together.',
            body: (context, left, right) => {
                const value = []
                const max = Math.min(left.value.length, right.value.length)

                for (var i = 0; i < max; ++i) {
                    value.push({
                        type: 'array',
                        value: [left.value[i], right.value[i]]
                    })
                }

                context.push('array', value)
            }
        }
    ]
})