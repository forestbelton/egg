import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import backslash from '../../lib/runtime/operator/backslash'

describe('\\ operator', function() {
    it('should evaluate code', function() {
        const context = new Context()
        context.stack = [term('string', '1 2 +')]

        backslash.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('bigint')
        expect(context.stack[0].value.toJSNumber()).to.equal(3)
    })

    it('should filter an array', function () {
        const array = term('array', [
            term('bigint', bigInt[1]),
            term('bigint', bigInt[2]),
            term('bigint', bigInt[3])
        ])

        const block = term('block', [
            term('bigint', bigInt[2]),
            term('operator', '%')
        ])

        const expected = [{
            type: 'array',
            value: [
                { type: 'bigint', value: bigInt[1] },
                { type: 'bigint', value: bigInt[3] }
            ]
        }]

        const context = new Context()

        context.stack = [array, block]
        backslash.execute(context)
        expect(context.stack).to.deep.equal(expected)

        context.stack = [block, array]
        backslash.execute(context)
        expect(context.stack).to.deep.equal(expected)
    })
})
