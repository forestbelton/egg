import Operator from './Operator'
import parser from '../grammar.pegjs'

export default new Operator({
    name: 'v',
    clauses: [
        {
            sig: ['array'],
            desc: 'Reverses the input array.',
            body: (context, arr) => {
                context.push('array', arr.value.reverse())
            }
        }
    ]
})