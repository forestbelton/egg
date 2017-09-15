import Operator from './Operator'
import parser from '../grammar.pegjs'

export default new Operator({
    name: 's',
    clauses: [
        {
            sig: ['any'],
            desc: 'Converts a token into its string representation.',
            body: (context, x) => {
                context.push('string', context.showToken(x))
            }
        }
    ]
})