import { term } from './_util'
import Operator from './Operator'

const add = type =>
    (context, left, right) => {
        context.push(
            term(type, left.value + right.value)
        )
    }

const addString = add('string')

export default new Operator({
    name: '+',
    clauses: [
        {
            sig: ['float', 'float'],
            desc: 'Floating-point addition.',
            body: add('float')
        },
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
            sig: ['char', 'char'],
            desc: 'Concatenate two characters into a string.',
            body: addString
        },
        {
            sig: ['char', 'string'],
            desc: 'Prepend a character to a string.',
            body: addString
        },
        {
            sig: ['string', 'char'],
            desc: 'Append a character to a string.',
            body: addString
        },
        {
            sig: ['string', 'string'],
            desc: 'Concatenate two strings.',
            body: addString
        }
    ]
})
