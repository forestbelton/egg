import bigInt from 'big-integer'
import { commutative } from './helper'
import Operator from './Operator'
import parser from '../grammar.pegjs'

export default new Operator({
    name: '\\',
    clauses: commutative(
        ['block', 'array'],
        'Filters an array by a predicate.',
        (context, f, arr) => {
            const value = []

            arr.value.forEach(x => {
                context.executeBlock(f, [x])

                const top = context.stack.pop()
                let p = false

                switch (top.type) {
                    case 'bigint':
                        p = !top.value.equals(bigInt(0))
                        break

                    case 'float':
                        p = top.value != 0
                        break

                    case 'string':
                        p = top.value.length > 0
                        break
                }

                if (p) {
                    value.push(x)
                }
            })

            context.push('array', value)
        }
    ).concat([
        {
            sig: ['string'],
            desc: 'Evaluates the string as code.',
            body: (context, code) => {
                const value = parser.parse(code.value)
                const block = { type: 'block', value }

                context.executeBlock(block)
            }
        }
    ])
})