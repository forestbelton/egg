import { expect } from 'chai'
import { term } from '../helper'
import Context from '../../lib/Context'
import plus from '../../lib/operator/plus'

describe('+ operator', function() {
    it('should add two bigints', function() {
        const context = new Context()
        context.stack = [term('bigint', 1), term('bigint', 2)]

        plus.execute(context)
        expect(context.stack).to.have.length(1)
        expect(context.stack[0].type).to.equal('bigint')
        expect(context.stack[0].value.toJSNumber()).to.equal(3)
    })

    it('should add two bigints', function() {
        const context = new Context()
        context.stack = [term('float', 1.5), term('float', 2)]

        plus.execute(context)
        expect(context.stack).to.deep.equal([{ type: 'float', value: 3.5 }])
    })

    it('should concatenate two arrays', function() {
        const context = new Context()
        const xs = [term('string', 'a')]
        const ys = [term('string', 'b')]

        context.stack = [term('array', xs), term('array', ys)]
        plus.execute(context)

        expect(context.stack).to.deep.equal([{ type: 'array', value: xs.concat(ys) }])
    })

    it('should concatenate two strings', function() {
        const context = new Context()
        context.stack = [term('string', 'abc'), term('string', 'def')]

        plus.execute(context)
        expect(context.stack).to.deep.equal([{ type: 'string', value: 'abcdef' }])
    })
})