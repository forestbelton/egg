import bigInt from 'big-integer'
import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/runtime/Context'
import caret from '../../lib/runtime/operator/caret'

describe('^ operator', function () {
    it('should evaluate the first block when not 0', function () {
        const context = new Context()
        context.stack = [
            term('block', [term('string', 'true')]),
            term('block', [term('string', 'false')]),
            term('float', 1)
        ]

        caret.execute(context)
        expect(context.stack).to.deep.equal([{ type: 'string', value: 'true' }])
    })

    it('should evaluate the second block when 0', function () {
        const context = new Context()
        context.stack = [
            term('block', [term('string', 'true')]),
            term('block', [term('string', 'false')]),
            term('float', 0)
        ]

        caret.execute(context)
        expect(context.stack).to.deep.equal([{ type: 'string', value: 'false' }])
    })

    it('should return the n-th element in an array', function () {
        const context = new Context()
        context.stack = [
            term('array', [
                term('bigint', bigInt[0]),
                term('bigint', bigInt[1]),
                term('bigint', bigInt[2])
            ]),
            term('bigint', bigInt[2])
        ]

        caret.execute(context)
        expect(context.stack).to.deep.equal([{
            type: 'bigint', value: bigInt[2]
        }])
    })
})
