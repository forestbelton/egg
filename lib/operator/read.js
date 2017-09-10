import Operator from './Operator'
import parser from '../grammar.pegjs'

export default new Operator({
    name: 'r',
    clauses: [
        {
            sig: [],
            desc: 'Consumes the entire input and parses it into a token.',
            body: context => {
                const [ token ] = parser.parse(context.input)

                context.input = ''
                context.push(token)
            }
        }
    ]
})