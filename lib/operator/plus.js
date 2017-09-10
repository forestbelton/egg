import { term } from './_util'
import Operator from './Operator'

const add = type =>
    (context, left, right) => {
        context.push(
            term(type, left.value + right.value)
        )
    }

export default new Operator({
    name: '+',
    clauses: [
        {
            sig: ['bigint', 'bigint'],
            desc: 'Integer addition.',
            body: (context, left, right) => {
                context.push(
                    term('bigint', left.value.add(right.value))
                )
            }
        },
        {
            sig: ['float', 'float'],
            desc: 'Floating-point addition.',
            body: add('float')
        },
        {
            sig: ['array', 'array'],
            desc: 'Concatenate two arrays together.',
            body: (context, left, right) => {
                context.push(
                    term('array', left.value.concat(right.value))
                )
            }
        },
        {
            sig: ['string', 'string'],
            desc: 'Concatenate strings and characters together.',
            body: add('string')
        }
    ]
})
