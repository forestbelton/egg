import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: ']',
    clauses: [
        {
            sig: [],
            desc: 'Builds array from current stack.',
            body: (context) => {
                const oldStack = context.stack
                context.stack = [term('array', oldStack)]
            }
        }
    ]
})