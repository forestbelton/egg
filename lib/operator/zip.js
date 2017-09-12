import Operator from './Operator'

export default new Operator({
    name: 'z',
    clauses: [
        {
            sig: ['array', 'array'],
            desc: 'Zip two arrays together.',
            body: (context, left, right) => {
                const value = []

                debugger
                for (var i = 0; i < Math.min(left.value.length, right.value.length); ++i) {
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