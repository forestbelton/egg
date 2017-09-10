import { term } from './_util'
import Operator from './Operator'

export default new Operator({
    name: '<',
    clauses: [
        {
            sig: ['array', 'float'],
            desc: 'Drops the first N elements from an array.',
            body: (context, arr, n) => {
                return context.push(
                    term('array', arr.value.slice(n.value))
                )
            }
        }
    ]
})