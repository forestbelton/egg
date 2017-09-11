import Operator from './Operator'
import parser from '../grammar.pegjs'

export default new Operator({
    name: '#',
    clauses: [
        {
            sig: ['string'],
            desc: 'Evaluates the string as code.',
            body: (context, code) => {
                const value = parser.parse(code.value)
                const block = { type: 'block', value }

                context.executeBlock(block)
            }
        },
    ]
})