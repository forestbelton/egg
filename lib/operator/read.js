import { term, op } from './_util'
import parser from '../grammar.pegjs'

export default op('r', [
    {
        sig: [],
        body: context => {
            const [ token ] = parser.parse(context.input)

            context.input = ''
            context.push(token)
        }
    }
])