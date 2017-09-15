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
        },
        {
            sig: ['string'],
            desc: 'Reverses the input string.',
            body: (context, s) => {
                context.push('string', s.value.split('').reverse().join(''))
            }
        }
    ]
})