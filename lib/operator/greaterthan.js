import Operator from './Operator'

export default new Operator({
    name: '>',
    clauses: [
        {
            sig: ['array', 'float'],
            desc: 'Takes the first N elements from an array.',
            body: (context, arr, n) => {
                return context.push('array', arr.value.slice(0, n.value))
            }
        }
    ]
})