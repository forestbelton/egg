import { term } from './_util'
import Operator from './Operator'
import parser from '../grammar.pegjs'

export default new Operator({
    name: 'r',
    clauses: [
        {
            sig: [],
            body: context => {
                const [ token ] = parser.parse(context.input)

                context.input = ''
                context.push(token)
            }
        }
    ]
})